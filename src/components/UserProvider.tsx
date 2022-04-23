import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../app";
import {AuthStatus} from "../features/authSlice";
import {loadUserData} from "../features/userSlice";

const UserProvider = () => {
    const authState = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (authState.status !== AuthStatus.AUTHORIZED) {
            return;
        }

        dispatch(loadUserData(authState.userId!));
    }, [dispatch, authState.status, authState.userId]);

    return (
        <>
        </>
    );
};

export default UserProvider;
