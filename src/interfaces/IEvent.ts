import { IIcon } from "./IIcon";

export type EventVisibility = 'public' | 'private';

export interface IEvent {
    id: string;
    name: string;
    slug: string;
    owner: string;
    startDate: Date;
    endDate: Date;
    location: string;
    icon: IIcon;
    color: string;
    shiftsEnabled: boolean;
    description: string;
    shifts: string[];
    visibility: EventVisibility;
}
