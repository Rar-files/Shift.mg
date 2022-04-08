import { FC } from 'react'
import type { AppProps } from 'next/app'

import AppThemeProvider from '../app/providers/AppThemeProvider';
import AppLoginProvider from '../app/providers/AppLoginProvider';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <AppThemeProvider>
        <Component {...pageProps} />
  </AppThemeProvider>
)

export default App;
