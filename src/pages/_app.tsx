import {FC} from 'react'
import type {AppProps} from 'next/app'

import AppThemeProvider from '../app/providers/AppThemeProvider';
import {Provider} from "react-redux";
import {store} from "../app";
import Layout from "../components/Layout";
import Firewall from "../components/Auth/Firewall";
import UserProvider from "../components/UserProvider";

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
                <Firewall protected={pageProps.protected ?? false}>
                    <UserProvider />
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </Firewall>
            </AppThemeProvider>
        </Provider>
        </SafeHydrate>
    );
}

export default App;
