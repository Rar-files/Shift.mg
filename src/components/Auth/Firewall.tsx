import {FC, useEffect} from "react";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "../../app";
import {AuthStatus, checkIsTokenStored} from "../../features/authSlice";
import Loading from "../Loading";

type FirewallProps = {
    children: React.ReactNode;
    protected: boolean;
};

const Firewall : FC<FirewallProps> = (props) => {
    const router = useRouter()
    const authState = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkIsTokenStored())
    }, [dispatch]);

    if (!authState) {
        return (<></>);
    }

    if (authState.status === AuthStatus.UNDEFINED)
    {
        return (
            <Loading/>
        );
    }

    if (props.protected && authState.status !== AuthStatus.AUTHORIZED) {
        router.push("/login/");
        return (<></>);
    }

    return (
        <>
            {props.children}
        </>
    );
}

export default Firewall;
