/// <reference path="../../tsd.d.ts" />

import { IPropertyDetailRequest } from "./IPropertyDetailRequest";

interface IPropertyDetailScope extends ng.IScope {
    propertyRequest: IPropertyDetailRequest;
}

export { IPropertyDetailScope }
