import {IUser} from "./IUser";
import {IRole} from "./IRole";

export interface IMember {
    id: string;
    event: string;
    user: IUser;
    role: IRole;
    joinedAt: Date;
}
