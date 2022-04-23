import getApiClient, {IViolation} from "./ApiClient";

import {setUserData, User} from "../features/userSlice";
import {store} from "../app";

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
            console.log(response.data);
        })
        .catch((error) => {
            getUserPromise.succeeded = false;
        })
    ;

    return new Promise<GetUserPromise>(resolve => resolve(getUserPromise as GetUserPromise));
}

export interface UserUpdateProps {
    user: User;
    newData: object;
}

interface UserUpdatePromise {
    succeeded: boolean;
    violations: IViolation[];
}

export async function updateUser(props: UserUpdateProps): Promise<UserUpdatePromise> {
    let userUpdatePromise = {} as UserUpdatePromise;

    await getApiClient().request(
        'PUT',
        `/user/${props.user.id}`,
        parseUserPutIriUrls({
            ...props.user,
            ...props.newData
        }),
        undefined,
        {
            Accept: 'application/ld+json',
            'Content-Type': 'application/ld+json'
        }
    )
        .then((response) => {
            userUpdatePromise.succeeded = true;
            store.dispatch(setUserData(response.data));
        })
        .catch((error) => {
            userUpdatePromise.succeeded = false;
            userUpdatePromise.violations = getApiClient().parseViolations(error.response.data);
        })
    ;

    return new Promise<UserUpdatePromise>(resolve => resolve(userUpdatePromise as UserUpdatePromise));
}


function parseUserPutIriUrls(user: User): object
{
    // TODO
    return user;
}
