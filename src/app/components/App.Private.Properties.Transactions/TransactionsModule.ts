import angular = require("angular");

export import Constants = require("./Constants");
export import Templates = require("./Templates");

export import TransactionsController = require("./TransactionsController");
export import PinTransactionTableDirective = require("./PinTransactionsTableDirective");

import PropertyDetailModule = require("../../shared/propertyDetail/PropertyDetailModule");

import TransactionFiltersModule = require("../../shared/TransactionFilters/TransactionFiltersModule");

//TODO: This dependency shouldn't really be here -Stan
import TriStateCheckboxWidget = require("../../shared/TriStateCheckboxWidget/TriStateCheckboxWidget");

import TransactionSearchModule = require("../../shared/TransactionSearch/TransactionSearchModule");
import ExcelDownloadModule = require("../../shared/ExcelDownload/ExcelDownloadModule");
import {Constants as GeoShapeSearchConstants} from "../../shared/GeoShapeSearch/GeoShapeSearchModule";
import ParcelsModule = require("../../shared/Parcels/ParcelsModule");
import CustomShapeModule = require("../../shared/CustomShapes/CustomShapeModule");
import {Constants as TransactionFiltersConstants} from "../../shared/TransactionFilters/TransactionFiltersModule";
export var moduleName = Constants.moduleName;

angular.module(moduleName, [
    Templates,
    PropertyDetailModule.moduleName,
    TransactionFiltersModule.Constants.ModuleName,
    TriStateCheckboxWidget.moduleName,
    GeoShapeSearchConstants.ModuleName,
    TransactionSearchModule.moduleName,
    ParcelsModule.moduleName,
    ExcelDownloadModule.moduleName,
    CustomShapeModule.moduleName,
    TransactionFiltersConstants.ModuleName
]).controller(TransactionsController.controllerName, TransactionsController)
    .directive(PinTransactionTableDirective.DirectiveName, PinTransactionTableDirective.Directive);
