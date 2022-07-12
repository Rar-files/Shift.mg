import { FC } from "react"; 
import {useAppSelector} from "../../app";
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

type NotifyProps = {
};

const Notify : FC<NotifyProps> = (props) => {

    return (
        <Panel>

        <DarkModeToggleBtn/>
        </Panel>
    );
}

export default Notify;