/// <reference path="../../tsd.d.ts" />

import ISavedShape from "./ISavedShape";

"use strict";

class SavedCircle implements ISavedShape {
    public createDate: Date = new Date(Date.now());
    public type: string = "circle";
    public name: string;
    public radius: number;
    public center: number[];

    constructor(savedShape: ISavedShape);

    constructor(name: string,
                circle: google.maps.Circle);

    constructor(name: string,
                radius: number,
                center: number[]);

    constructor(nameOrSavedShape: string | ISavedShape,
                radiusOrCircle?: number|google.maps.Circle,
                center?: number[]) {
        if (typeof(nameOrSavedShape) === "string") {
            this.name = <string>nameOrSavedShape;

            if (radiusOrCircle instanceof google.maps.Circle) {
                this.radius = radiusOrCircle.getRadius();
                const latLng = radiusOrCircle.getCenter();
                this.center = [latLng.lng(), latLng.lat()];
            } else if (radiusOrCircle instanceof Number) {
                this.radius = radiusOrCircle;
                this.center = center;
            } else {
                throw "SavedCircle constructor error";
            }
        } else {
            const savedShape = <ISavedShape>nameOrSavedShape;

            if (this.type !== savedShape.type) {
                throw "SavedCircle constructor error";
            }

            this.name = savedShape.name;
            this.radius = savedShape.radius;
            this.center = savedShape.center;
        }
    }

    public getCircle(): google.maps.Circle{
        const circle = new google.maps.Circle();
        const latLng = new google.maps.LatLng(this.center[1], this.center[0]);
        circle.setCenter(latLng);
        circle.setRadius(this.radius);
        return circle;
    }
}

export default SavedCircle;
