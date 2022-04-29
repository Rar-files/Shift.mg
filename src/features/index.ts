import { combineReducers } from 'redux';
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import eventReducer from "./event/eventSlice";
import eventIconReducer from "./event/iconSlice";
import eventMemberInviteReducer from "./event/memberInviteSlice";
import eventMemberReducer from "./event/memberSlice";
import eventRoleReducer from "./event/roleSlice";
import eventShiftMemberReducer from "./event/shiftMemberSlice";
import eventShiftReducer from "./event/shiftSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    event: eventReducer,
    eventIcon: eventIconReducer,
    eventMemberInvite: eventMemberInviteReducer,
    eventMember: eventMemberReducer,
    eventRole: eventRoleReducer,
    eventShiftMember: eventShiftMemberReducer,
    eventShift: eventShiftReducer,
});

export default rootReducer;
