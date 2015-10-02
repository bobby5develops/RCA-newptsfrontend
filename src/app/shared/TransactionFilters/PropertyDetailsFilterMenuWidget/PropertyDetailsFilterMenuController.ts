/// <reference path="../../../tsd.d.ts" />

import IPropertyDetailsFilterMenuScope  = require("./IPropertyDetailsFilterMenuScope");
import NodeUtils                        = require('cd-node-utils');

"use strict";


class PropertyDetailsFilterMenuController {
    public static ControllerName = "PropertyDetailsFilterMenuController";
    public static ControllerAs = "propDetailsFilterMenuCtrl";

    public PropertyDetailsFilter: NodeUtils.PropertySearch.Filters.PropertyCharacteristics;
    public SliderOptions: AngularAwesomeSlider.Options;
    public SliderValueRange: string;

    public static ValueChangedEvent = "PropertyTypeFilterItem.ValueChanged";
    public static $inject = ["$log", "$scope"];

    constructor(private $log: ng.ILogService, private $scope: IPropertyDetailsFilterMenuScope) {
        this.PropertyDetailsFilter = $scope.PropertyDetailsFilter;

        this.SliderValueRange = "0;100";
        this.SliderOptions = {
            from: 0,
            to: 100,
            floor: true,
            step: 1,
            //dimension: " %",
            css: {
                background: {"background-color": "grey"},
                range: {"background-color": "#ea7517"},
                default: {"background-color": "white"},
                pointer: {"background-color": "blue"},
            },
            scale: [0, '|', 20, '|' , 40, '|' , 60, '|' , 80, '|' , 100],
            smooth: false,
            vertical: false,
            limits: false,
            realtime: false,
            threshold: 1,
            callback: (value)=>{
                this.SetQScoreRange(value);
            }

        };
        this.SetQScoreRange(this.SliderValueRange);
        $scope.$watch(()=>{
            return this.PropertyDetailsFilter;
        }, ()=> {
            this.$scope.$emit(PropertyDetailsFilterMenuController.ValueChangedEvent);
        }, true);
    }

    public SetFilterItemValue(value: boolean, fieldName: string) {
        this.PropertyDetailsFilter[fieldName] = value;
    }

    public SetQScoreRange(value: string): void{
        // the slider we're using returns the range as a string formatted like, "10;80". We split this here to pass a min and max to the filter object
        var range = value.split(";");
        this.PropertyDetailsFilter.QScoreMin = parseInt(range[0]);
        this.PropertyDetailsFilter.QScoreMax = parseInt(range[1]);
    }
}

export = PropertyDetailsFilterMenuController;
