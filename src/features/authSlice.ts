import {createSlice, PayloadAction, ThunkAction} from "@reduxjs/toolkit";
import {TAppState, TDispatch} from "../app";
import {AnyAction} from "redux";
import {AuthService} from "../app/services";

export enum AuthStatus {
    UNDEFINED,
    UNAUTHORIZED,
    AUTHORIZING,
    AUTHORIZATION_ERROR,
    AUTHORIZED
}

export interface AuthCredentials {
    authorizationCode: string;
}

interface AuthState {
    status: AuthStatus;
    credentials: Partial<AuthCredentials>;
    userId: string | null;
    token: string | null;
    refreshToken: string | null;
}

export interface AuthSuccessData {
    userId: string;
    token: string;
    refreshToken: string | null;
    refreshed: boolean;
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {status: AuthStatus.UNDEFINED} as AuthState,
    reducers: {
        setCredentials(state, action: PayloadAction<AuthCredentials>) {
            state.status = AuthStatus.AUTHORIZING;
            state.credentials = action.payload;
        },
        setAuthError(state) {
            state.status = AuthStatus.AUTHORIZATION_ERROR;
        },
        setAuthSuccessful(state, action: PayloadAction<AuthSuccessData>) {
            state.status = AuthStatus.AUTHORIZED;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;

            if (!action.payload.refreshed) {
                state.userId = action.payload.userId;
            }

            localStorage.setItem('authData', JSON.stringify(state));
        },
        setUnauthorized(state) {
            state.status = AuthStatus.UNAUTHORIZED;
            state.userId = null;
            state.token = null;
            state.refreshToken = null;
            state.credentials = {};
        }
    },
})

const { actions, reducer } = authSlice
export const { setAuthSuccessful, setAuthError, setCredentials, setUnauthorized } = actions
export default reducer

export const checkIsTokenStored = (): ThunkAction<Promise<void>, TAppState, any, AnyAction> => {
    return async (dispatch: TDispatch): Promise<void> => {
        return new Promise<void>((resolve) => {
            if (localStorage.getItem('authData') !== null) {
                const authData = JSON.parse(localStorage.getItem('authData')!);

                dispatch(setAuthSuccessful(authData));
            } else {
                dispatch(setUnauthorized())
            }

            resolve();
        })
    }
}

export const authorize = (authorizationCode: string): ThunkAction<Promise<void>, TAppState, any, AnyAction> => {
    return async (dispatch: TDispatch): Promise<void> => {
        return new Promise<void>((resolve) => {
            const credentials = {authorizationCode: authorizationCode};
            dispatch(setCredentials(credentials));

            AuthService.auth(credentials).then((value => {
                if (!value.succeeded) {
                    return dispatch(setAuthError());
                }

                const authData = {
                    userId: value.userId,
                    token: value.token,
                    refreshToken: value.refreshToken,
                    refreshed: false
                } as AuthSuccessData;

                dispatch(setAuthSuccessful(authData));

                resolve();
            }));
        })
    }
}

export const refreshAuth = (refreshToken: string): ThunkAction<Promise<void>, TAppState, any, AnyAction> => {
    return async (dispatch: TDispatch): Promise<void> => {
        return new Promise<void>((resolve) => {
            AuthService.refreshAuth(`${refreshToken}`).then((value => {
                if (!value.succeeded) {
                    return dispatch(logout());
                }

                const authData = {
                    token: value.token,
                    refreshToken: value.refreshToken,
                    refreshed: true
                } as AuthSuccessData;

                dispatch(setAuthSuccessful(authData));

                resolve();
            }));
        })
    }
}

export const logout = (): ThunkAction<Promise<void>, TAppState, any, AnyAction> => {
    return async (dispatch: TDispatch): Promise<void> => {
        return new Promise<void>((resolve) => {
            dispatch(setUnauthorized());
            localStorage.removeItem('authData');

            resolve();
        })
    }
}
