/// <reference path="../../../.tmp/typings/tsd.d.ts" />

declare module "angular-awesome-slider-shim" {
    var _: string;
    export = _;
}
declare module AngularAwesomeSlider {
    interface Options {
        from: number; //start value
        to: number; //end value
        step: number; //step value
        dimension?: string; //string, example " $"
        scale?: any[]; //array for scale, example: [0, '|', 50, '|' , 100] or [{val:10, label:'low'}, {val:25, label:'middle'}, {val:30, label:'high'}]
        round?: number; //how many numbers allowed after comma
        smooth: boolean; //true/false; false snaps the button to value
        vertical: boolean; //true/false; vertical slider, default false
        skin?: string; //empty or 'blue' 'plastic' 'round'
        css?: any; //hash object, do not mix with 'skin' !  {
        //    background: {"background-color": "silver"},
        //    before: {"background-color": "purple"},
        //    default: {"background-color": "white"},
        //    after: {"background-color": "green"},
        //    pointer: {"background-color": "red"}
        //}
        className?: string; //custom class added to root slider DOM
        realtime?: boolean; //triggers changes and model update on every moves... maybe a boolean? idk yet
        threshold?: number; //minimum distance allowed between 2 pointers, default both pointers overlap
        limits: boolean; //true/false; toggles bounds labels visibility: {1: 'top', 2: 'middle', 3: 'bottom'}; or function(value) { return 'my value is' + value; // momentjs external library call...}
        modelLabels?: string; //custom model for pointers labels based on pointer value
        watchOptions?: boolean; //default is 'true', watch this options changes by equals
        heterogeneity?: string[]; //array [percentage of point on slider]/[value in that point]: ['50/100', '75/250']
        callback?(value: any, elt?: any):void;
    }
}
