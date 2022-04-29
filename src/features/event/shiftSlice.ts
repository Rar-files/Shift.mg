import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface Shift {
    id: string;
    name: string;
    code: string;
    startDate: Date;
    endDate: Date;
    event: string;
    members: string[];
}

interface ShiftState {
    loaded: boolean;
    data: Shift | null;
}

const shiftSlice = createSlice({
    name: 'shifts',
    initialState: {loaded: false} as ShiftState,
    reducers: {
        setShiftData(state, action: PayloadAction<Shift>) {
            state.loaded = true;
            state.data = action.payload;
        }
    },
});

const { actions, reducer } = shiftSlice;
export const { setShiftData } = actions;
export default reducer;
