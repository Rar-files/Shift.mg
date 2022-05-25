import getApiClient, {IViolation} from "./ApiClient";

import {setNotifyData} from "../../features/notifySlice";
import {INotify as Notify} from "../../interfaces/INotify";
import {store} from "../";


//Get{Id}
interface GetNotifyPromise {
    succeeded: boolean;
    data: Notify | null;
}

export async function getNotify(id: string): Promise<GetNotifyPromise> {
    let getNotifyPromise = {succeeded: false} as GetNotifyPromise;

    await getApiClient().request(
        'GET',
        `/notifications/${id}`,
        {},
        undefined,
        {
            Accept: 'application/json'
        }
    )
        .then((response) => {
            getNotifyPromise.succeeded = true;
            getNotifyPromise.data = response.data;
        })
        .catch((error) => {
            getNotifyPromise.succeeded = false;
        })
    ;

    return new Promise<GetNotifyPromise>(resolve => resolve(getNotifyPromise as GetNotifyPromise));
}


//Update
export interface UpdateNotifyProps {
    notify: Notify;
    newData: object;
}

interface UpdateNotifyPromise {
    succeeded: boolean;
    violations: IViolation[];
}

function parseNotifyToRequest(notify: Notify): object
{
    // TODO
    return notify;
}

export async function updateNotify(props: UpdateNotifyProps): Promise<UpdateNotifyPromise> {
    let notifyUpdatePromise = {} as UpdateNotifyPromise;

    await getApiClient().request(
        'PUT',
        `/notifications/${props.notify.id}`,
        parseNotifyToRequest({
            ...props.notify,
            ...props.newData
        }),
        undefined,
        {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    )
        .then((response) => {
            notifyUpdatePromise.succeeded = true;
            store.dispatch(setNotifyData(response.data));
        })
        .catch((error) => {
            notifyUpdatePromise.succeeded = false;
            notifyUpdatePromise.violations = getApiClient().parseViolations(error.response.data);
        })
    ;

    return new Promise<UpdateNotifyPromise>(resolve => resolve(notifyUpdatePromise as UpdateNotifyPromise));
}
