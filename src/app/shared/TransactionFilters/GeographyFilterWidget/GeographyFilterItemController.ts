/// <reference path="../../../tsd.d.ts" />

import IGeographyFilterItemScope  = require("./IGeographyFilterItemScope");
import NodeUtils                  = require('cd-node-utils');

"use strict";

class GeographyFilterItemController {
  public static ControllerName = "GeographyFilterItemController";
  public static ControllerAs = "geogFilterItemCtrl";

  public static ValueChangedEvent = "GeographyFilterItem.ValueChanged";

  public static $inject = ["$scope"];

  public FilterItem: NodeUtils.PropertySearch.Filters.Geography.GeographyFilter;

  constructor(private $scope: IGeographyFilterItemScope) {
    this.FilterItem = $scope.FilterItem;
  }

  public SetFilterItemValue(value: boolean){
    this.FilterItem.Value= value;
    this.$scope.$emit(GeographyFilterItemController.ValueChangedEvent);
  }
}

export = GeographyFilterItemController;
