/**
 * Created by mgilligan on 7/30/2015.
 */
/// <reference path="../../tsd.d.ts" />

class MarkerIcon // :google.maps.Icon
{
    url: string;
    size: google.maps.Size;
    origin: google.maps.Point = new google.maps.Point(0, 0);
    anchor: google.maps.Point;

    constructor(_url: string, _x: number, _y?:number) {
        this.url = _url;
        this.size = new google.maps.Size(_x, (!!_y?_y:_x));
        this.anchor = new google.maps.Point((_x / 2), ((!!_y?_y:_x) / 2));
    }
}

export = MarkerIcon