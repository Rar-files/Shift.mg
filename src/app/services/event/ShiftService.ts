import getApiClient, {IViolation} from "../ApiClient";

import {setShiftData} from "../../../features/event/shiftSlice";
import {IShift as Shift} from "../../../interfaces/IShift";
import {store} from "../..";


//Get
interface GetShiftsPromise {
    succeeded: boolean;
    data: Shift[] | null;
}

export async function getShifts(): Promise<GetShiftsPromise> {
    let getShiftsPromise = {succeeded: false} as GetShiftsPromise;

    await getApiClient().request(
        'GET',
        `/event_shifts/`,
        {},
        undefined,
        {
            Accept: 'application/ld+json'
        }
    )
        .then((response) => {
            getShiftsPromise.succeeded = true;
            getShiftsPromise.data = response.data;
        })
        .catch((error) => {
            getShiftsPromise.succeeded = false;
        })
    ;

    return new Promise<GetShiftsPromise>(resolve => resolve(getShiftsPromise as GetShiftsPromise));
}


//Get{Id}
interface GetShiftPromise {
    succeeded: boolean;
    data: Shift | null;
}

export async function getShift(id: string): Promise<GetShiftPromise> {
    let getShiftPromise = {succeeded: false} as GetShiftPromise;

    await getApiClient().request(
        'GET',
        `/event_shifts/${id}`,
        {},
        undefined,
        {
            Accept: 'application/ld+json'
        }
    )
        .then((response) => {
            getShiftPromise.succeeded = true;
            getShiftPromise.data = response.data;
            console.log(response.data);
        })
        .catch((error) => {
            getShiftPromise.succeeded = false;
        })
    ;

    return new Promise<GetShiftPromise>(resolve => resolve(getShiftPromise as GetShiftPromise));
}


//Create
interface CreateShiftPromise {
    succeeded: boolean;
    violations: IViolation[];
}

export async function CreateShift(shift: Shift): Promise<CreateShiftPromise> {
    let shiftCreatePromise = {} as CreateShiftPromise;

    await getApiClient().request(
        'POST',
        `/event_shifts/`,
        shift,
        undefined,
        {
            Accept: 'application/ld+json',
            'Content-Type': 'application/ld+json'
        }
    )
        .then((response) => {
            shiftCreatePromise.succeeded = true;
            store.dispatch(setShiftData(response.data));
        })
        .catch((error) => {
            shiftCreatePromise.succeeded = false;
            shiftCreatePromise.violations = getApiClient().parseViolations(error.response.data);
        })
    ;

    return new Promise<CreateShiftPromise>(resolve => resolve(shiftCreatePromise as CreateShiftPromise));
}


//Update
export interface UpdateShiftProps {
    shift: Shift;
    newData: object;
}

interface UpdateShiftPromise {
    succeeded: boolean;
    violations: IViolation[];
}

function parseShiftToRequest(shift: Shift): object
{
    // TODO
    return shift;
}

export async function updateShift(props: UpdateShiftProps): Promise<UpdateShiftPromise> {
    let shiftUpdatePromise = {} as UpdateShiftPromise;

    await getApiClient().request(
        'PUT',
        `/event_shifts/${props.shift.id}`,
        parseShiftToRequest({
            ...props.shift,
            ...props.newData
        }),
        undefined,
        {
            Accept: 'application/ld+json',
            'Content-Type': 'application/ld+json'
        }
    )
        .then((response) => {
            shiftUpdatePromise.succeeded = true;
            store.dispatch(setShiftData(response.data));
        })
        .catch((error) => {
            shiftUpdatePromise.succeeded = false;
            shiftUpdatePromise.violations = getApiClient().parseViolations(error.response.data);
        })
    ;

    return new Promise<UpdateShiftPromise>(resolve => resolve(shiftUpdatePromise as UpdateShiftPromise));
}


//Delete
export interface DeleteShiftPromise {
    succeeded: boolean;
    violations: IViolation[];
}

export async function deleteShift(id: string): Promise<DeleteShiftPromise> {
    let deleteShiftPromise = {succeeded: false} as DeleteShiftPromise;

    await getApiClient().request(
        'DELETE',
        `/event_shifts/${id}`,
        {},
        undefined,
        {
            Accept: 'application/ld+json'
        }
    )
        .then((response) => {
            deleteShiftPromise.succeeded = true;
            console.log(response.data);
        })
        .catch((error) => {
            deleteShiftPromise.succeeded = false;
        })
    ;

    return new Promise<DeleteShiftPromise>(resolve => resolve(deleteShiftPromise as DeleteShiftPromise));
}