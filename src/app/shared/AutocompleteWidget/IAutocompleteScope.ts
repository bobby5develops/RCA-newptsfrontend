/// <reference path="../../tsd.d.ts" />

import Suggestion = require("./Suggestion");

interface IAutocompleteScope extends ng.IScope {
    searchText: string;
    keydownDelay: number;
    clearSuggestionsOnExit: boolean;
    flipEnabled: boolean;
    //scrollContainer: string;
    suggestions: Suggestion[];
    onKeydown(options : {searchText : string; event : JQueryKeyEventObject});
    onSelect(options : {suggestion : Suggestion}): void;
    onEmpty();
}

export = IAutocompleteScope;
