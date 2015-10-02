/// <reference path="../../tsd.d.ts" />

interface IHttpInterceptor {
    request ?(request: ng.IRequestConfig): ng.IRequestConfig;
    requestError ?(requestError): void;
    response  ?(response: ng.IHttpPromise<any>): ng.IHttpPromise<any>;
    responseError  ?(responseError: ng.IHttpPromiseCallbackArg<any>): void;
}

export = IHttpInterceptor;