import getApiClient, {IViolation} from "../ApiClient";

import {setRoleData} from "../../../features/event/roleSlice";
import {IRole as Role} from "../../../interfaces/IRole";
import {store} from "../..";


//Get
interface GetRolesPromise {
    succeeded: boolean;
    data: Role[] | null;
}

export async function getRoles(): Promise<GetRolesPromise> {
    let getRolesPromise = {succeeded: false} as GetRolesPromise;

    await getApiClient().request(
        'GET',
        `/event_roles/`,
        {},
        undefined,
        {
            Accept: 'application/ld+json'
        }
    )
        .then((response) => {
            getRolesPromise.succeeded = true;
            getRolesPromise.data = response.data;
        })
        .catch((error) => {
            getRolesPromise.succeeded = false;
        })
    ;

    return new Promise<GetRolesPromise>(resolve => resolve(getRolesPromise as GetRolesPromise));
}


//Get{Id}
interface GetRolePromise {
    succeeded: boolean;
    data: Role | null;
}

export async function getRole(id: string): Promise<GetRolePromise> {
    let getRolePromise = {succeeded: false} as GetRolePromise;

    await getApiClient().request(
        'GET',
        `/event_roles/${id}`,
        {},
        undefined,
        {
            Accept: 'application/ld+json'
        }
    )
        .then((response) => {
            getRolePromise.succeeded = true;
            getRolePromise.data = response.data;
        })
        .catch((error) => {
            getRolePromise.succeeded = false;
        })
    ;

    return new Promise<GetRolePromise>(resolve => resolve(getRolePromise as GetRolePromise));
}


//Create
interface CreateRolePromise {
    succeeded: boolean;
    violations: IViolation[];
}

export async function CreateRole(role: Role): Promise<CreateRolePromise> {
    let roleCreatePromise = {} as CreateRolePromise;

    await getApiClient().request(
        'POST',
        `/event_roles/`,
        role,
        undefined,
        {
            Accept: 'application/ld+json',
            'Content-Type': 'application/ld+json'
        }
    )
        .then((response) => {
            roleCreatePromise.succeeded = true;
            store.dispatch(setRoleData(response.data));
        })
        .catch((error) => {
            roleCreatePromise.succeeded = false;
            roleCreatePromise.violations = getApiClient().parseViolations(error.response.data);
        })
    ;

    return new Promise<CreateRolePromise>(resolve => resolve(roleCreatePromise as CreateRolePromise));
}


//Update
export interface UpdateRoleProps {
    role: Role;
    newData: object;
}

interface UpdateRolePromise {
    succeeded: boolean;
    violations: IViolation[];
}

function parseRoleToRequest(role: Role): object
{
    // TODO
    return role;
}

export async function updateRole(props: UpdateRoleProps): Promise<UpdateRolePromise> {
    let roleUpdatePromise = {} as UpdateRolePromise;

    await getApiClient().request(
        'PUT',
        `/event_roles/${props.role.id}`,
        parseRoleToRequest({
            ...props.role,
            ...props.newData
        }),
        undefined,
        {
            Accept: 'application/ld+json',
            'Content-Type': 'application/ld+json'
        }
    )
        .then((response) => {
            roleUpdatePromise.succeeded = true;
            store.dispatch(setRoleData(response.data));
        })
        .catch((error) => {
            roleUpdatePromise.succeeded = false;
            roleUpdatePromise.violations = getApiClient().parseViolations(error.response.data);
        })
    ;

    return new Promise<UpdateRolePromise>(resolve => resolve(roleUpdatePromise as UpdateRolePromise));
}


//Delete
export interface DeleteRolePromise {
    succeeded: boolean;
    violations: IViolation[];
}

export async function deleteRole(id: string): Promise<DeleteRolePromise> {
    let deleteRolePromise = {succeeded: false} as DeleteRolePromise;

    await getApiClient().request(
        'DELETE',
        `/event_roles/${id}`,
        {},
        undefined,
        {
            Accept: 'application/ld+json'
        }
    )
        .then((response) => {
            deleteRolePromise.succeeded = true;
        })
        .catch((error) => {
            deleteRolePromise.succeeded = false;
        })
    ;

    return new Promise<DeleteRolePromise>(resolve => resolve(deleteRolePromise as DeleteRolePromise));
}