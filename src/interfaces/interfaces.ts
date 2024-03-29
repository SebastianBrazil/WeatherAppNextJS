import { Dispatch, SetStateAction } from "react";

export type ICities = [
    city: {
        name: string,
        state: string,
        country: string,
        lat: string, 
        lon: string
    }
]

export type propLoc = {
    location: string;
    tType: boolean;
}

export type propNav = {
    location: string;
    currentType: boolean;
    changeType: Dispatch<SetStateAction<boolean>>;
}

export type propCoord = {
    lat: string,
    lon: string;
}