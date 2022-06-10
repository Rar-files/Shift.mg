import {createSlice, PayloadAction, ThunkAction, AnyAction} from "@reduxjs/toolkit";
import { TAppState, TDispatch } from "../../app";
import { EventIconService } from "../../app/services";
import IPaginableResponse from "../../app/services/IPaginableResponse";
import {IIcon as Icon} from "../../interfaces/IIcon";

interface IconState {
    loaded: boolean;
    data: IPaginableResponse<Icon>;
}

const iconSlice = createSlice({
    name: 'event_icons',
    initialState: {loaded: false} as IconState,
    reducers: {
        setIconData(state, action: PayloadAction<Icon>) {
            state.loaded = true;
            state.data.items.push(action.payload);
        },
        setIconsData(state, action: PayloadAction<IPaginableResponse<Icon>>) {
            state.loaded = true;
            state.data = action.payload;
        }
    },
});

const { actions, reducer } = iconSlice;
export const { setIconsData , setIconData} = actions;
export default reducer;

export const loadIcons = (): ThunkAction<Promise<void>, TAppState, any, AnyAction> => {
    return async (dispatch: TDispatch): Promise<void> => {
        return new Promise<void>((resolve) => {
            EventIconService.getIcons().then((value) => {
                if (value.succeeded) {
                    dispatch(setIconsData(value.data));
                } else {
                }
            })
            .finally(() => resolve());
        })
    }
}