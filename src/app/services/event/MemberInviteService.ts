import getApiClient, {IViolation} from "../ApiClient";

import {setMemberInviteData} from "../../../features/event/memberInviteSlice";
import { IMemberInvite as MemberInvite } from "../../../interfaces/IMemberInvite";
import {store} from "../..";


//Get{Id}
interface GetMemberInvitePromise {
    succeeded: boolean;
    data: MemberInvite | null;
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
            console.log(response.data);
        })
        .catch((error) => {
            getMemberInvitePromise.succeeded = false;
        })
    ;

    return new Promise<GetMemberInvitePromise>(resolve => resolve(getMemberInvitePromise as GetMemberInvitePromise));
}


//Update
export interface UpdateMemberInviteProps {
    memberInvite: MemberInvite;
    newData: object;
}

interface UpdateMemberInvitePromise {
    succeeded: boolean;
    violations: IViolation[];
}

function parseMemberInviteToRequest(memberInvite: MemberInvite): object
{
    // TODO
    return memberInvite;
}

export async function updateMemberInvite(props: UpdateMemberInviteProps): Promise<UpdateMemberInvitePromise> {
    let memberInviteUpdatePromise = {} as UpdateMemberInvitePromise;

    await getApiClient().request(
        'PUT',
        `/event_member_invites/${props.memberInvite.id}`,
        parseMemberInviteToRequest({
            ...props.memberInvite,
            ...props.newData
        }),
        undefined,
        {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    )
        .then((response) => {
            memberInviteUpdatePromise.succeeded = true;
            store.dispatch(setMemberInviteData(response.data));
        })
        .catch((error) => {
            memberInviteUpdatePromise.succeeded = false;
            memberInviteUpdatePromise.violations = getApiClient().parseViolations(error.response.data);
        })
    ;

    return new Promise<UpdateMemberInvitePromise>(resolve => resolve(memberInviteUpdatePromise as UpdateMemberInvitePromise));
}
