export interface IMemberInvite {
    createdAt: Date;
    event: {
        id: string;
        name: string;
        slug: string;
    }
    id: string;
    role: {
        id: string;
        name: string;
        permissions: string[];
    }
    status: string;
    user: {
        displayName: string;
        id: string;
        username: string;
    }
}