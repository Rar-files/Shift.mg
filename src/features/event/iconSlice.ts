import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface Icon {
    id: number;
    name: string;
    iconObject: {
        id: string;
        contentUrl: string;
    }
}

interface IconState {
    loaded: boolean;
    data: Icon | null;
}

const iconSlice = createSlice({
    name: 'event_icons',
    initialState: {loaded: false} as IconState,
    reducers: {
        setIconData(state, action: PayloadAction<Icon>) {
            state.loaded = true;
            state.data = action.payload;
        }
    },
});

const { actions, reducer } = iconSlice;
export const { setIconData } = actions;
export default reducer;
