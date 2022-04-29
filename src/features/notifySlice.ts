import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface Notify {
    id: number;
    user: string;
    type: string;
    subject: string;
    message: string;
    createdAt: Date;
    seenAt: Date;
}

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