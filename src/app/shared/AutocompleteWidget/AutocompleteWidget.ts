/// <reference path="../../tsd.d.ts" />

import angular = require("angular");

export import Constants = require("./Constants");
export import Templates = require("./Templates");

export import AutocompleteDirective = require("./AutocompleteDirective");
export import HighlightIfSameDirective = require("./HighlightIfSameDirective");
export import ClickAnywhereButHereDirective = require("./ClickAnywhereButHereDirective");
export import Suggestion = require("./Suggestion");
export import KeyCodes = require("./KeyCodes");
export import AutocompleteController = require("./AutocompleteController");

export var moduleName = Constants.ModuleName;

angular.module(moduleName, [Templates])
    .directive(AutocompleteDirective.DirectiveName, AutocompleteDirective.Directive)
    .directive(HighlightIfSameDirective.DirectiveName, HighlightIfSameDirective.Directive)
    .directive(ClickAnywhereButHereDirective.DirectiveName, ClickAnywhereButHereDirective.ClickAnywhereButHere.Factory());