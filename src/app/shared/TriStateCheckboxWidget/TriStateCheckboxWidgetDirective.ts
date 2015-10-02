/// <reference path="../../tsd.d.ts" />
/// <reference path="./ITriStateCheckboxScope.d.ts" />

//http://davefancher.com/2014/10/24/recursive-angularjs-directives/

export var DirectiveName = "triStateCheckbox";

export var Directive = function (): ng.IDirective {
  "use strict";

  return {
    restrict: 'A',
    scope: {
      Value: '=triStateCheckbox',
      SetValue: '&triStateSetValue'
    },
    compile: (templateElement: ng.IAugmentedJQuery, templateAttributes: ng.IAttributes, transclude: ng.ITranscludeFunction): ng.IDirectivePrePost => {
      if (!templateAttributes["type"] || templateAttributes["type"].toLowerCase() !== 'checkbox') {
        return angular.noop;
      }

      var cssClassChecked = "tri-state-checked";
      var cssClassUnchecked = "tri-state-unchecked";
      var cssClassIndeterminate = "tri-state-indeterminate";

      var setElementValue = (elem: ng.IAugmentedJQuery, value: boolean): void => {
        var indeterminate: boolean;
        var checked: boolean;
        var cssClass: string;

        if (value == null) {
          indeterminate = false;
          checked = false;
          cssClass = cssClassUnchecked;
        }
        else if (value == true) {
          indeterminate = false;
          checked = true;
          cssClass = cssClassChecked;
        }
        else {
          indeterminate = true;
          checked = false;
          cssClass = cssClassIndeterminate;
        }

        elem.prop("indeterminate", indeterminate);
        elem.prop("checked", checked);

        [cssClassChecked, cssClassIndeterminate, cssClassUnchecked]
          .forEach(function (removeCssClass) {
            elem.parent().removeClass(removeCssClass);
          });

        elem.parent().addClass(cssClass);
      };

      return function (scope: ITriStateCheckboxScope, elem: ng.IAugmentedJQuery, attrs: ng.IAttributes) {
        setElementValue(elem, scope.Value);

        elem.on("click", (eventObject: JQueryEventObject)=> {
          eventObject.stopPropagation();

          var nextValue;
          switch (scope.Value) {
            case null:
              nextValue = true;
              break;

            case true:
              nextValue = false;
              break;

            case false:
              nextValue = null;
              break;
          }

          scope.SetValue({value: nextValue});
          scope.$apply();
        });

        scope.$watch("Value", function (newVal, oldVal) {
          if (oldVal !== newVal) {
            setElementValue(elem, <boolean>newVal);
          }
        }, true);
      }
    }
  };
};

Directive.$inject = [];
