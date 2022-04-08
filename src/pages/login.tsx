import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import styled from 'styled-components';
import LoginBtn from '../components/Auth/LoginBtn';
import Image from "next/image";

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
    background-color: ${props => props.theme.app.backgroundVariant};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    height: 600px;
    width: 400px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const GridMember = styled.div`
    min-width: 100px;
    margin: 16px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Logo = styled(Image)`
    width: 100px;
    height: 100px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Login: NextPage = () => {

    const router = useRouter();
    
    const [loginData, setLoginData] = useState(null);

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
                <GridMember>
                    <Logo src="/images/IconWithName.svg" alt="logo" width={128} height={128}/>
                </GridMember>
                <GridMember>
                    <LoginBtn setLoginData={setLoginData}/>
                </GridMember>
            </Content>
        </Background>
    )
}

export default Login;