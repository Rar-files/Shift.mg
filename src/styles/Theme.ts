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
    eventPalette: {
        warmLow: '#F8BD7F',
        warmMid: '#E9724C',
        warmHigh: '#BB4430',
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
      divider: '#AFAAB9',
    },
    eventPalette: {
        warmLow: '#F8BD7F',
        warmMid: '#E9724C',
        warmHigh: '#BB4430',
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
        neonCyan: string,
        neonPink: string,
        neonLime: string,
        nightDirt: string,
        nightTree: string,
        nightSky: string
    };
    }
    interface ThemeOptions {
    eventPalette?: {
        warmLow: string,
        warmMid: string,
        warmHigh: string,
        neonCyan: string,
        neonPink: string,
        neonLime: string,
        nightDirt: string,
        nightTree: string,
        nightSky: string
    };
    }
  }