import getApiClient from "./ApiClient";
import {IUser as User} from "../../interfaces/IUser";
import {INotify as Notify} from "../../interfaces/INotify";


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
            Accept: 'application/ld+json'
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
            Accept: 'application/ld+json'
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
