import getApiClient from "./ApiClient";
import {IUser as User} from "../../interfaces/IUser";
import {INotify as Notify} from "../../interfaces/INotify";
import IPaginableResponse from "./IPaginableResponse";


//Search users
interface GetUsersPromise {
    succeeded: boolean;
    data: IPaginableResponse<User> | null;
}
export async function getUsersByUsername(username : string): Promise<GetUsersPromise> {
    let getUsersPromise = {succeeded: false} as GetUsersPromise;

    await getApiClient().request(
        'GET',
        `/users/search?username=${username}`,
        {},
        undefined,
        {
            Accept: 'application/json'
        }
    )
        .then((response) => {
            getUsersPromise.succeeded = true;
            getUsersPromise.data = response.data;
        })
        .catch((error) => {
            getUsersPromise.succeeded = false;
        })
    ;

    return new Promise<GetUsersPromise>(resolve => resolve(getUsersPromise as GetUsersPromise));
}


//Get
interface GetUserPromise {
    succeeded: boolean;
    data: User | null;
}

export async function getUser(id: string): Promise<GetUserPromise> {
    let getUserPromise = {succeeded: false} as GetUserPromise;

    await getApiClient().request(
        'GET',
        `/user/${id}`,
        {},
        undefined,
        {
            Accept: 'application/json'
        }
    )
        .then((response) => {
            getUserPromise.succeeded = true;
            getUserPromise.data = response.data;
        })
        .catch((error) => {
            getUserPromise.succeeded = false;
        })
    ;

    return new Promise<GetUserPromise>(resolve => resolve(getUserPromise as GetUserPromise));
}

//Get user notifications
interface GetUserNotifyPromise {
    succeeded: boolean;
    data: Notify[] | null;
}

export async function getUserNotify(id: string): Promise<GetUserNotifyPromise> {
    let getUserNotifyPromise = {succeeded: false} as GetUserNotifyPromise;

    await getApiClient().request(
        'GET',
        `/user/${id}/notifications`,
        {},
        undefined,
        {
            Accept: 'application/json'
        }
    )
        .then((response) => {
            getUserNotifyPromise.succeeded = true;
            getUserNotifyPromise.data = response.data;
        })
        .catch((error) => {
            getUserNotifyPromise.succeeded = false;
        })
    ;

    return new Promise<GetUserNotifyPromise>(resolve => resolve(getUserNotifyPromise as GetUserNotifyPromise));
}
