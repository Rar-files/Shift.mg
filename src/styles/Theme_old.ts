const light = {
    app: {
        background: '#ffffff',
        backgroundVariant: '#36393B',
        foreground: '#CBC7D1',
        foregroundVariant: '#AFAAB9',
        separator: '#AFAAB9',
    },
    text: {
        primary: '#FFFFFF',
        secondary: '#E5E5E5',
        tertiary: '#CBC7D1',
        accent: '#F8BD7F',
        placeholder: '#807f84',
    },
}
    
const dark = {
    app: {
        background: '#45484A',
        backgroundVariant: '#36393B',
        foreground: '#CBC7D1',
        foregroundVariant: '#AFAAB9',
        separator: '#AFAAB9',
    },
    text: {
        primary: '#FFFFFF',
        secondary: '#E5E5E5',
        tertiary: '#CBC7D1',
        accent: '#F8BD7F',
        placeholder: '#807f84',
    },
}
    
const defaultTheme = {
    static: {
        primary: '#1DD694',
        primaryDark: '#16A271',
        primaryLight: '#A5F3D8',
        accent: '#F8BD7F',
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
    },
    fontSizes: [
        '12px', // 0
        '14px', // 1
        '16px', // 2
        '18px', // 3
        '32px', // 4
        '36px', // 5
        '52px', // 6
        '64px', // 7
        '146px', // 8
    ],
    fontWeights: {
        body: 400,
        subheading: 500,
        link: 600,
        bold: 700,
        heading: 800,
    },
    lineHeights: {
        body: 1.5,
        heading: 1.3,
        code: 1.6,
    }
}
  
export const lightTheme = { ...defaultTheme, ...light }
export const darkTheme = { ...defaultTheme, ...dark }