import getApiClient, {IViolation} from "../ApiClient";

import {setIconData} from "../../../features/event/iconSlice";
import { IIcon as Icon } from "../../../interfaces/IIcon";
import {store} from "../..";


//Get
interface GetIconsPromise {
    succeeded: boolean;
    data: Icon[] | null;
}

export async function getIcons(): Promise<GetIconsPromise> {
    let getIconsPromise = {succeeded: false} as GetIconsPromise;

    await getApiClient().request(
        'GET',
        `/event_icons/`,
        {},
        undefined,
        {
            Accept: 'application/json'
        }
    )
        .then((response) => {
            getIconsPromise.succeeded = true;
            getIconsPromise.data = response.data;
        })
        .catch((error) => {
            getIconsPromise.succeeded = false;
        })
    ;

    return new Promise<GetIconsPromise>(resolve => resolve(getIconsPromise as GetIconsPromise));
}


//Get{Id}
interface GetIconPromise {
    succeeded: boolean;
    data: Icon | null;
}

export async function getIcon(id: string): Promise<GetIconPromise> {
    let getIconPromise = {succeeded: false} as GetIconPromise;

    await getApiClient().request(
        'GET',
        `/event_icons/${id}`,
        {},
        undefined,
        {
            Accept: 'application/json'
        }
    )
        .then((response) => {
            getIconPromise.succeeded = true;
            getIconPromise.data = response.data;
        })
        .catch((error) => {
            getIconPromise.succeeded = false;
        })
    ;

    return new Promise<GetIconPromise>(resolve => resolve(getIconPromise as GetIconPromise));
}


//Create
interface CreateIconPromise {
    succeeded: boolean;
    violations: IViolation[];
}

export async function CreateIcon(icon: Icon): Promise<CreateIconPromise> {
    let iconCreatePromise = {} as CreateIconPromise;

    await getApiClient().request(
        'POST',
        `/event_icons/`,
        icon,
        undefined,
        {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    )
        .then((response) => {
            iconCreatePromise.succeeded = true;
            store.dispatch(setIconData(response.data));
        })
        .catch((error) => {
            iconCreatePromise.succeeded = false;
            iconCreatePromise.violations = getApiClient().parseViolations(error.response.data);
        })
    ;

    return new Promise<CreateIconPromise>(resolve => resolve(iconCreatePromise as CreateIconPromise));
}


//Update
export interface UpdateIconProps {
    icon: Icon;
    newData: object;
}

interface UpdateIconPromise {
    succeeded: boolean;
    violations: IViolation[];
}

function parseIconToRequest(icon: Icon): object
{
    // TODO
    return icon;
}

export async function updateIcon(props: UpdateIconProps): Promise<UpdateIconPromise> {
    let iconUpdatePromise = {} as UpdateIconPromise;

    await getApiClient().request(
        'PUT',
        `/event_icons/${props.icon.id}`,
        parseIconToRequest({
            ...props.icon,
            ...props.newData
        }),
        undefined,
        {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    )
        .then((response) => {
            iconUpdatePromise.succeeded = true;
            store.dispatch(setIconData(response.data));
        })
        .catch((error) => {
            iconUpdatePromise.succeeded = false;
            iconUpdatePromise.violations = getApiClient().parseViolations(error.response.data);
        })
    ;

    return new Promise<UpdateIconPromise>(resolve => resolve(iconUpdatePromise as UpdateIconPromise));
}


//Delete
export interface DeleteIconPromise {
    succeeded: boolean;
    violations: IViolation[];
}

export async function deleteIcon(id: string): Promise<DeleteIconPromise> {
    let deleteIconPromise = {succeeded: false} as DeleteIconPromise;

    await getApiClient().request(
        'DELETE',
        `/event_icons/${id}`,
        {},
        undefined,
        {
            Accept: 'application/json'
        }
    )
        .then((response) => {
            deleteIconPromise.succeeded = true;
        })
        .catch((error) => {
            deleteIconPromise.succeeded = false;
        })
    ;

    return new Promise<DeleteIconPromise>(resolve => resolve(deleteIconPromise as DeleteIconPromise));
}
