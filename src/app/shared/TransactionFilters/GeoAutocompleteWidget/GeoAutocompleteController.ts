/// <reference path="../../../tsd.d.ts" />

import IGeoAutocompleteScope = require("./IGeoAutocompleteScope");
import Suggestion = require("../../AutocompleteWidget/Suggestion");
import lodash = require("lodash")
import EnvironmentConfiguration = require("../../Environment/EnvironmentConfiguration");

"use strict";

class GeoAutocompleteController {

    public static controllerName = "GeoAutocompleteController";
    public static controllerAs = "geoAutoCtrl";

    public suggestions: any[] = [];
    public searchText: string = "";

    public static $inject = [
        "$log",
        "$scope",
        "$http",
        EnvironmentConfiguration.ConstantName
    ];

    constructor(private $log: ng.ILogService,
                private $scope: IGeoAutocompleteScope,
                private $http: ng.IHttpService,
                private environment: EnvironmentConfiguration) {
        this.$log = this.$log.getInstance("Shared.GeoAutocompleteWidget.GeoAutocompleteController");

        this.$scope.$watch(()=>this.$scope.selectedSuggestion, (newValue: Suggestion, oldValue: Suggestion)=> {
            if (newValue == null) {
                this.clearText();
            }
        });

        this.$log.debug("Constructed", this);
    }

    public fetchSuggestions(searchText: string): void {
        this.$log.debug("Fetch Suggestions");

        if (searchText.length > 1) {
            //todo: add "size": x after field: suggest when we decide how many suggestions we want
            var query: any = {
                "geo-suggest": {
                    "text": searchText,
                    "completion": {
                        "field": "suggest",
                        "size": 15
                    }
                }
            };
            this.suggestions = [];
            this.$http.post(this.environment.ServerAPIv1Url + "elasticsearch/property_suggester/_suggest?pretty", query)
                .success((data: any)=> {
                if (lodash.has(data, "geo-suggest[0].options")) {
                    var results = <any[]>lodash.get(data, "geo-suggest[0].options");
                    this.suggestions = lodash.map(results, function (result) {
                        return {
                            score: result.score,
                            displayText: result.text,
                            value: result.payload
                        }
                    });

                }

            })
                .error((data: any, status: any) => {
                this.$log.debug("POST suggestion error: " + status);
            });
        }
    }

    public setSelected(suggestion: Suggestion): void {
        this.$log.debug("Select Suggestion");

        this.$scope.selectedSuggestion = suggestion;
    }

    public clearText(): void {
        this.$log.debug("Clear Suggestion");

        this.$scope.selectedSuggestion = null;
        this.searchText = ""
    }
}

export {GeoAutocompleteController};
