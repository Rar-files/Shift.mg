import {FC, useEffect} from 'react'
import type {AppProps} from 'next/app'

import 'react-big-calendar/lib/css/react-big-calendar.css';

import AppThemeProvider from '../app/providers/AppThemeProvider';
import {Provider} from "react-redux";
import {store} from "../app";
import Layout from "../components/Layout";
import Firewall from "../components/Auth/Firewall";
import UserProvider from "../app/providers/UserProvider";

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
            <AppThemeProvider>
                <UserProvider>
                    <Firewall protected={pageProps.protected ?? false}>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </Firewall>
                </UserProvider>
            </AppThemeProvider>
        </Provider>
        </SafeHydrate>
    );
}

export default App;
