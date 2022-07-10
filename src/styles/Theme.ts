import { createTheme } from '@material-ui/core';

const darkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#1DD694',
      light: '#a5f3d8',
      dark: '#16a271',
    },
    secondary: {
      main: '#F8BD7F',
    },
    text: {
      primary: '#fff',
      secondary: '#E5E5E5',
      hint: '#CBC7D1',
      disabled: '#807f84',
    },
    background: {
      default: '#45484A',
      paper: '#36393B',
    },
    divider: '#AFAAB9',
  },
  typography: {
    h1: {
      fontSize: '9.125rem',
    },
    h5: {
      fontSize: '2rem',
    },
    h4: {
      fontSize: '2.25rem',
    },
    h3: {
      fontSize: '3.25rem',
    },
    h2: {
      fontSize: '4rem',
    },
    fontFamily: '"Alata","Helvetica" , "Arial", sans-serif',
  },
  eventPalette: {
    warmLow: '#F8BD7F',
    warmMid: '#E9724C',
    warmHigh: '#BB4430',
    themeLight: '#a5f3d8',
    themeMid: '#1DD694',
    themeDark: '#16a271',
    neonCyan: '#88D9E6',
    neonPink: '#FF34AE',
    neonLime: '#B5EF8A',
    nightDirt: '#8B635C',
    nightTree: '#526760',
    nightSky: '#336699'
  }
})

const lightTheme = createTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#1DD694',
        light: '#a5f3d8',
        dark: '#16a271',
      },
      secondary: {
        main: '#F8BD7F',
      },
      text: {
        secondary: '#E5E5E5',
        hint: '#CBC7D1',
        disabled: '#807f84',
      },
      background: {
        default: '#45484A',
        paper: '#36393B',
      },
      divider: '#AFAAB9'
    },
    typography: {
      h1: {
        fontSize: '9.125rem',
      },
      h5: {
        fontSize: '2.25rem',
      },
      h6: {
        fontSize: '2rem',
      },
      h4: {
        fontSize: '2.40rem',
      },
      h3: {
        fontSize: '3.25rem',
      },
      h2: {
        fontSize: '4rem',
      },
      body2: {
        fontSize: '0.7rem',
      },
      fontFamily: '"Alata","Helvetica" , "Arial", sans-serif',
    },
    eventPalette: {
        warmLow: '#F8BD7F',
        warmMid: '#E9724C',
        warmHigh: '#BB4430',
        themeLight: '#a5f3d8',
        themeMid: '#1DD694',
        themeDark: '#16a271',
        neonCyan: '#88D9E6',
        neonPink: '#FF34AE',
        neonLime: '#B5EF8A',
        nightDirt: '#8B635C',
        nightTree: '#526760',
        nightSky: '#336699'
  }
  })

  export { darkTheme, lightTheme };

  declare module '@material-ui/core/styles' {

    interface Theme {
    eventPalette?: {
        warmLow: string,
        warmMid: string,
        warmHigh: string,
        themeLight: string,
        themeMid: string,
        themeDark: string
        neonCyan: string,
        neonPink: string,
        neonLime: string,
        nightDirt: string,
        nightTree: string,
        nightSky: string,
    };
    }
    interface ThemeOptions {
    eventPalette?: {
        warmLow: string,
        warmMid: string,
        warmHigh: string,
        themeLight: string,
        themeMid: string,
        themeDark: string
        neonCyan: string,
        neonPink: string,
        neonLime: string,
        nightDirt: string,
        nightTree: string,
        nightSky: string
    };
    }
  }