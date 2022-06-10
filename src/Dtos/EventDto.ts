import { IEvent } from "../interfaces/IEvent";

export type EventDto = {
    name: string;
    slug: string;
    owner: string;
    startDate: Date;
    endDate: Date;
    location: string;
    icon: string;
    color: string;
    shiftsEnabled: boolean;
    description: string;
}

export const ToEventDto = (event: IEvent): EventDto => {
    return {
        name: event.name,
        slug: event.slug,
        owner: event.owner,
        startDate: event.startDate,
        endDate: event.endDate,
        location: event.location,
        icon:  "/api/event_icons/" + event.icon.id,
        color: event.color,
        shiftsEnabled: event.shiftsEnabled,
        description: event.description,
    }
}