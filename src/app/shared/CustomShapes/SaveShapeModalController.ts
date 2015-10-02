/// <reference path="../../tsd.d.ts" />

import CustomShapeService from "./CustomShapeService";

"use strict";

class SaveShapeModalController {
    public static controllerName = "SaveShapeModalController";
    public static controllerAs = "saveShapeCtrl";

    public static $inject = ["$log", "$scope", "$modalInstance", CustomShapeService.serviceName, "shape"];

    public ShapeName: string;

    constructor(private $log: ng.ILogService,
                private $scope: ng.IScope,
                private $modalInstance: ng.ui.bootstrap.IModalServiceInstance,
                private CustomShapeService: CustomShapeService,
                public shape: google.maps.MVCObject) {
        this.$log = this.$log.getInstance("Shared.CustomShapes.SaveShapeModalController");
        this.$log.debug("constructed");
    }

    public save(){
        this.$log.debug("Save shape");
        this.CustomShapeService.saveShape(this.shape, this.ShapeName).then((result)=>{
            this.$modalInstance.close();
        });
    }

    public cancel(){
        this.$modalInstance.dismiss("cancel");
    }
}

export default SaveShapeModalController;
