import {AnyAction, createSlice, PayloadAction, ThunkAction} from "@reduxjs/toolkit";
import { TAppState, TDispatch } from "../../app";
import { EventService } from "../../app/services";
import {IEvent as Event, IEvent} from "../../interfaces/IEvent";
import IPaginableResponse from "../../app/services/IPaginableResponse";
import {IListResponse} from "../../app/services/ApiClient";

interface EventState {
    loaded: boolean;
    data: IListResponse<Event>;
}

const eventSlice = createSlice({
    name: 'events',
    initialState: {loaded: false} as EventState,
    reducers: {
        setEventsData(state, action: PayloadAction<IListResponse<Event>>) {
            state.loaded = true;
            state.data = action.payload;
        }
    },
});

const { actions, reducer } = eventSlice;
export const { setEventsData } = actions;
export default reducer;

export const loadEventsForUser = (userId: string): ThunkAction<Promise<void>, TAppState, any, AnyAction> => {
    return async (dispatch: TDispatch): Promise<void> => {
        return new Promise<void>((resolve) => {
            EventService.getUserEvents(userId).then((value) => {
                if (value.succeeded) {
                    dispatch(setEventsData(value.data));
                } else {
                }
            })
            .finally(() => resolve());
        })
    }
}
