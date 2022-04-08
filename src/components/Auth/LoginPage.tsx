import {FC, Dispatch, SetStateAction} from 'react';
import styled from 'styled-components';
import LoginBtn from './LoginBtn';

const Content = styled.div`
    background-color: ${props => props.theme.app.background};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    height: 100%;
    width: 100%;
`;

// const Content = styled.div`
//     display: flex
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     padding: 10px;
// `;


type Props = {
    setLoginData: Dispatch<SetStateAction<any>>
}

const LoginPage: FC<Props> = ({setLoginData}) => {
    return (
            <Content>
                <LoginBtn setLoginData={setLoginData}/>
            </Content>
    )
}

export default LoginPage;