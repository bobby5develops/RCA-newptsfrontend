/// <reference path="../../tsd.d.ts" />

import angular = require("angular");

export import Constants = require("./Constants");
import CustomShapeService from "./CustomShapeService";
import SaveShapeModalController from "./SaveShapeModalController";
import ISavedShape from "./ISavedShape";
import IShapeListItem from "./IShapeListItem";
import SavedCircle from "./SavedCircle";
import SavedPolygon from "./SavedPolygon";
import SavedRectangle from "./SavedRectangle";

export var moduleName = Constants.ModuleName;

angular.module(moduleName, [])
    .controller(SaveShapeModalController.controllerName, SaveShapeModalController)
    .service(CustomShapeService.serviceName, CustomShapeService);

export {
    CustomShapeService,
    SaveShapeModalController,
    ISavedShape,
    SavedCircle,
    SavedPolygon,
    SavedRectangle,
    IShapeListItem}
