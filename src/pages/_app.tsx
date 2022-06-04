import {FC, useEffect} from 'react'
import type {AppProps} from 'next/app'

import AppThemeProvider from '../app/providers/AppThemeProvider';
import {Provider} from "react-redux";
import {store} from "../app";
import Layout from "../components/Layout";
import Firewall from "../components/Auth/Firewall";
import UserProvider from "../components/UserProvider";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const SafeHydrate: FC = ({ children }) => {
    return (
        <div suppressHydrationWarning>
            {typeof window === 'undefined' ? null : children}
        </div>
    )
}

const App: FC<AppProps> = ({ Component, pageProps }) => {

    return (
        <SafeHydrate>
        <Provider store={store}>
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
                <AppThemeProvider>
                    <Firewall protected={pageProps.protected ?? false}>
                        <UserProvider />
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </Firewall>
                </AppThemeProvider>
            {/* </LocalizationProvider> */}
        </Provider>
        </SafeHydrate>
    );
}

export default App;
