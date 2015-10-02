import angular = require("angular");

export import Constants = require("./Constants");
export import Templates = require("./Templates");

export import PlayersController = require("./PlayersController");

export import BrokersController = require("./Brokers/BrokersController");
export import BuyersController = require("./Buyers/BuyersController");
export import SellersController = require("./Sellers/SellersController");

import PlayersSearchModule = require("../../shared/PlayersSearch/PlayersSearchModule");
import {Constants as TransactionFiltersConstants} from "../../shared/TransactionFilters/TransactionFiltersModule";

export var moduleName = Constants.moduleName;

angular.module(moduleName, [Templates, PlayersSearchModule.moduleName, TransactionFiltersConstants.ModuleName])
    .controller(PlayersController.controllerName, PlayersController)
    .controller(BuyersController.controllerName, BuyersController)
    .controller(BrokersController.controllerName, BrokersController)
    .controller(SellersController.controllerName, SellersController);