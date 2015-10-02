/// <reference path="../../tsd.d.ts" />

import EnvironmentConfiguration = require("../Environment/EnvironmentConfiguration");
import * as lodash from "lodash";
import {AuthenticationService} from "../../shared/authentication/AuthenticationModule";
import ISavedShape from "./ISavedShape";
import IShapeListItem from "./IShapeListItem";
import SavedCircle from "./SavedCircle";
import SavedPolygon from "./SavedPolygon";
import SavedRectangle from "./SavedRectangle";

"use strict";

class CustomShapeService {
    public static serviceName = "CustomShapeService";
    public static $inject = [
        "$rootScope",
        "$log",
        "$http",
        AuthenticationService.serviceName,
        EnvironmentConfiguration.ConstantName
    ];

    public static shapeSavedEvent = "CustomShapeService.ShapeSaved";

    constructor(private $rootScope: ng.IRootScopeService,
                private $log: ng.ILogService,
                private $http: ng.IHttpService,
                private authenticationService: AuthenticationService,
                private environment: EnvironmentConfiguration) {
        this.$log = this.$log.getInstance("Shared.CustomShapes.CustomShapeService");
        this.$log.debug("constructed");
    }

    private get geoShapesUrl(): string {
        return `${this.environment.ServerAPIv1Url}accountUser/${this.authenticationService.user.AccountUserId}/geoshapes`;
    }

    public saveShape(shape: google.maps.MVCObject, name: string): ng.IPromise<ISavedShape> {
        let savedShape: ISavedShape = null;
        if (shape instanceof google.maps.Circle) {
            savedShape = new SavedCircle(name, shape);
        } else if (shape instanceof google.maps.Rectangle) {
            savedShape = new SavedRectangle(name, shape);
        } else if (shape instanceof google.maps.Polygon) {
            savedShape = new SavedPolygon(name, shape);
        } else {
            throw "Unknown Shape Type";
        }

        this.$log.info("Saving Shape", savedShape.type, savedShape);

        return this.$http.post(this.geoShapesUrl, savedShape).then((response) => {
            this.$rootScope.$emit(CustomShapeService.shapeSavedEvent, savedShape);
            return savedShape;
        }, (response: any) => {
            this.$log.error("Shape not saved", response);
            return response;
        });
    }

    public getShape(shapeId: number): ng.IPromise<ISavedShape> {
        this.$log.debug("Fetching Shape", shapeId);

        return this.$http.get<any>(`${this.geoShapesUrl}/${shapeId}`)
            .then(
            (response: ng.IHttpPromiseCallbackArg<any>) => {
                let result = response.data;

                result.id = result._id;
                delete result._id;

                switch(result.type)
                {
                    case "circle":
                        return new SavedCircle(result);

                    case "rectangle":
                        return new SavedRectangle(result);

                    case "polygon":
                        return new SavedPolygon(result);

                    default:
                        throw "Unkown Shape";
                }
            }, (reason: any)=> {
                return reason;
            });
    }

    public getShapes(): ng.IPromise<IShapeListItem[]> {
        this.$log.debug("Fetching Shapes");

        return this.$http.get<IShapeListItem[]>(this.geoShapesUrl).then((response: any) => {
            var data = response.data;
            return lodash.map(data, (result: {name: string; _id: number})=> {
                return {
                    name: result.name,
                    id: result._id
                };
            });
        });
    }

    public deleteShape(shapeId: number): ng.IPromise<number> {
        this.$log.debug("Deleting Shape", shapeId);
        return this.$http.delete(`${this.geoShapesUrl}/${shapeId}`).then(
            () => {
                return shapeId;
            },
            (response: any) => {
                this.$log.error("Error Deleting Shape", shapeId);
                return response;
            });
    }
}

export default CustomShapeService;
