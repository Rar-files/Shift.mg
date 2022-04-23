import {AuthCredentials} from "../features/authSlice";
import getApiClient from "./ApiClient";

import jwt_decode from "jwt-decode"

interface AuthPromise {
    succeeded: boolean;
    userId: string;
    token: string;
    refreshToken: string;
}

export interface JwtTokenData {
    userId: string;
    exp: number;
    iat: number;
    username: string;
}

export async function auth(credentials: AuthCredentials): Promise<AuthPromise> {
    let authPromise = {succeeded: false} as AuthPromise;

    await getApiClient().request(
        'POST',
        '/auth/login',
        {authorization_code: credentials.authorizationCode},
        {noAuth: true}
    )
        .then((response) => {
            authPromise.succeeded = true;
            const jwtData = jwt_decode<JwtTokenData>(response.data.token);

            authPromise.userId = jwtData.userId;
            authPromise.token = response.data.token;
            authPromise.refreshToken = response.data.refresh_token;
        })
        .catch((error) => error.response)
    ;

    return new Promise<AuthPromise>(resolve => resolve(authPromise as AuthPromise));
}

export async function refreshAuth(refreshToken: string): Promise<AuthPromise> {
    let authPromise = {succeeded: false} as AuthPromise;

    await getApiClient().request(
        'POST',
        '/auth/refresh',
        {refresh_token: refreshToken},
        {noAuth: true}
    )
        .then((response) => {
            authPromise.succeeded = true;
            authPromise.token = response.data.token;
            authPromise.refreshToken = response.data.refresh_token;
        })
        .catch((error) => error.response)
    ;

    return new Promise<AuthPromise>(resolve => resolve(authPromise as AuthPromise));
}
