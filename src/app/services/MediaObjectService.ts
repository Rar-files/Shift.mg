import getApiClient, {IViolation} from "./ApiClient";

import {setMediaObjectData} from "../../features/mediaObjectSlice";
import {IMediaObject as MediaObject} from "../../interfaces/IMediaObject";
import {store} from "../";


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
            Accept: 'application/ld+json'
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
    violations: IViolation[];
}

export async function CreateMediaObject(mediaObject: MediaObject): Promise<CreateMediaObjectPromise> {
    let mediaObjectCreatePromise = {} as CreateMediaObjectPromise;

    await getApiClient().request(
        'POST',
        `/media_objects/`,
        mediaObject,
        undefined,
        {
            Accept: 'application/ld+json',
            'Content-Type': 'application/ld+json'
        }
    )
        .then((response) => {
            mediaObjectCreatePromise.succeeded = true;
            store.dispatch(setMediaObjectData(response.data));
        })
        .catch((error) => {
            mediaObjectCreatePromise.succeeded = false;
            mediaObjectCreatePromise.violations = getApiClient().parseViolations(error.response.data);
        })
    ;

    return new Promise<CreateMediaObjectPromise>(resolve => resolve(mediaObjectCreatePromise as CreateMediaObjectPromise));
}