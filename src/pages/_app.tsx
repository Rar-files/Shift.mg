import { FC } from 'react'
import type { AppProps } from 'next/app'

import AppThemeProvider from '../app/AppThemeProvider';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <AppThemeProvider>
    <Component {...pageProps} />
  </AppThemeProvider>
)

export default App;
