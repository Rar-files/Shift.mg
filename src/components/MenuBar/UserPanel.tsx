import { FC } from "react"; 
import styled from "styled-components";
import DarkModeToggleBtn from "./DarkModeToggleBtn";

const Panel = styled.div`
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    padding: 10px;
    margin-bottom: 10px;
`;

const UserPanel : FC = () => {
  return (
    <Panel>
      <DarkModeToggleBtn/>
    </Panel>
  );
}

export default UserPanel;