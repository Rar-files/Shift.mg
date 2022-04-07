import {FC, Dispatch, SetStateAction} from 'react';
import {useGoogleLogin} from 'react-google-login';
import styled from 'styled-components';

type Props = {
    setLoginData: Dispatch<SetStateAction<any>>
}

const GoogleBtn = styled.button`
    background-color: #4285f4;
    border-radius: 5px;
    border: none;
    color: white;
    padding: 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    width: 100%;
`;



const LoginBtn: FC<Props> = ({setLoginData}) => {

    const onFailure = (result : any) => {
        console.log(result);
    };
    
    const onSuccess = async (googleData : any) => {
        const response = await fetch("https://kiwano-backend.herokuapp.com/api/auth/login", {
            method: "POST",
            body: JSON.stringify({
                authorization_code: googleData.code,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
    
        const data = await response.json();
        localStorage.setItem("loginData", JSON.stringify(data));
        setLoginData(data);
    };

    console.log(process.env.GOOGLE_CLIENT_ID as string);

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string;

    const {signIn} = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId,
        responseType: 'code',
        accessType: 'offline',
    });

    return (
        <GoogleBtn onClick={signIn}/>
    );
}

export default LoginBtn;