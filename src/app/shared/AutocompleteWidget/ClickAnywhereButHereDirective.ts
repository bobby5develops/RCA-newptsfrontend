/// <reference path="../../tsd.d.ts" />

import lodash = require("lodash");
export var DirectiveName = "clickAnywhereButHere";

'use strict';

export interface IClickAnywhereButHereScope {
    callback:string
    childCssSelector:string;
    watch:string;
}

export class ClickAnywhereButHere {
    public restrict: string;
    public scope: IClickAnywhereButHereScope;
    public link: (scope, element, attrs) => void;
    public bindEvents: (scope: IClickAnywhereButHereScope, element, attrs)=>void;

    constructor($document: ng.IDocumentService, $parse: ng.IParseService) {
        this.restrict = 'A';
        this.scope = {
            callback: '=clickAnywhereButHere',
            childCssSelector: '@clickAnywhereButHereChildCssSelector',
            watch: '@clickAnywhereButHereEnabled'
        };

        this.link = (scope, element: JQuery, attrs) => {
            var self = this;
            if (scope.watch) {
                scope.$watch(function () {
                    return scope.watch;
                }, function (value) {
                    if (value === 'true') {
                        self.bindEvents(scope, element, attrs);
                    }
                });
            }
            else {
                self.bindEvents(scope, element, attrs);
            }
        };
        this.bindEvents = (scope, element: JQuery, attrs) => {
            var handler = function (event) {

                var elements = element;

                // if child css selector is set then we wil only trigger the handler
                // when the event is not part of any DOM elements
                if (scope && !lodash.isEmpty(scope.childCssSelector)) {
                    elements = angular.element(element).find(scope.childCssSelector);
                }

                if (lodash.every(elements, function (element) {
                        return !element.contains(event.target)
                    })) {
                    //scope.$apply(scope.callback(event));
                    scope.$apply(scope.callback());
                }
            };

            $document.on('click', handler);
            scope.$on('$destroy', function () {
                $document.off('click', handler);
            });
        }
    }

    public static Factory() {
        var directive = ($document, $parse) => {
            return new ClickAnywhereButHere($document, $parse);
        };

        directive['$inject'] = ['$document', '$parse'];

        return directive;
    }
}
