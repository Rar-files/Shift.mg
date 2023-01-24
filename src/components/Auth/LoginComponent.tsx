import styled from 'styled-components';
import LoginBtn from '../../components/Auth/LoginBtn';
import Image from "next/image";
import {useAppSelector} from "../../app";
import {FC, useEffect} from "react";
import {AuthStatus} from "../../features/authSlice";
import {useRouter} from "next/router";

const Background = styled.div`
    background-color: ${props => props.theme.palette.background.default};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
`;

const Content = styled.div`
    background-color: ${props => props.theme.palette.background.paper};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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

type LoginComponentProps = {
    inviteId? : string;
}

const LoginComponent: FC<LoginComponentProps> = (props) => {
    const router = useRouter();
    const authState = useAppSelector(state => state.auth);

    const path = props.inviteId ? `invite/${props.inviteId}` : '';

    useEffect(() => {
        if (authState.status === AuthStatus.AUTHORIZED) {
            router.push("/" + path);
        }
    }, [authState.status, router, path]);

    return (
        <>
            {authState.status === AuthStatus.UNAUTHORIZED &&
                    <Background>
                        <Content>
                            <GridMember>
                                <Logo src="/images/IconWithName.svg" alt="logo" width={128} height={128}/>
                            </GridMember>
                            <GridMember>
                                <LoginBtn inviteId={props.inviteId && props.inviteId}/>
                            </GridMember>
                        </Content>
                    </Background>
            }
        </>
    )
}

export default LoginComponent;
