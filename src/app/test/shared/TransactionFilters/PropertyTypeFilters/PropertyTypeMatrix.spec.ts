/// <reference path="../../../../tsd.d.ts" />

import lodash = require("lodash");

import {PropertyTypeMatrix} from "../../../../shared/TransactionFilters/PropertyTypeFilters/PropertyTypeMatrix";
import {PropertyTypeMatrixStub} from "../../../../shared/TransactionFilters/PropertyTypeFilters/PropertyTypeMatrixStub";
import {PropertyType} from "../../../../shared/TransactionFilters/PropertyTypeFilters/PropertyType";
import {SubPropertyType} from "../../../../shared/TransactionFilters/PropertyTypeFilters/SubPropertyType";
import {Feature} from "../../../../shared/TransactionFilters/PropertyTypeFilters/Feature";

"use strict";

describe("PropertyTypeMatrix:", () => {
    var propertyTypeMatrix: PropertyTypeMatrix = null;

    beforeEach(() => {
        propertyTypeMatrix = new PropertyTypeMatrix(PropertyTypeMatrixStub);
    });

    afterEach(() => {
    });

    it("PropertyType should not allow a null value", () => {
        var propertyType = new PropertyType(1, "Demo", 1);
        expect(() => {
            propertyType.value = null;
        }).toThrow(PropertyType.valueCannotBeNullError);
    });

    it("SubPropertyType should not allow a null value", () => {
        var subPropertyType = new SubPropertyType(1, "Demo", 1);
        expect(() => {
            subPropertyType.value = null;
        }).toThrow(SubPropertyType.valueCannotBeNullError);
    });

    it("should have 14 propertyTypes", () => {
        expect(propertyTypeMatrix.propertyTypes.length).toEqual(14);
    });

    it("should be able to get Apartment by id", () => {
        expect(propertyTypeMatrix.getPropertyTypeById(1).propertyType).toEqual("Apartment");
    });

    it("should be able to get Apartment by name", () => {
        expect(propertyTypeMatrix.getPropertyTypeByName("Apartment").propertyType).toEqual("Apartment");
    });

    it("should be able to get Hotel by name", () => {
        expect(propertyTypeMatrix.getPropertyTypeByName("Hotel").propertyType).toEqual("Hotel");
    });

    it("should be able to get Limited Service - Hotel by name", () => {
        let propertyType = propertyTypeMatrix.getPropertyTypeByName("Hotel");
        let subPropertyType = propertyType.getSubPropertyTypeByName("Limited Service");
        expect(subPropertyType.subPropertyType).toEqual("Limited Service");
    });

    it("Limited Service - Hotel should not have Feature Casino", () => {
        let propertyType = propertyTypeMatrix.getPropertyTypeByName("Hotel");
        let subPropertyType = propertyType.getSubPropertyTypeByName("Limited Service");
        expect(subPropertyType.getFeatureByName("Casino").feature).toEqual("Casino");
    });

    it("Limited Service - Hotel should not have Feature Boutique", () => {
        let propertyType = propertyTypeMatrix.getPropertyTypeByName("Hotel");
        let subPropertyType = propertyType.getSubPropertyTypeByName("Limited Service");
        expect(subPropertyType.getFeatureByName("Boutique")).toBeUndefined();
    });

    it("the sum of distinct Features from SubPropertyTypes should be the same as whats in the PropertyType", () => {
        let propertyType = propertyTypeMatrix.getPropertyTypeByName("Hotel");
        expect(propertyType.subPropertyTypes.length).toBeGreaterThan(0);
        expect(propertyType.features.length).toBeGreaterThan(0);

        let difference = lodash(propertyType.subPropertyTypes)
            .map((subPropertyType: SubPropertyType) => subPropertyType.features)
            .flatten()
            .uniq((feature: Feature) => feature.featureId)
            .xor(propertyType.features)
            .value();

        expect(difference.length).toEqual(0);
    });

    it("active and inactive features get correctly reported", () => {
        let hotel = propertyTypeMatrix.getPropertyTypeByName("Hotel");
        let limitedService = hotel.getSubPropertyTypeByName("Limited Service");
        let fullService = hotel.getSubPropertyTypeByName("Full-Service");

        expect(hotel.subPropertyTypes.length).toEqual(2);
        expect(hotel.features.length).toBeGreaterThan(0);
        expect(limitedService).toBeDefined();
        expect(fullService).toBeDefined();

        hotel.value = true;
        expect(hotel.activeFeatures.length).toEqual(hotel.features.length);
        expect(hotel.inactiveFeatures.length).toEqual(0);

        expect(hotel.value).toBeTruthy();
        expect(limitedService.value).toBeTruthy();
        expect(fullService.value).toBeTruthy();

        fullService.value = false;

        expect(hotel.value).toBeFalsy();
        expect(limitedService.value).toBeTruthy();
        expect(fullService.value).toBeFalsy();

        expect(hotel.activeFeatures.length).toEqual(limitedService.features.length);
        expect(hotel.activeFeatures).toEqual(limitedService.features);

        expect(hotel.inactiveFeatures.length).toBeGreaterThan(0);
        expect(hotel.inactiveFeatures).toEqual(lodash.xor(hotel.features, limitedService.features));

        limitedService.value = false;

        expect(hotel.value).toBeFalsy();
        expect(limitedService.value).toBeFalsy();
        expect(fullService.value).toBeFalsy();

        expect(hotel.inactiveFeatures.length).toEqual(hotel.features.length);
        expect(hotel.activeFeatures.length).toEqual(0);
    });

    it("inactivated features should have their values reset", () => {
        let hotel = propertyTypeMatrix.getPropertyTypeByName("Hotel");
        let limitedService = hotel.getSubPropertyTypeByName("Limited Service");
        let fullService = hotel.getSubPropertyTypeByName("Full-Service");

        expect(hotel.subPropertyTypes.length).toEqual(2);
        expect(hotel.features.length).toBeGreaterThan(0);
        expect(limitedService).toBeDefined();
        expect(fullService).toBeDefined();

        hotel.value = true;
        expect(hotel.activeFeatures.length).toEqual(hotel.features.length);
        expect(hotel.inactiveFeatures.length).toEqual(0);

        lodash.forEach(hotel.activeFeatures, (feature: Feature) => {
            feature.value = true;
        });

        expect(lodash.every(hotel.activeFeatures, (feature: Feature) => feature.value === true))
            .toBeTruthy();

        limitedService.value = false;

        expect(lodash.every(hotel.activeFeatures, (feature: Feature) => feature.value === true))
            .toBeTruthy();
        expect(lodash.every(hotel.inactiveFeatures, (feature: Feature) => feature.value === null))
            .toBeTruthy();
    });

    it("Seniors Housing & Care should have subPropertyTypes not Features", () => {
        let propertyType = propertyTypeMatrix.getPropertyTypeByName("Seniors Housing & Care");
        expect(propertyType.subPropertyTypes.length).toEqual(2);
        expect(propertyType.features.length).toEqual(0);
    });

    it("Other should not have subPropertyTypes not Features", () => {
        let propertyType = propertyTypeMatrix.getPropertyTypeByName("Other");
        expect(propertyType.subPropertyTypes.length).toEqual(0);
        expect(propertyType.features.length).toEqual(0);
    });

    it("there should only be one object per Feature", () => {
        let propertyType = propertyTypeMatrix.getPropertyTypeByName("Apartment");
        expect(propertyType).toBeDefined();
        let feature1 = propertyType.getFeatureByName("Subsidized");
        expect(feature1).toBeDefined();

        let subPropertyType = propertyType.getSubPropertyTypeByName("Garden");
        expect(subPropertyType).toBeDefined();
        let feature2 = subPropertyType.getFeatureByName("Subsidized");
        expect(feature2).toBeDefined();

        expect(feature1).toBe(feature2);
    });

    it("setting the value on a property type with sub property types should set the values on the sub property types", () => {
        let propertyType = propertyTypeMatrix.getPropertyTypeByName("Apartment");
        expect(propertyType.value).toEqual(false);
        expect(propertyType.subPropertyTypes.length).toBeGreaterThan(0);

        lodash.forEach(propertyType.subPropertyTypes, (subPropertyType: SubPropertyType) => {
            expect(subPropertyType.value).toEqual(false);
        });

        propertyType.value = true;

        expect(propertyType.value).toEqual(true);

        lodash.forEach(propertyType.subPropertyTypes, (subPropertyType: SubPropertyType) => {
            expect(subPropertyType.value).toEqual(true);
        });

        propertyType.value = false;

        expect(propertyType.value).toEqual(false);

        lodash.forEach(propertyType.subPropertyTypes, (subPropertyType: SubPropertyType) => {
            expect(subPropertyType.value).toEqual(false);
        });
    });

    it("setting the value on a sub property type should affect the value on the property types", () => {
        let propertyType = propertyTypeMatrix.getPropertyTypeByName("Apartment");
        expect(propertyType.value).toEqual(false);
        expect(propertyType.subPropertyTypes.length).toBeGreaterThan(0);

        lodash.forEach(propertyType.subPropertyTypes, (subPropertyType: SubPropertyType) => {
            expect(subPropertyType.value).toEqual(false);
        });

        propertyType.subPropertyTypes[0].value = true;

        expect(propertyType.value).toEqual(false);

        lodash.forEach(propertyType.subPropertyTypes, (subPropertyType: SubPropertyType) => {
            subPropertyType.value = true;
        });

        expect(propertyType.value).toEqual(true);
    });

    it("PropertyType with SubPropertyTypes should raise an event when a child SubPropertyType's value is changed", () => {
        var propertyTypeValueChangedCalls = 0;
        var propertySubTypeValueChangedCalls = 0;
        var featureValueChangedCalls = 0;

        var eventHandler = {
            propertyTypeValueChanged: (propertyType: PropertyType)=> {
                propertyTypeValueChangedCalls++;
            },
            propertySubTypeValueChanged: (propertySubType: SubPropertyType)=> {
                propertySubTypeValueChangedCalls++;
            },
            featureValueChanged: (feature: Feature)=> {
                featureValueChangedCalls++;
            },
        };

        spyOn(eventHandler, "propertyTypeValueChanged").and.callThrough();
        spyOn(eventHandler, "propertySubTypeValueChanged").and.callThrough();
        spyOn(eventHandler, "featureValueChanged").and.callThrough();

        let propertyType = propertyTypeMatrix.getPropertyTypeByName("Apartment");
        expect(propertyType).toBeDefined();
        expect(propertyType.subPropertyTypes.length).toBeGreaterThan(0);

        propertyType.onValueChanged.on(eventHandler.propertyTypeValueChanged);

        propertyType.subPropertyTypes[0].value = true;

        expect(eventHandler.propertyTypeValueChanged).toHaveBeenCalledWith(propertyType);
        expect(propertyTypeValueChangedCalls).toEqual(1);
    });

    it("PropertyType with no subPropertyTypes should raise an event when a child SubPropertyType's value is changed", () => {
        var propertyTypeValueChangedCalls = 0;
        var propertySubTypeValueChangedCalls = 0;
        var featureValueChangedCalls = 0;

        var eventHandler = {
            propertyTypeValueChanged: (propertyType: PropertyType)=> {
                propertyTypeValueChangedCalls++;
            },
            propertySubTypeValueChanged: (propertySubType: SubPropertyType)=> {
                propertySubTypeValueChangedCalls++;
            },
            featureValueChanged: (feature: Feature)=> {
                featureValueChangedCalls++;
            },
        };

        spyOn(eventHandler, "propertyTypeValueChanged").and.callThrough();
        spyOn(eventHandler, "propertySubTypeValueChanged").and.callThrough();
        spyOn(eventHandler, "featureValueChanged").and.callThrough();

        let propertyType = propertyTypeMatrix.getPropertyTypeByName("Dev Sites");
        expect(propertyType).toBeDefined();
        expect(propertyType.subPropertyTypes.length).toEqual(0);

        propertyType.onValueChanged.on(eventHandler.propertyTypeValueChanged);

        propertyType.value = true;

        expect(eventHandler.propertyTypeValueChanged).toHaveBeenCalledWith(propertyType);
        expect(propertyTypeValueChangedCalls).toEqual(1);
    });

    it("PropertyType with SubPropertyTypes should raise an event when a child Feature's value is changed", () => {
        var propertyTypeValueChangedCalls = 0;
        var propertySubTypeValueChangedCalls = 0;
        var featureValueChangedCalls = 0;

        var eventHandler = {
            propertyTypeValueChanged: (propertyType: PropertyType)=> {
                propertyTypeValueChangedCalls++;
            },
            propertySubTypeValueChanged: (propertySubType: SubPropertyType)=> {
                propertySubTypeValueChangedCalls++;
            },
            featureValueChanged: (feature: Feature)=> {
                featureValueChangedCalls++;
            },
        };

        spyOn(eventHandler, "propertyTypeValueChanged").and.callThrough();
        spyOn(eventHandler, "propertySubTypeValueChanged").and.callThrough();
        spyOn(eventHandler, "featureValueChanged").and.callThrough();

        let propertyType = propertyTypeMatrix.getPropertyTypeByName("Apartment");
        expect(propertyType).toBeDefined();
        expect(propertyType.subPropertyTypes.length).toBeGreaterThan(0);
        expect(propertyType.features.length).toBeGreaterThan(0);

        let feature = propertyType.features[0];
        expect(feature).toBeDefined();

        propertyType.onValueChanged.on(eventHandler.propertyTypeValueChanged);
        feature.onValueChanged.on(eventHandler.featureValueChanged);

        feature.value = true;

        expect(eventHandler.propertyTypeValueChanged).toHaveBeenCalledWith(propertyType);
        expect(propertyTypeValueChangedCalls).toEqual(1);

        expect(eventHandler.featureValueChanged).toHaveBeenCalledWith(feature);
        expect(featureValueChangedCalls).toEqual(1);
    });
});
