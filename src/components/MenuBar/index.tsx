import { FC } from "react";
import styled from "styled-components";
import useDarkMode from "use-dark-mode";
import UserPanel from "./UserPanel";

const Menu = styled.div`
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    padding: 10px;
    margin-bottom: 10px;
`;

const MenuBar: FC = () => {
    return (
        <Menu>
            <UserPanel/>
        </Menu>
    )
};
  
export default MenuBar