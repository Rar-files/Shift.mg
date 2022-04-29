import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface Event {
    id: number;
    name: string;
    slug: string;
    owner: string;
    startDate: Date;
    endDate: Date;
    location: string;
    icon: string;
    color: string;
    shiftsEnabled: boolean;
    description: string;
    shifts: string[];
}

interface EventState {
    loaded: boolean;
    data: Event | null;
}

const eventSlice = createSlice({
    name: 'events',
    initialState: {loaded: false} as EventState,
    reducers: {
        setEventData(state, action: PayloadAction<Event>) {
            state.loaded = true;
            state.data = action.payload;
        }
    },
});

const { actions, reducer } = eventSlice;
export const { setEventData } = actions;
export default reducer;
