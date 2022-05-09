import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IShiftMember as ShiftMember} from "../../interfaces/IShiftMember";

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
