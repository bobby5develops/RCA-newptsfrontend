/// <reference path="../../tsd.d.ts" />

import AuthInterceptorService = require("./AuthInterceptorService");

class GoogleMapsConfiguration {
    public static $inject = ["$httpProvider"];

    constructor($httpProvider: ng.IHttpProvider) {
        $httpProvider.interceptors.push(AuthInterceptorService.serviceName);
    }
}

export = GoogleMapsConfiguration;
