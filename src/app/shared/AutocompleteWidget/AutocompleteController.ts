/// <reference path="../../tsd.d.ts" />

import IAutocompleteScope = require("./IAutocompleteScope");
import Suggestion = require("./Suggestion");
import lodash = require("lodash");
import KeyCodes = require("./KeyCodes");
"use strict";

class AutocompleteController {

    public static ControllerName = "AutocompleteController";
    public static ControllerAs = "autocompCtrl";

    public static $inject = ["$log", "$scope", "$timeout"];

    private debounceKeydown: ng.IPromise<any>;
    public selectedIndex: number = -1;
    public completing: boolean = false;
    public hasFocus: boolean = false;
    public hasMouse: boolean = false;

    constructor(private $log: ng.ILogService, private $scope: IAutocompleteScope, private $timeout: ng.ITimeoutService) {
        this.$log = this.$log.getInstance("Shared.AutocompleteWidget.AutocompleteController");
        this.$log.debug('Constructed', this)
    }

    private selectSuggestion(suggestion: Suggestion): void {
        if (suggestion) {
            this.onBlur();
            this.onMouseLeave();
            this.selectedIndex = -1;
            this.$scope.searchText = suggestion.displayText;

            if (this.$scope.onSelect) {
                this.$scope.onSelect({suggestion: suggestion});
                this.exit();
            }
        }
        else {

        }
    }

    public setSelectedIndexRelative(move: number): void {
        var newIndex = this.selectedIndex + move;
        var suggestionsLength = lodash.size(this.$scope.suggestions);

        if (newIndex < suggestionsLength && newIndex >= 0) {
            this.$scope.searchText = this.$scope.suggestions[newIndex].displayText;
            this.selectedIndex = newIndex;
        }
    }

    public onMouseEnter = ()=> {
        this.hasMouse = true;
    };

    public onMouseLeave = ()=> {
        this.hasMouse = false;
    };

    public onFocus = ()=> {
        this.hasFocus = true;
    };

    public onBlur = ()=> {
        this.hasFocus = false;
        this.exit();
    };

    public get shouldDisplayEmptyButton(): boolean {
        return (this.completing || this.hasFocus || this.hasMouse)
            && this.$scope.searchText && this.$scope.searchText.length > 0;
    }

    public onKeydown = (event: JQueryKeyEventObject)=> {
        var keyCodes = KeyCodes;

        switch (event.keyCode) {
            case keyCodes.tab://key.tab:
            case keyCodes.enter://key.enter:
                // this is the protection from user tabbing through (or entering)
                // and not selecting 'searchlodashtx' that's not tied to a suggestion since
                // suggestions could be cleared on exit
                var suggestion = lodash.find(this.$scope.suggestions, {displayText: this.$scope.searchText});
                if (suggestion) {
                    this.selectSuggestion(suggestion);
                }
                this.exit();
                break;
            case keyCodes.escape://key.esc:
                this.exit();

                //prevent default action
                event.preventDefault();
                break;

            case keyCodes.upArrow: // up arrow
                this.setSelectedIndexRelative(-1);
                //prevent default action
                event.preventDefault();
                break;

            case keyCodes.downArrow: // down arrow
                this.setSelectedIndexRelative(1);
                //prevent default action
                event.preventDefault();
                break;

            // special keys do not do anything
            //case keyCodes.backspace:
            case keyCodes.shift:
            case keyCodes.ctrl:
            case keyCodes.alt:
            case keyCodes.pauseBreak:
            case keyCodes.capsLock:
            case keyCodes.pageUp:
            case keyCodes.pageDown:
            case keyCodes.end:
            case keyCodes.home:
            case keyCodes.leftArrow:
            case keyCodes.rightArrow:
            case keyCodes.insert:
            case keyCodes.delete:
            case keyCodes.f1:
            case keyCodes.f2:
            case keyCodes.f3:
            case keyCodes.f4:
            case keyCodes.f5:
            case keyCodes.f6:
            case keyCodes.f7:
            case keyCodes.f8:
            case keyCodes.f9:
            case keyCodes.f10:
            case keyCodes.f11:
            case keyCodes.f12:
            case keyCodes.numLock:
            case keyCodes.scrollLock:
                break;

            default:

                if (this.$scope.onKeydown) {
                    // clear debounce if exists
                    this.$timeout.cancel(this.debounceKeydown);
                    // update debounce to new timeout
                    this.debounceKeydown = this.$timeout(() => {

                        if (lodash.isEmpty(this.$scope.searchText)) {
                            this.completing = false;
                            this.$scope.onEmpty();
                        }
                        else {
                            // any non special kepress should activate autocomplete
                            this.completing = true;
                            this.$scope.onKeydown({searchText: this.$scope.searchText, event: event});
                            this.$log.debug('keydown debounced!', this.$scope.searchText)
                        }
                    }, this.$scope.keydownDelay);
                }

                this.selectedIndex = -1;
                break;
        }
    };

    private exit = ()=> {
        this.$timeout(() => {
            // if suggestions are not empty and search text
            // does not equal suggestion clear the input text
            if (this.completing) {
                let bestSuggestion = lodash.find(this.$scope.suggestions, {displayText: this.$scope.searchText});

                if (lodash.isEmpty(bestSuggestion)) {
                    this.$scope.searchText = '';
                    this.$scope.onEmpty();
                    this.$log.debug('Empty suggestions');
                } else {
                    this.$log.debug('Best suggestion');
                    this.selectSuggestion(bestSuggestion);
                }
            }

            if (this.$scope.clearSuggestionsOnExit) {
                this.$scope.suggestions.length = 0;
                this.$log.debug('Clear suggestions on exit');
            }

            this.completing = false;
        }, 5);
    }

}

export = AutocompleteController;
