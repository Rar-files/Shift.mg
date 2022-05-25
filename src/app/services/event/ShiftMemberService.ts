import getApiClient, {IViolation} from "../ApiClient";

import {setShiftMemberData} from "../../../features/event/shiftMemberSlice";
import {IShiftMember as ShiftMember} from "../../../interfaces/IShiftMember";
import {store} from "../..";


//Get
interface GetShiftMembersPromise {
    succeeded: boolean;
    data: ShiftMember[] | null;
}

export async function getShiftMembers(): Promise<GetShiftMembersPromise> {
    let getShiftMembersPromise = {succeeded: false} as GetShiftMembersPromise;

    await getApiClient().request(
        'GET',
        `/event_shift_members/`,
        {},
        undefined,
        {
            Accept: 'application/ld+json'
        }
    )
        .then((response) => {
            getShiftMembersPromise.succeeded = true;
            getShiftMembersPromise.data = response.data;
        })
        .catch((error) => {
            getShiftMembersPromise.succeeded = false;
        })
    ;

    return new Promise<GetShiftMembersPromise>(resolve => resolve(getShiftMembersPromise as GetShiftMembersPromise));
}


//Get{Id}
interface GetShiftMemberPromise {
    succeeded: boolean;
    data: ShiftMember | null;
}

export async function getShiftMember(id: string): Promise<GetShiftMemberPromise> {
    let getShiftMemberPromise = {succeeded: false} as GetShiftMemberPromise;

    await getApiClient().request(
        'GET',
        `/event_shift_members/${id}`,
        {},
        undefined,
        {
            Accept: 'application/ld+json'
        }
    )
        .then((response) => {
            getShiftMemberPromise.succeeded = true;
            getShiftMemberPromise.data = response.data;
        })
        .catch((error) => {
            getShiftMemberPromise.succeeded = false;
        })
    ;

    return new Promise<GetShiftMemberPromise>(resolve => resolve(getShiftMemberPromise as GetShiftMemberPromise));
}


//Create
interface CreateShiftMemberPromise {
    succeeded: boolean;
    violations: IViolation[];
}

export async function CreateShiftMember(shiftMember: ShiftMember): Promise<CreateShiftMemberPromise> {
    let shiftMemberCreatePromise = {} as CreateShiftMemberPromise;

    await getApiClient().request(
        'POST',
        `/event_shift_members/`,
        shiftMember,
        undefined,
        {
            Accept: 'application/ld+json',
            'Content-Type': 'application/ld+json'
        }
    )
        .then((response) => {
            shiftMemberCreatePromise.succeeded = true;
            store.dispatch(setShiftMemberData(response.data));
        })
        .catch((error) => {
            shiftMemberCreatePromise.succeeded = false;
            shiftMemberCreatePromise.violations = getApiClient().parseViolations(error.response.data);
        })
    ;

    return new Promise<CreateShiftMemberPromise>(resolve => resolve(shiftMemberCreatePromise as CreateShiftMemberPromise));
}


//Update
export interface UpdateShiftMemberProps {
    shiftMember: ShiftMember;
    newData: object;
}

interface UpdateShiftMemberPromise {
    succeeded: boolean;
    violations: IViolation[];
}

function parseShiftMemberToRequest(shiftMember: ShiftMember): object
{
    // TODO
    return shiftMember;
}

export async function updateShiftMember(props: UpdateShiftMemberProps): Promise<UpdateShiftMemberPromise> {
    let shiftMemberUpdatePromise = {} as UpdateShiftMemberPromise;

    await getApiClient().request(
        'PUT',
        `/event_shift_members/${props.shiftMember.id}`,
        parseShiftMemberToRequest({
            ...props.shiftMember,
            ...props.newData
        }),
        undefined,
        {
            Accept: 'application/ld+json',
            'Content-Type': 'application/ld+json'
        }
    )
        .then((response) => {
            shiftMemberUpdatePromise.succeeded = true;
            store.dispatch(setShiftMemberData(response.data));
        })
        .catch((error) => {
            shiftMemberUpdatePromise.succeeded = false;
            shiftMemberUpdatePromise.violations = getApiClient().parseViolations(error.response.data);
        })
    ;

    return new Promise<UpdateShiftMemberPromise>(resolve => resolve(shiftMemberUpdatePromise as UpdateShiftMemberPromise));
}


//Delete
export interface DeleteShiftMemberPromise {
    succeeded: boolean;
    violations: IViolation[];
}

export async function deleteShiftMember(id: string): Promise<DeleteShiftMemberPromise> {
    let deleteShiftMemberPromise = {succeeded: false} as DeleteShiftMemberPromise;

    await getApiClient().request(
        'DELETE',
        `/event_shift_members/${id}`,
        {},
        undefined,
        {
            Accept: 'application/ld+json'
        }
    )
        .then((response) => {
            deleteShiftMemberPromise.succeeded = true;
        })
        .catch((error) => {
            deleteShiftMemberPromise.succeeded = false;
        })
    ;

    return new Promise<DeleteShiftMemberPromise>(resolve => resolve(deleteShiftMemberPromise as DeleteShiftMemberPromise));
}