import getApiClient, {IViolation} from "../ApiClient";

import { IEvent as Event } from "../../../interfaces/IEvent";
import {store} from "../..";
import IPaginableResponse from "../IPaginableResponse";


//Get
interface GetEventsPromise {
    succeeded: boolean;
    data: IPaginableResponse<Event>;
}

export async function getUserEvents(userId: string): Promise<GetEventsPromise> {
    let getEventsPromise = {succeeded: false} as GetEventsPromise;

    await getApiClient().request(
        'GET',
        `/user/${userId}/events`,
        {},
        undefined,
        {
            Accept: 'application/json'
        }
    )
        .then((response) => {
            getEventsPromise.succeeded = true;
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

export async function getEvent(id: string): Promise<GetEventPromise> {
    let getEventPromise = {succeeded: false} as GetEventPromise;

    await getApiClient().request(
        'GET',
        `/event/${id}`,
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


//Create
interface CreateEventPromise {
    succeeded: boolean;
    violations: IViolation[];
}

export async function CreateEvent(event: Event): Promise<CreateEventPromise> {
    let eventCreatePromise = {} as CreateEventPromise;

    await getApiClient().request(
        'POST',
        `/event/`,
        event,
        undefined,
        {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    )
        .then((response) => {
            eventCreatePromise.succeeded = true;
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


//Update
export interface UpdateEventProps {
    event: Event;
    newData: object;
}

interface UpdateEventPromise {
    succeeded: boolean;
    violations: IViolation[];
}

function parseEventToRequest(event: Event): object
{
    // TODO
    return event;
}

export async function updateEvent(props: UpdateEventProps): Promise<UpdateEventPromise> {
    let eventUpdatePromise = {} as UpdateEventPromise;

    await getApiClient().request(
        'PUT',
        `/event/${props.event.id}`,
        parseEventToRequest({
            ...props.event,
            ...props.newData
        }),
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

export async function deleteEvent(id: string): Promise<DeleteEventPromise> {
    let deleteEventPromise = {succeeded: false} as DeleteEventPromise;

    await getApiClient().request(
        'DELETE',
        `/delete/${id}`,
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
