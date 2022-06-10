export interface INotify {
    id: string;
    user: string;
    type: string;
    subject: string;
    message: string;
    createdAt: Date;
    seenAt: Date;
}