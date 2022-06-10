import useDarkMode from "use-dark-mode";
import { ThemeProvider as SCThemeProvider} from "styled-components";
import { ThemeProvider as MuiThemeProvider} from "@material-ui/core";
import { FC } from "react";

import { darkTheme, lightTheme } from "../../styles/Theme";
import {Reset} from "styled-reset";

type Props = {
    children?: React.ReactNode;
};

const AppThemeProvider : FC<Props> = ({ children }) => {
    const darkMode = useDarkMode()
    const theme = darkMode.value ? darkTheme : lightTheme;
    
    return (
        <MuiThemeProvider theme={theme}>
            <SCThemeProvider theme={theme}>
                <Reset/>
                    {children}
            </SCThemeProvider>
        </MuiThemeProvider>
    );
}

export default AppThemeProvider;