import { FC } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import useDarkMode from "use-dark-mode";

const ModeToggler = styled.button`
    background-color: transparent;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: bold;
    padding: 0;
    margin: 0;
    outline: none;
    transition: all 0.2s ease-in-out;
    &:hover {
        color: #000;
    }
`;

//FIXME: This is a temporary solution to the problem of the dark mode not work correctly after load page with saved selected mode as dark.
const DarkModeToggleBtn : FC = () => {
    const darkMode = useDarkMode();
    const icon = darkMode.value ? "ic:outline-dark-mode" : "ic:outline-light-mode";

    return (
        <ModeToggler onClick={darkMode.toggle}>
            <Icon icon={icon} />
        </ModeToggler>
    )
}

export default DarkModeToggleBtn;