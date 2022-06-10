import getApiClient, {IViolation} from "./ApiClient";

import {setMediaObjectData} from "../../features/mediaObjectSlice";
import {IMediaObject, IMediaObject as MediaObject} from "../../interfaces/IMediaObject";
import {store} from "../";
import { MediaObjectDto } from "../../Dtos/MediaObjectDto";


//Get{Id}
interface GetMediaObjectPromise {
    succeeded: boolean;
    data: MediaObject | null;
}

export async function getMediaObject(id: string): Promise<GetMediaObjectPromise> {
    let getMediaObjectPromise = {succeeded: false} as GetMediaObjectPromise;

    await getApiClient().request(
        'GET',
        `/media_objects/${id}`,
        {},
        undefined,
        {
            Accept: 'application/json'
        }
    )
        .then((response) => {
            getMediaObjectPromise.succeeded = true;
            getMediaObjectPromise.data = response.data;
        })
        .catch((error) => {
            getMediaObjectPromise.succeeded = false;
        })
    ;

    return new Promise<GetMediaObjectPromise>(resolve => resolve(getMediaObjectPromise as GetMediaObjectPromise));
}


//Create
interface CreateMediaObjectPromise {
    succeeded: boolean;
    data: MediaObject;
    violations: IViolation[];
}

export async function CreateMediaObject(mediaObjectDto: MediaObjectDto): Promise<CreateMediaObjectPromise> {
    let mediaObjectCreatePromise = {} as CreateMediaObjectPromise;

    await getApiClient().request(
        'POST',
        `/media_objects`,
        mediaObjectDto,
        undefined,
        {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    )
        .then((response) => {
            mediaObjectCreatePromise.succeeded = true;
            mediaObjectCreatePromise.data = response.data;
            store.dispatch(setMediaObjectData(response.data));
        })
        .catch((error) => {
            mediaObjectCreatePromise.succeeded = false;
            console.log(error);
            mediaObjectCreatePromise.violations = getApiClient().parseViolations(error.response.data);
        })
    ;

    return new Promise<CreateMediaObjectPromise>(resolve => resolve(mediaObjectCreatePromise as CreateMediaObjectPromise));
}
