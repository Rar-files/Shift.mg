import { IIcon } from "../interfaces/IIcon";

export type IconDto = {
    name: string;
    iconObject: string;
}

export const ToIconDto = (icon: IIcon): IconDto => {
    return {
        name: icon.name,
        iconObject: "/api/media_objects/" + icon.iconObject.id,
    }
}