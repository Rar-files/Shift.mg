import {FC, Dispatch, SetStateAction} from 'react';
import {useGoogleLogin} from 'react-google-login';
import styled from 'styled-components';
import {auth} from "../../app/services/AuthService";
import {useAppDispatch} from "../../app";
import {authorize} from "../../features/authSlice";

type Props = {
    setLoginData: Dispatch<SetStateAction<any>>
}

const GoogleBtn = styled.button`
    border-radius: 5px;
    border: none;
    background-color: ${props => props.theme.static.primary};
    color: ${props => props.theme.app.background};
    padding: 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    width: 160px;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    &:hover {
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px inset;
    }
`;

const LoginBtn = () => {
    const dispatch = useAppDispatch();

    const onFailure = (result : any) => {
    };

    const onSuccess = async (googleData : any) => {
        dispatch(authorize(googleData.code));
    };

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string;

    const {signIn} = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId,
        responseType: 'code',
        accessType: 'offline',
        prompt: 'consent',
    });

    return (
        <GoogleBtn onClick={signIn}>
            Login with Google
        </GoogleBtn>
    );
}

export default LoginBtn;
