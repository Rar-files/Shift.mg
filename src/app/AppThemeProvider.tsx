import useDarkMode from "use-dark-mode";
import { ThemeProvider } from "styled-components";
import { FC, useEffect, useState } from "react";

import { darkTheme, lightTheme } from "../styles/Theme";
import {Reset} from "styled-reset";

type Props = {
    children?: React.ReactNode;
};

const AppThemeProvider : FC<Props> = ({ children }) => {
    const darkMode = useDarkMode()
    const theme = darkMode.value ? darkTheme : lightTheme;
    
    return (
        <ThemeProvider theme={theme}>
            <Reset/>
            {children}
        </ThemeProvider>
    );
}

export default AppThemeProvider;