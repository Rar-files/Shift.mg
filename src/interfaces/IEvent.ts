export interface IEvent {
    id: number;
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
    shifts: string[];
}