export interface INotify {
    id: string;
    type: string;
    subject: string;
    message: string;
    context: 
    {
        invite_id: string;
    }
    createdAt: Date;
    seenAt: Date;
}