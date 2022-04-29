import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface MediaObject {
    id: string;
    contentUrl: string;
    createdAt: Date;
}

interface MediaObjectState {
    loaded: boolean;
    data: MediaObject | null;
}

const mediaObjectSlice = createSlice({
    name: 'mediaObjects',
    initialState: {loaded: false} as MediaObjectState,
    reducers: {
        setMediaObjectData(state, action: PayloadAction<MediaObject>) {
            state.loaded = true;
            state.data = action.payload;
        }
    },
});

const { actions, reducer } = mediaObjectSlice;
export const { setMediaObjectData } = actions;
export default reducer;
