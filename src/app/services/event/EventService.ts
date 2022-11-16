import getApiClient, {IListResponse, IViolation} from "../ApiClient";

import { IEvent as Event, IEvent } from "../../../interfaces/IEvent";
import { IMember as EventMember } from "../../../interfaces/IMember";
import { ToEventDto } from "../../../Dtos/EventDto";
import { EventInviteDto } from "../../../Dtos/EventInviteDto";
import {dateToYMD} from "../../helpers/functions";
import { IRole } from "../../../interfaces/IRole";

// Get user event filters
export interface GetUserEventsFilters {
    startDate: Date;
    endDate: Date;
}

//Get for user
interface GetEventsPromise {
    succeeded: boolean;
    data: IListResponse<Event>;
}

export async function getUserEvents(userId: string, filters: GetUserEventsFilters|null = null): Promise<GetEventsPromise> {
    let getEventsPromise = {succeeded: false} as GetEventsPromise;

    let preparedUri = `/user/${userId}/events`;

    if (filters !== null) {
        preparedUri = `${preparedUri}?startDate[after]=${dateToYMD(filters.startDate)}&endDate[before]=${dateToYMD(filters.endDate)}&paginate=false`
    }

    await getApiClient().request(
        'GET',
        preparedUri,
        {},
        undefined,
        {
            Accept: 'application/json'
        }
    )
        .then((response) => {
            getEventsPromise.succeeded = true;

            response.data.items = response.data.items.map((item: IEvent) => {
                item.startDate = new Date(item.startDate);
                item.endDate = new Date(item.endDate);
                return item;
            });

            getEventsPromise.data = response.data;
        })
        .catch((error) => {
            getEventsPromise.succeeded = false;
        })
    ;

    return new Promise<GetEventsPromise>(resolve => resolve(getEventsPromise as GetEventsPromise));
}

//Get search
export async function getEvents(keyword : string | null = null): Promise<GetEventsPromise> {
    let getEventsPromise = {succeeded: false} as GetEventsPromise;

    await getApiClient().request(
        'GET',
        keyword != null ? `/events?name=${keyword}` : '/events',
        {},
        undefined,
        {
            Accept: 'application/json'
        }
    )
        .then((response) => {
            getEventsPromise.succeeded = true;

            response.data.items = response.data.items.map((item: IEvent) => {
                item.startDate = new Date(item.startDate);
                item.endDate = new Date(item.endDate);
                return item;
            });

            getEventsPromise.data = response.data;
        })
        .catch((error) => {
            getEventsPromise.succeeded = false;
        })
    ;

    return new Promise<GetEventsPromise>(resolve => resolve(getEventsPromise as GetEventsPromise));
}


//Get{Id}
interface GetEventPromise {
    succeeded: boolean;
    data: Event | null;
}

export async function GetEvent(id: string): Promise<GetEventPromise> {
    let getEventPromise = {succeeded: false} as GetEventPromise;

    await getApiClient().request(
        'GET',
        `/events/${id}`,
        {},
        undefined,
        {
            Accept: 'application/json'
        }
    )
        .then((response) => {
            getEventPromise.succeeded = true;
            getEventPromise.data = response.data;
        })
        .catch((error) => {
            getEventPromise.succeeded = false;
        })
    ;

    return new Promise<GetEventPromise>(resolve => resolve(getEventPromise as GetEventPromise));
}

//GetMembers{Id}
interface GetEventMembersPromise {
    succeeded: boolean;
    data: EventMember[] | null;
}

interface EventMemberDto{
        id: string;
        event: string;
        user: {
            id: string;
            username: string;
            displayName: string;
        }
        role: IRole;
        joinedAt: Date;
}

const ToEventMemberFromDto = (eventMemberDto : EventMemberDto) : EventMember => {
    
    return({
    ...eventMemberDto,
    user: {
        ...eventMemberDto.user,
        roles: []
    }
    })
}

export async function GetEventMembers(id: string): Promise<GetEventMembersPromise> {
    let getEventMembersPromise = {succeeded: false} as GetEventMembersPromise;

    await getApiClient().request(
        'GET',
        `/events/${id}`,
        {},
        undefined,
        {
            Accept: 'application/json'
        }
    )
        .then((response) => {
            getEventMembersPromise.succeeded = true;
            getEventMembersPromise.data = (response.data as EventMemberDto[]).map((element) => <EventMember>ToEventMemberFromDto(element));
        })
        .catch((error) => {
            getEventMembersPromise.succeeded = false;
        })
    ;

    return new Promise<GetEventMembersPromise>(resolve => resolve(getEventMembersPromise as GetEventMembersPromise));
}


//Create
interface CreateEventPromise {
    id: string;
    succeeded: boolean;
    violations: IViolation[];
}

export async function CreateEvent(event: IEvent): Promise<CreateEventPromise> {
    let eventCreatePromise = {} as CreateEventPromise;

    const eventDto = ToEventDto(event);

    await getApiClient().request(
        'POST',
        `/events`,
        eventDto,
        undefined,
        {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    )
        .then((response) => {
            eventCreatePromise.succeeded = true;
            eventCreatePromise.id = response.data.id;
            // todo dispatch getUserEvents with userId
            //store.dispatch(setEventsData(response.data));
        })
        .catch((error) => {
            eventCreatePromise.succeeded = false;
            eventCreatePromise.violations = getApiClient().parseViolations(error.response.data);
        })
    ;

    return new Promise<CreateEventPromise>(resolve => resolve(eventCreatePromise as CreateEventPromise));
}

//CreateInvite
interface EventInvitePromise {
    data: any;
    succeeded: boolean;
    violations: IViolation[];
}

export async function CreateEventInvite(eventId: string, invite : EventInviteDto): Promise<EventInvitePromise> {
    let eventInvitePromise = {} as EventInvitePromise;

    invite.role = `/api/event_roles/${invite.role}`;

    if (invite.user) {
        invite.user = `/api/user/${invite.user}`;
    }

    await getApiClient().request(
        'POST',
        `/events/${eventId}/invites`,
        invite,
        undefined,
        {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    )
        .then((response) => {
            eventInvitePromise.succeeded = true;
            eventInvitePromise.data = response.data;
        })
        .catch((error) => {
            eventInvitePromise.succeeded = false;
            eventInvitePromise.violations = getApiClient().parseViolations(error.response.data);
        })
    ;

    return new Promise<EventInvitePromise>(resolve => resolve(eventInvitePromise as EventInvitePromise));
}


//Update
interface UpdateEventPromise {
    succeeded: boolean;
    violations: IViolation[];
}

function parseEventToRequest(event: Event): object
{
    // TODO
    return event;
}

export async function UpdateEvent(event: IEvent): Promise<UpdateEventPromise> {
    let eventUpdatePromise = {} as UpdateEventPromise;

    const eventDto = ToEventDto(event);

    await getApiClient().request(
        'PUT',
        `/events/${event.id}`,
        eventDto,
        undefined,
        {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    )
        .then((response) => {
            eventUpdatePromise.succeeded = true;
            // todo dispatch getUserEvents with userId
            //store.dispatch(setEventData(response.data));
        })
        .catch((error) => {
            eventUpdatePromise.succeeded = false;
            eventUpdatePromise.violations = getApiClient().parseViolations(error.response.data);
        })
    ;

    return new Promise<UpdateEventPromise>(resolve => resolve(eventUpdatePromise as UpdateEventPromise));
}


//Delete
export interface DeleteEventPromise {
    succeeded: boolean;
    violations: IViolation[];
}

export async function DeleteEvent(id: string): Promise<DeleteEventPromise> {
    let deleteEventPromise = {succeeded: false} as DeleteEventPromise;

    await getApiClient().request(
        'DELETE',
        `/events/${id}`,
        {},
        undefined,
        {
            Accept: 'application/json'
        }
    )
        .then((response) => {
            deleteEventPromise.succeeded = true;
        })
        .catch((error) => {
            deleteEventPromise.succeeded = false;
        })
    ;

    return new Promise<DeleteEventPromise>(resolve => resolve(deleteEventPromise as DeleteEventPromise));
}
