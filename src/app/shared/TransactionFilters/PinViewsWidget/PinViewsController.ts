/// <reference path="../../../tsd.d.ts" />

import IPinViewsScope = require("./IPinViewsScope");
"use strict";

enum PinViewType {
  Properties,
  YearToDate,
  Companies,
  CapitalGroupBuyer,
  CapitalGroupSeller
}

class PinViewsController {
  public static ControllerName = "PinViewsController";
  public static ControllerAs = "PinViewsCtrl";

  public static ValueChangedEvent = "PinViews.ValueChanged";

  private pinView: string;

  public static $inject = ["$log", "$scope"];

  constructor(private $log: ng.ILogService, private $scope: IPinViewsScope) {
    this.pinView = $scope.pinView;
    $scope.$watch(()=> {
      return this.pinView;
    }, ()=> {
      this.handlePinViewsSelectionChange();
      this.$scope.$emit(PinViewsController.ValueChangedEvent);
    });
  }

  private handlePinViewsSelectionChange() {
    // do nothing for now
    this.$log.debug(this.pinView);
  }
}

export = PinViewsController;
