import { FC } from "react"; 
import styled from "styled-components";
import DarkModeToggleBtn from "./DarkModeToggleBtn";

const Panel = styled.div`
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
`;

const UserPanel : FC = () => {
  return (
    <Panel>
      <DarkModeToggleBtn/>
    </Panel>
  );
}

export default UserPanel;