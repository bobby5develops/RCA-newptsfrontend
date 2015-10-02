/// <reference path="../../../tsd.d.ts" />

import IDateRangeScope = require("./IDateRangeScope");
import NodeUtils = require('cd-node-utils');

"use strict";

enum DateType {
    AllTime,
    YearToDate,
    LastYear,
    Past6Months,
    Past12Months,
    Past24Months,
    Last5Years,
    LastQuarter,
    Custom
}

class DateRangeController {
    public static ControllerName = "DateRangeController";
    public static ControllerAs = "dateRangeCtrl";

    public static ValueChangedEvent = "DateRange.ValueChanged";

    public static $inject = ["$log", "$scope"];

    public DateRange: NodeUtils.PropertySearch.Filters.DateRange.IDateRange;
    private CalendarStatus: {StartOpened: boolean; EndOpened: boolean} = {
        StartOpened: false,
        EndOpened: false
    };

    public StartMinDate = new Date(2001, 1, 1);
    public StartMaxDate = new Date();
    public EndMinDate = new Date(2001, 1, 1);
    public EndMaxDate = new Date();


    public DateType: string = "YearToDate";
    public LastYear: number = (moment().year() - 1);
    public LastQuarter: number =  moment().subtract(1, "Q").quarter();
    // todo: I can't figure out why some of the options passed in won't work. they work as attributes tho. MC
    public DateOptions: {} ={
        startingDay: 0,
        //minDate: new Date(2001, 1, 1),
        //maxDate: new Date(),
        //"close-text": "Close",
        showWeeks: false,
        //yearRange: new Date().getFullYear() - 2001,
        //datepickerAppendToBody: false
    };

    constructor(private $log: ng.ILogService, private $scope: IDateRangeScope) {
        this.$log = $log.getInstance("Shared.DateRange.DateRangeController");

        this.DateRange = $scope.DateRange;


        $scope.$watch(()=> {
            return this.DateType;
        }, ()=> {
            this.HandleDateSelectionChange();
            this.$scope.$emit(DateRangeController.ValueChangedEvent);
        });

        $scope.$watch(()=> {
            return this.DateRange;
        }, ()=> {
            if(this.DateRange.StartDate){
                this.EndMinDate = new Date(this.DateRange.StartDate);
            } else {
                this.EndMinDate = new Date(2001, 1, 1);
            }
            if(this.DateRange.EndDate){
                this.StartMaxDate = new Date(this.DateRange.EndDate);
            } else {
                this.StartMaxDate = new Date();
            }
        }, true);

        this.$log.debug("Constructed", this);
    }

    private HandleDateSelectionChange() {
        switch (this.DateType) {
            case DateType[DateType.AllTime]:
                this.DateRange.StartDate = null;
                this.DateRange.EndDate = null;
                break;
            case DateType[DateType.YearToDate]:
                this.DateRange.StartDate = moment().year() + "-01-01";
                this.DateRange.EndDate = null;
                break;
            case DateType[DateType.LastYear]:
                this.DateRange.StartDate = (moment().year() - 1) + "-01-01";
                this.DateRange.EndDate = (moment().year() - 1) + "-12-31";
                break;
            case DateType[DateType.Past6Months]:
                this.DateRange.StartDate = moment().subtract(6, "months").format("YYYY-MM-DD");
                this.DateRange.EndDate = null;
                break;
            case DateType[DateType.Past12Months]:
                this.DateRange.StartDate = moment().subtract(12, "months").format("YYYY-MM-DD");
                this.DateRange.EndDate = null;
                break;
            case DateType[DateType.Past24Months]:
                this.DateRange.StartDate = moment().subtract(24, "months").format("YYYY-MM-DD");
                this.DateRange.EndDate = null;
                break;
            case DateType[DateType.Last5Years]:
                this.DateRange.StartDate = moment().subtract(60, "months").format("YYYY-MM-DD");
                this.DateRange.EndDate = null;
                break;
            case DateType[DateType.LastQuarter]:
                var lastQuarterStartDate: string;
                var lastQuarterEndDate: string;
                var year = moment().year();
                switch (this.LastQuarter) {
                    case 4:
                        lastQuarterStartDate = this.LastYear + "-10-01";
                        lastQuarterEndDate = this.LastYear + "-12-31";
                        break;
                    case 1:
                        lastQuarterStartDate = year + "-01-01";
                        lastQuarterEndDate = year + "-03-31"; //todo: leap years? does elastic search know or care?
                        break;
                    case 2:
                        lastQuarterStartDate = year + "-04-01";
                        lastQuarterEndDate = year + "-07-31";
                        break;
                    case 3:
                        lastQuarterStartDate = year + "-07-01";
                        lastQuarterEndDate = year + "-10-31";
                        break;
                }

                this.DateRange.StartDate = lastQuarterStartDate;
                this.DateRange.EndDate = lastQuarterEndDate;
                break;
            case DateType[DateType.Custom]:
                this.DateRange.StartDate = null;
                this.DateRange.EndDate = null;
                break;
        }
    }

    public OpenDatePicker($event: ng.IAngularEvent, pickStart: boolean){
        $event.stopPropagation();
        if(pickStart) {
            this.CalendarStatus.StartOpened = true;
            this.CalendarStatus.EndOpened = false;
        } else {
            this.CalendarStatus.StartOpened = false;
            this.CalendarStatus.EndOpened = true;
        }
    }

    //public ClearDates(){
    //    this.DateRange = {
    //        StartDate: "",
    //        EndDate: ""
    //    };
    //}
}

export = DateRangeController;
