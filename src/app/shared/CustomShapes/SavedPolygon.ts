/// <reference path="../../tsd.d.ts" />

import * as lodash from "lodash";
import ISavedShape from "./ISavedShape";

"use strict";

class SavedPolygon implements ISavedShape {
    public createDate: Date = new Date(Date.now());
    public type: string = "polygon";
    public name: string;
    public points: number[][];

    constructor(savedShape: ISavedShape);

    constructor(name: string, polygon: google.maps.Polygon);

    constructor(name: string, points: number[][]);

    constructor(nameOrSavedShape: string | ISavedShape,
                pointsOrPolygon?: number[][] | google.maps.Polygon) {
        if (typeof(nameOrSavedShape) === "string") {
            this.name = <string>nameOrSavedShape;
            if (pointsOrPolygon instanceof google.maps.Polygon) {
                this.points = lodash.map(pointsOrPolygon.getPath().getArray(), (point: google.maps.LatLng)=> {
                    return [point.lng(), point.lat()];
                });
            } else if (pointsOrPolygon instanceof Array) {
                this.points = pointsOrPolygon;
            } else {
                throw "SavedPolygon constructor error";
            }
        } else {
            const savedShape = <ISavedShape>nameOrSavedShape;

            if (this.type !== savedShape.type) {
                throw "SavedPolygon constructor error";
            }

            this.name = savedShape.name;
            this.points = savedShape.points;
        }
    }

    public getPolygon():google.maps.Polygon{
        const polygon = new google.maps.Polygon();
        const points = lodash.map(this.points, (point: number[])=>{
            return new google.maps.LatLng(point[1], point[0]);
        });
        polygon.setPath(points);
        return polygon;
    }
}

export default SavedPolygon;
