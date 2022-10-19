import { FC } from "react";
import styled from "styled-components";
import useDarkMode from "use-dark-mode";
import Image from "next/image";
import Link from "next/link";

import Menu from "./Menu";
import UserPanel from "./UserPanel";

import logoIcon from "./Icon.png"
import router from "next/router";

const Content = styled.div`
    background-color: ${props => props.theme.palette.background.paper};
    padding: 10px;
    height: 99%;
    min-width: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;    
`;

const MenuBarDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;  
`;

const LogoDiv = styled.div`
    height: 90%;
    width: 90%;
`;

const Logo = styled(Image)`
    cursor: pointer;
`;

const MenuBar: FC = () => {

    const onLogoClick = () => {
        router.push(`/`);
    }

    return (
        <Content>
            
            <MenuBarDiv>
                <LogoDiv>
                    <Logo src={logoIcon} alt="logo" width="100%" height="100%" layout="responsive" objectFit="contain" onClick={onLogoClick}/>
                </LogoDiv>

                <Menu/>
            </MenuBarDiv>
            
            <MenuBarDiv>
                <UserPanel/>
            </MenuBarDiv>
        </Content>
    )
};

export default MenuBar
