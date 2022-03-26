import useDarkMode from "use-dark-mode";
import { ThemeProvider } from "styled-components";
import { FC } from "react";

import { darkTheme, lightTheme } from "../styles/Theme";

type Props = {
    children?: React.ReactNode;
};

const AppThemeProvider : FC<Props> = ({ children }) => {
    const darkMode = useDarkMode(true)
    const theme = darkMode.value ? darkTheme : lightTheme
    
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
}

export default AppThemeProvider;