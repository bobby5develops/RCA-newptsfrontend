import angular = require("angular");

export import Constants = require("./Constants");
export import Templates = require("./Templates");

// Controllers
export import LeadershipController = require("./Bios/LeadershipController");
export import LeadershipItemController = require("./Bios/LeadershipItemController");
export import SalesController = require("./Bios/SalesController");
export import SalesItemController = require("./Bios/SalesItemController");
export import CoverageController = require("./CoverageController");
export import DataPartnersController = require("./DataPartnersController");
export import GlossaryController = require("./Glossary/GlossaryController");
export import GlossaryItemController = require("./Glossary/GlossaryItemController");

export var moduleName = Constants.ModuleName;

angular.module(moduleName, [Templates])
    .controller(LeadershipController.controllerName, LeadershipController)
    .controller(LeadershipItemController.controllerName, LeadershipItemController)
    .controller(SalesController.controllerName, SalesController)
    .controller(SalesItemController.controllerName, SalesItemController)
    .controller(CoverageController.controllerName, CoverageController)
    .controller(DataPartnersController.controllerName, DataPartnersController)
    .controller(GlossaryController.controllerName, GlossaryController)
    .controller(GlossaryItemController.controllerName, GlossaryItemController);