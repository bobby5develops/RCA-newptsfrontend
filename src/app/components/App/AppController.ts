/// <reference path="../../tsd.d.ts" />

import EnvironmentConfiguration = require("../../shared/Environment/EnvironmentConfiguration");
/**
 *
 */
export default class AppController {

    public static controllerName = "AppController";
    public static controllerAs = "appCtrl";

    public static $inject = [
        "$log",
        "$filter",
        "$http",
        "$state"
    ];

    public hideNavbar : boolean = false;

    constructor(private $log: ng.ILogService,
                private $filter: ng.IFilterService,
                private $http: ng.IHttpService,
                private $state: any) {
        this.$log = this.$log.getInstance("Components.App.AppController");
        // Need to watch this if we start turning it off/on within same window, but right now it's for PropertyDetail
        this.hideNavbar = !!$state.$current.layout ? !!$state.$current.layout.hideNavbar : false;
    }
}
