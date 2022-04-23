import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {TDispatch, TAppState} from "./store";

export const useAppDispatch = () => useDispatch<TDispatch>();
export const useAppSelector: TypedUseSelectorHook<TAppState> = useSelector;
