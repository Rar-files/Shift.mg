import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {INotify as Notify} from "../interfaces/INotify";

interface NotifyState {
    loaded: boolean;
    data: Notify | null;
}

const notifySlice = createSlice({
    name: 'notify',
    initialState: {loaded: false} as NotifyState,
    reducers: {
        setNotifyData(state, action: PayloadAction<Notify>) {
            state.loaded = true;
            state.data = action.payload;
        }
    },
});

const { actions, reducer } = notifySlice;
export const { setNotifyData } = actions;
export default reducer;