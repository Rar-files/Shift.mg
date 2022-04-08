import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import styled from 'styled-components';
import LoginBtn from '../components/Auth/LoginBtn';

const Background = styled.div`
    background-color: ${props => props.theme.app.background};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    height: 100%;
    width: 100%;
`;

const Content = styled.div`
    display: flex
    justify-content: center;
    align-items: center;
    padding: 10px;
`;

const Login: NextPage = () => {

    const router = useRouter();
    
    const [loginData, setLoginData] = useState(null);
    const [loginDataAfter, setLoginDataAfter] = useState(loginData);

    useEffect(() => {
        const LSLoginData = localStorage.getItem("loginData");
        if(LSLoginData){
            setLoginData(          
                JSON.parse(localStorage.getItem("loginData")!)
            )
        }
        if(loginData){
            localStorage.setItem("loginData", JSON.stringify(loginData));
            router.push("/");
        }
    }, [loginData, router]);

    return (
        <Background>
            <Content>
                <LoginBtn setLoginData={setLoginData}/>
            </Content>
        </Background>
    )
}

export default Login;