import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface ShiftMember {
    id: string;
    shift: string;
    shiftMemberMember: string;
    joinedAt: Date;
}

interface ShiftMemberState {
    loaded: boolean;
    data: ShiftMember | null;
}

const shiftMemberSlice = createSlice({
    name: 'shiftMembers',
    initialState: {loaded: false} as ShiftMemberState,
    reducers: {
        setShiftMemberData(state, action: PayloadAction<ShiftMember>) {
            state.loaded = true;
            state.data = action.payload;
        }
    },
});

const { actions, reducer } = shiftMemberSlice;
export const { setShiftMemberData } = actions;
export default reducer;
