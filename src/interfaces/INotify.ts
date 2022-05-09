export interface INotify {
    id: number;
    user: string;
    type: string;
    subject: string;
    message: string;
    createdAt: Date;
    seenAt: Date;
}