import { FC } from "react";
import styled from "styled-components";
import useDarkMode from "use-dark-mode";
import Image from "next/image";
import Link from "next/link";

import Menu from "./Menu";
import UserPanel from "./UserPanel";

const Content = styled.div`
    background-color: ${props => props.theme.app.backgroundVariant};
    padding: 10px;
    height: 99%;
    min-width: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;    
`;

const Logo = styled(Image)`
    width: 100%;
    height: auto;
    margin-bottom: 10px;
    cursor: pointer;
`;


const MenuBar: FC = () => {
    return (
        <Content>
            <Link href="/" passHref>
                <Logo src="/images/Icon.png" alt="logo" width={48} height={52}/>
            </Link>
            <Menu/>
            <UserPanel/>
        </Content>
    )
};
  
export default MenuBar