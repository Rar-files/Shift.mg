import { FC } from "react";
import styled from "styled-components";
import useDarkMode from "use-dark-mode";
import Image from "next/image";
import Link from "next/link";

import Menu from "./Menu";
import UserPanel from "./UserPanel";

import logoIcon from "./Icon.png"

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

const LogoDiv = styled.div`
`;

const Logo = styled(Image)`
    cursor: pointer;
`;


const MenuBar: FC = () => {
    return (
        <Content>
            <Link href="/">
                <>
                    <Logo src={logoIcon} alt="logo" width={46} height={52}/>
                </>
            </Link>
            <Menu/>
            <UserPanel/>
        </Content>
    )
};

export default MenuBar
