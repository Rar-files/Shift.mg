import type {NextPage} from 'next'
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "../app";
import {useEffect} from "react";
import {logout} from "../features/authSlice";

const Logout: NextPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const userState = useAppSelector((state) => state.user);

    useEffect(() => {
        if (userState.loaded) {
            dispatch(logout());
            router.push('/');
        }
    }, [router, userState, dispatch]);

    return (
        <></>
    );
}

export default Logout;
