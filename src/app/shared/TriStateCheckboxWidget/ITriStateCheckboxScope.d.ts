/// <reference path="../../tsd.d.ts" />

interface ITriStateCheckboxScope extends ng.IScope {
  Value ?: boolean;
  SetValue : (value: {value: boolean})=>void;
}
