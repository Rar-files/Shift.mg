import axios, {AxiosResponse, Method} from "axios";
import {store} from "..";
import {AuthStatus, logout, refreshAuth} from "../../features/authSlice";
import jwt_decode from "jwt-decode";
import {JwtTokenData} from "./AuthService";

export interface RequestConfig {
    noAuth?: boolean;
}

export interface IListMetadata {
    total: number;
    pages: number;
    itemsPerPage: number;
}

export interface IListResponse<T> {
    items: T[];
    metadata: IListMetadata;
}

export interface IViolation {
    code: string;
    message: string;
    propertyPath: string;
}

export class ApiClient {
    protected readonly baseUrl: string;

    constructor() {
        this.baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT as string;
    }

    public async request(method: Method, url: string, data: object, config: RequestConfig = {}, headers: object = {}): Promise<AxiosResponse> {
        const authHeader = config.noAuth === true ? {} : await ApiClient.getAuthHeader();

        return axios.request({
            method: method,
            url: this.baseUrl + url,
            data: data,
            headers: {...headers, ...authHeader}
        });
    }

    private static async getAuthHeader(): Promise<object>
    {
        let state = store.getState();

        if (state.auth.status !== AuthStatus.AUTHORIZED) {
            return {};
        }

        const token = jwt_decode<JwtTokenData>(state.auth.token!);

        if (token.exp <= Math.round(+new Date()/1000)) {
            if (state.auth.refreshToken === null) {
                store.dispatch(logout());
                return {};
            }

            await store.dispatch(refreshAuth(state.auth.refreshToken));
            state = store.getState();
        }

        return {Authorization: `Bearer ${state.auth.token}`};
    }

    public parseViolations(data: {violations: object[]}): IViolation[]
    {
        let violations: IViolation[] = [];

        for(let violationData of data.violations) {
            violations.push(violationData as IViolation);
        }

        return violations;
    }
}

let apiClient: ApiClient | null = null;

export default function getApiClient(): ApiClient {
    if (apiClient === null) {
        apiClient = new ApiClient();
    }

    return apiClient as ApiClient;
};
