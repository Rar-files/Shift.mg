import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IMemberInvite as MemberInvite} from "../../interfaces/IMemberInvite";

interface MemberInviteState {
    loaded: boolean;
    data: MemberInvite | null;
}

const memberInviteSlice = createSlice({
    name: 'memberInvites',
    initialState: {loaded: false} as MemberInviteState,
    reducers: {
        setMemberInviteData(state, action: PayloadAction<MemberInvite>) {
            state.loaded = true;
            state.data = action.payload;
        }
    },
});

const { actions, reducer } = memberInviteSlice;
export const { setMemberInviteData } = actions;
export default reducer;
