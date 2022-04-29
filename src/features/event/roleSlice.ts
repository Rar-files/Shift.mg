import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface Role {
    id: string;
    name: string;
    permissions: string[];
    owner: string;
}

interface RoleState {
    loaded: boolean;
    data: Role | null;
}

const roleSlice = createSlice({
    name: 'roles',
    initialState: {loaded: false} as RoleState,
    reducers: {
        setRoleData(state, action: PayloadAction<Role>) {
            state.loaded = true;
            state.data = action.payload;
        }
    },
});

const { actions, reducer } = roleSlice;
export const { setRoleData } = actions;
export default reducer;
