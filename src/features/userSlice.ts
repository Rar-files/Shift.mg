import {createSlice, PayloadAction, ThunkAction} from "@reduxjs/toolkit";
import {TAppState, TDispatch} from "../app";
import {AnyAction} from "redux";
import {UserService} from "../services";
import {logout} from "./authSlice";

export interface User {
    id: number;
    username: string;
    displayName: string;
}

interface UserState {
    loaded: boolean;
    data: User | null;
}

const userSlice = createSlice({
    name: 'user',
    initialState: {loaded: false} as UserState,
    reducers: {
        setUserData(state, action: PayloadAction<User>) {
            state.loaded = true;
            state.data = action.payload;
        }
    },
});

const { actions, reducer } = userSlice;
export const { setUserData } = actions;
export default reducer;

export const loadUserData = (userId: string): ThunkAction<Promise<void>, TAppState, any, AnyAction> => {
    return async (dispatch: TDispatch): Promise<void> => {
        return new Promise<void>((resolve) => {
            UserService.getUser(userId).then((value) => {
                if (value.succeeded) {
                    dispatch(setUserData(value.data!));
                } else {
                    dispatch(logout());
                }
            })
            .finally(() => resolve());
        })
    }
}
