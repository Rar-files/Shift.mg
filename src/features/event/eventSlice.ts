import {AnyAction, createSlice, PayloadAction, ThunkAction} from "@reduxjs/toolkit";
import { TAppState, TDispatch } from "../../app";
import { EventService } from "../../services";

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
    data: Event[] | null;
}

const eventSlice = createSlice({
    name: 'events',
    initialState: {loaded: false} as EventState,
    reducers: {
        setEventData(state, action: PayloadAction<Event[]>) {
            state.loaded = true;
            state.data = action.payload;
        }
    },
});

const { actions, reducer } = eventSlice;
export const { setEventData } = actions;
export default reducer;

export const loadEventsData = (): ThunkAction<Promise<void>, TAppState, any, AnyAction> => {
    return async (dispatch: TDispatch): Promise<void> => {
        return new Promise<void>((resolve) => {
            EventService.getEvents().then((value) => {
                if (value.succeeded) {
                    dispatch(setEventData(value.data!));
                } else {
                }
            })
            .finally(() => resolve());
        })
    }
}