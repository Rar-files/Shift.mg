import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IMember as Member} from "../../interfaces/IMember";

interface MemberState {
        loaded: boolean;
    data: Member | null;
}

const memberSlice = createSlice({
    name: 'members',
    initialState: {loaded: false} as MemberState,
    reducers: {
        setMemberData(state, action: PayloadAction<Member>) {
            state.loaded = true;
            state.data = action.payload;
        }
    },
});

const { actions, reducer } = memberSlice;
export const { setMemberData } = actions;
export default reducer;
