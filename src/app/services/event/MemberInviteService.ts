import getApiClient, {IViolation} from "../ApiClient";

import {setMemberInviteData} from "../../../features/event/memberInviteSlice";
import { IMemberInvite as MemberInvite } from "../../../interfaces/IMemberInvite";
import {store} from "../..";


//Get{Id}
interface GetMemberInvitePromise {
    succeeded: boolean;
    data: MemberInvite | null;
    violations: IViolation[];
}

export async function getMemberInvite(id: string): Promise<GetMemberInvitePromise> {
    let getMemberInvitePromise = {succeeded: false} as GetMemberInvitePromise;

    await getApiClient().request(
        'GET',
        `/event_member_invites/${id}`,
        {},
        undefined,
        {
            Accept: 'application/json'
        }
    )
        .then((response) => {
            getMemberInvitePromise.succeeded = true;
            getMemberInvitePromise.data = response.data;
        })
        .catch((error) => {
            getMemberInvitePromise.succeeded = false;
            getMemberInvitePromise.violations = getApiClient().parseViolations(error.response.data);
        })
    ;

    return new Promise<GetMemberInvitePromise>(resolve => resolve(getMemberInvitePromise as GetMemberInvitePromise));
}


//Update{Id}
//accept
export interface UpdateMemberInvitePromise {
    status: boolean;
    violations: IViolation[];
}

export async function memberInviteAccept(id: string): Promise<UpdateMemberInvitePromise> {
    let memberInviteUpdatePromise = {} as UpdateMemberInvitePromise;

    await getApiClient().request(
        'PUT',
        `/event_member_invites/${id}/accept`,
        {},
        undefined,
        {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    )
        .then(() => {
            memberInviteUpdatePromise.status = true;
        })
        .catch((error) => {
            memberInviteUpdatePromise.status = false;
            memberInviteUpdatePromise.violations = getApiClient().parseViolations(error.response.data);
        })
    ;

    return new Promise<UpdateMemberInvitePromise>(resolve => resolve(memberInviteUpdatePromise as UpdateMemberInvitePromise));
}

//decline
export async function memberInviteDecline(id: string): Promise<UpdateMemberInvitePromise> {
    let memberInviteUpdatePromise = {} as UpdateMemberInvitePromise;

    await getApiClient().request(
        'PUT',
        `/event_member_invites/${id}/decline`,
        {},
        undefined,
        {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    )
        .then(() => {
            memberInviteUpdatePromise.status = true;
        })
        .catch((error) => {
            memberInviteUpdatePromise.status = false;
            memberInviteUpdatePromise.violations = getApiClient().parseViolations(error.response.data);
        })
    ;

    return new Promise<UpdateMemberInvitePromise>(resolve => resolve(memberInviteUpdatePromise as UpdateMemberInvitePromise));
}
