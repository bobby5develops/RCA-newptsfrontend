/// <reference path="../../tsd.d.ts" />

import ISavedShape from "./ISavedShape";

"use strict";

class SavedRectangle implements ISavedShape {
    public createDate: Date = new Date(Date.now());
    public type: string = "rectangle";
    public name: string;
    public northeast: number[];
    public southwest: number[];

    constructor(savedShape: ISavedShape);

    constructor(name: string, rectangle: google.maps.Rectangle);

    constructor(name: string, northeast: number[], southwest: number[]);

    constructor(nameOrSavedShape: string | ISavedShape,
                northeastOrRectangle?: number[]|google.maps.Rectangle,
                southwest?: number[]) {

        if (typeof(nameOrSavedShape) === "string") {
            this.name = <string>nameOrSavedShape;

            if (northeastOrRectangle instanceof google.maps.Rectangle) {
                const rectangle = <google.maps.Rectangle>northeastOrRectangle;
                const latLngBounds = rectangle.getBounds();
                const northEastBounds = latLngBounds.getNorthEast();
                const southWestBounds = latLngBounds.getSouthWest();

                this.northeast = [northEastBounds.lng(), northEastBounds.lat()];
                this.southwest = [southWestBounds.lng(), southWestBounds.lat()];
            }
            else if (northeastOrRectangle instanceof Array) {
                this.northeast = northeastOrRectangle;
                this.southwest = southwest;
            }
            else {
                throw "SavedRectangle constructor error";
            }
        } else {
            const savedShape = <ISavedShape>nameOrSavedShape;

            if (this.type !== savedShape.type) {
                throw "SavedRectangle constructor error";
            }

            this.name = savedShape.name;
            this.northeast = savedShape.northeast;
            this.southwest = savedShape.southwest;
        }
    }

    public getRectangle(): google.maps.Rectangle {
        const rectangle = new google.maps.Rectangle();
        const northEast = new google.maps.LatLng(this.northeast[1], this.northeast[0]);
        const southWest = new google.maps.LatLng(this.southwest[1], this.southwest[0]);
        rectangle.setBounds(new google.maps.LatLngBounds(southWest, northEast));
        return rectangle;
    }
}

export default SavedRectangle;
