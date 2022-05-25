import {AnyAction, Store} from "redux";
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import rootReducer from "../features";
import {configureStore} from "@reduxjs/toolkit";

// const loggerMiddleware = createLogger();

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .prepend(
                thunkMiddleware
            )
            .prepend(
                // loggerMiddleware
            )
});

export type TAppState = ReturnType<typeof store.getState>;
export type TDispatch = ThunkDispatch<TAppState, void, AnyAction>;
export type TStore = Store<TAppState, AnyAction> & {dispatch: TDispatch};
export type TGetState = () => TAppState;
