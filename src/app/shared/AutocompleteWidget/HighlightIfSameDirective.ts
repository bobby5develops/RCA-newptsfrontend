/// <reference path="../../tsd.d.ts" />

export var DirectiveName = "highlightIfSame";

interface IScope extends ng.IScope {
        /* Isolate Scope */
        container:{
            highlightText: string
            watchText: string
        };
}

export var Directive = function ($compile: ng.ICompileService, $templateCache: ng.ITemplateCacheService): ng.IDirective {
    "use strict";

    return {
            restrict : "A",
            scope : {
                container: '=container'
            },
            link : (scope:IScope, element:ng.IAugmentedJQuery, attrs:ng.IAttributes):void => {

                // TODO : research better way to handle string highlighting without adding watcher
                scope.$watch("container", (): any => {
                    var source = element.text();
                    var compare = scope.container.highlightText;

                    function escapeRegexp(queryToEscape) {
                        return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
                    }

                    if (source && (compare|| angular.isNumber(compare))) {
                        source = source.toString();
                        compare = compare.toString();

                        var highlight = source.replace(new RegExp(escapeRegexp(compare), 'gi'), '<span class="highlight-match">$&</span>');

                        element.html(highlight);
                    }

                }, false);
            }
        }
};

Directive.$inject = ["$compile", "$templateCache"];
