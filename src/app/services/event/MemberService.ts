import getApiClient, {IListResponse, IViolation} from "../ApiClient";

import {setMemberData} from "../../../features/event/memberSlice";
import {IMember as Member} from "../../../interfaces/IMember";
import {store} from "../..";


//Get
interface GetMembersPromise {
    succeeded: boolean;
    data: IListResponse<Member> | null;
}

export async function getMembersForEvent(eventId: string): Promise<GetMembersPromise> {
    let getMembersPromise = {succeeded: false} as GetMembersPromise;

    await getApiClient().request(
        'GET',
        `/events/${eventId}/members`,
        {},
        undefined,
        {
            Accept: 'application/json'
        }
    )
        .then((response) => {
            getMembersPromise.succeeded = true;
            getMembersPromise.data = response.data;
        })
        .catch((error) => {
            getMembersPromise.succeeded = false;
        })
    ;

    return new Promise<GetMembersPromise>(resolve => resolve(getMembersPromise as GetMembersPromise));
}


//Get{Id}
interface GetMemberPromise {
    succeeded: boolean;
    data: Member | null;
}

export async function getMember(id: string): Promise<GetMemberPromise> {
    let getMemberPromise = {succeeded: false} as GetMemberPromise;

    await getApiClient().request(
        'GET',
        `/event_members/${id}`,
        {},
        undefined,
        {
            Accept: 'application/json'
        }
    )
        .then((response) => {
            getMemberPromise.succeeded = true;
            getMemberPromise.data = response.data;
        })
        .catch((error) => {
            getMemberPromise.succeeded = false;
        })
    ;

    return new Promise<GetMemberPromise>(resolve => resolve(getMemberPromise as GetMemberPromise));
}


//Create
interface CreateMemberPromise {
    succeeded: boolean;
    violations: IViolation[];
}

export async function CreateMember(member: Member): Promise<CreateMemberPromise> {
    let memberCreatePromise = {} as CreateMemberPromise;

    await getApiClient().request(
        'POST',
        `/event_members/`,
        member,
        undefined,
        {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    )
        .then((response) => {
            memberCreatePromise.succeeded = true;
            store.dispatch(setMemberData(response.data));
        })
        .catch((error) => {
            memberCreatePromise.succeeded = false;
            memberCreatePromise.violations = getApiClient().parseViolations(error.response.data);
        })
    ;

    return new Promise<CreateMemberPromise>(resolve => resolve(memberCreatePromise as CreateMemberPromise));
}


//Update
export interface UpdateMemberProps {
    member: Member;
    newData: object;
}

interface UpdateMemberPromise {
    succeeded: boolean;
    violations: IViolation[];
}

function parseMemberToRequest(member: Member): object
{
    // TODO
    return member;
}

export async function updateMember(props: UpdateMemberProps): Promise<UpdateMemberPromise> {
    let memberUpdatePromise = {} as UpdateMemberPromise;

    await getApiClient().request(
        'PUT',
        `/event_members/${props.member.id}`,
        parseMemberToRequest({
            ...props.member,
            ...props.newData
        }),
        undefined,
        {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    )
        .then((response) => {
            memberUpdatePromise.succeeded = true;
            store.dispatch(setMemberData(response.data));
        })
        .catch((error) => {
            memberUpdatePromise.succeeded = false;
            memberUpdatePromise.violations = getApiClient().parseViolations(error.response.data);
        })
    ;

    return new Promise<UpdateMemberPromise>(resolve => resolve(memberUpdatePromise as UpdateMemberPromise));
}


//Delete
export interface DeleteMemberPromise {
    succeeded: boolean;
    violations: IViolation[];
}

export async function DeleteMember(id: string): Promise<DeleteMemberPromise> {
    let deleteMemberPromise = {succeeded: false} as DeleteMemberPromise;

    await getApiClient().request(
        'DELETE',
        `/event_members/${id}`,
        {},
        undefined,
        {
            Accept: 'application/json'
        }
    )
        .then((response) => {
            deleteMemberPromise.succeeded = true;
        })
        .catch((error) => {
            deleteMemberPromise.succeeded = false;
        })
    ;

    return new Promise<DeleteMemberPromise>(resolve => resolve(deleteMemberPromise as DeleteMemberPromise));
}
