import { FC } from "react";
import styled from "styled-components";
import {WbSunnyOutlined as LightModeIcon, NightsStayOutlined as DarkModeIcon} from "@material-ui/icons/"
import useDarkMode from "use-dark-mode";

const ModeToggler = styled.button`
    background-color: transparent;
    border: none;
    color: ${props => props.theme.palette.divider};
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: bold;
    padding: 0;
    margin: 0;
    outline: none;
    transition: all 0.2s ease-in-out;
    &:hover {
        color: ${props => props.theme.palette.text.hint};
    }
`;

const DarkModeToggleBtn : FC = () => {
    const darkMode = useDarkMode();
    const icon = darkMode.value ? "ic:outline-dark-mode" : "ic:outline-light-mode";

    return (
        <ModeToggler onClick={darkMode.toggle}>
            {darkMode.value 
            ? <DarkModeIcon/>
            : <LightModeIcon/>}
        </ModeToggler>
    )
}

export default DarkModeToggleBtn;