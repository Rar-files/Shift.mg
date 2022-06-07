import {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "..";
import {AuthStatus} from "../../features/authSlice";
import {loadUserData} from "../../features/userSlice";

type Props = {
    children?: React.ReactNode;
};

const UserProvider : FC<Props> = ({ children }) => {
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
            {children}
        </>
    );
};

export default UserProvider;
