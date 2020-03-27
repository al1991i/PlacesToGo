export interface Coordinates {
    lng: any;
    lat: any;
}

export interface PlaceLocation extends Coordinates {
    address: string;
    staticImageUrl: string;
}