/// <reference path="../../../tsd.d.ts" />

import Suggestion = require("../../AutocompleteWidget/Suggestion");

interface IGeoAutocompleteScope extends ng.IScope {
    selectedSuggestion: Suggestion;
}

export = IGeoAutocompleteScope;
