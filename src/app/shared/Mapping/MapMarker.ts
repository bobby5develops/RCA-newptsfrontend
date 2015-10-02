'use strict';

import MarkerIcon = require("./MarkerIcon");

//todo: this generic templated MapMarker does not currently use the data type passed in. It may be needed in the future, so leaving it for now -mc
class MapMarker<T> {
    public mapMarker: google.maps.Marker;

    constructor(private latitude: number = null,
                private longitude: number = null,
                private icon: MarkerIcon = null,
                public windowHTML: string = null,
                private options?: any){
        this.mapMarker = new google.maps.Marker({
            position: new google.maps.LatLng(latitude, longitude),
            icon: icon,
            map: null
        });
    }
}

export = MapMarker;