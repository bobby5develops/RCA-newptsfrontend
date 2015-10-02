/// <reference path="../../../tsd.d.ts" />

import * as lodash from "lodash";
import {IPropertyTypeFilterScope} from "./IPropertyTypeFilterScope";
import {PropertyTypeMatrix} from "./PropertyTypeMatrix";
import {PropertyTypeMatrixStub} from "./PropertyTypeMatrixStub";
import {PropertyType} from "./PropertyType";
import TransactionFiltersService from "../TransactionFiltersService";
import {IPropertyTypeFilterAggregation} from "./PropertyTypeFilterAggregation";

"use strict";

let propertyTypeMatrix: PropertyTypeMatrix = new PropertyTypeMatrix(PropertyTypeMatrixStub);

class PropertyTypeFilterController {
    public static controllerName: string = "PropertyTypeFilterController";
    public static controllerAs: string = "propTypeFilterCtrl";

    public static $inject: string[] = [
        "$log",
        "$scope",
        TransactionFiltersService.serviceName
    ];

    public get propertyTypes(): PropertyType[] {
        return propertyTypeMatrix.propertyTypes;
    }

    public get propertyTypeFilterAggregations(): {[key:string]: IPropertyTypeFilterAggregation} {
        return this.transactionFiltersService.propertyTypeFilterAggregations;
    }

    constructor(private $log: ng.ILogService, private $scope: IPropertyTypeFilterScope, private transactionFiltersService: TransactionFiltersService) {
        this.$log = $log.getInstance("Shared.TransactionFilters.PropertyTypeFilters.PropertyTypeFilterController");

        lodash.forEach(propertyTypeMatrix.propertyTypes, (propertyType: PropertyType)=> {
            propertyType.onValueChanged.on((propertyType: PropertyType)=> {
                this.setPropertyTypeFilters();
            })
        });

        this.$log.debug("Constructed", this);
    }

    private setPropertyTypeFilters(): void {
        let propertyTypeFilter = lodash(this.propertyTypes)
            .map((propertyType: PropertyType) => propertyType.getComputedFilter())
            .filter((filter: any) => filter != null)
            .value();

        this.transactionFiltersService.PropertyTypeFilter = propertyTypeFilter;
    }
}

export default PropertyTypeFilterController;
