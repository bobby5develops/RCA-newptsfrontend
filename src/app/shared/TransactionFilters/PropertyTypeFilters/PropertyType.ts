/// <reference path="../../../tsd.d.ts" />

import * as lodash from "lodash";
import * as NodeUtils from "cd-node-utils";
import {Feature} from "./Feature";
import {SubPropertyType} from "./SubPropertyType";
import {LiteEvent, ILiteEvent} from "../../../common/LiteEvent";

class PropertyType {
    constructor(public propertyTypeId: number,
                public propertyType: string,
                public propertyTypeOrder: number,
                private _subPropertyTypes: SubPropertyType[] = [],
                private _features: Feature[] = []) {

        lodash.forEach(_subPropertyTypes, (subPropertyType: SubPropertyType) => {
            subPropertyType.onValueChanged.on((subPropertyType: SubPropertyType) => {
                this.resetInactiveFeatures();
                this.fireOnValueChangedEvent();
            });
        });

        lodash.forEach(_features, (feature: Feature) => {
            feature.onValueChanged.on((feature: Feature) => {
                this.fireOnValueChangedEvent();
            });
        });
    }

    private _onValueChanged: LiteEvent<PropertyType> = new LiteEvent<PropertyType>();
    public get onValueChanged(): ILiteEvent<PropertyType> {
        return this._onValueChanged;
    }

    private suppressValueChangedEvent: boolean = false;

    private fireOnValueChangedEvent(): void {
        if (this.suppressValueChangedEvent) {
            return;
        }

        this._onValueChanged.trigger(this);
    }

    public static valueCannotBeNullError: string = "Value cannot be null";

    private _value: boolean = false;
    public get value(): boolean {
        if (this.subPropertyTypes.length > 0) {
            return lodash.every(this.subPropertyTypes, (subPropertyType: SubPropertyType) => subPropertyType.value);
        } else {
            return this._value;
        }
    }

    public set value(value: boolean) {
        if (value === null) {
            throw PropertyType.valueCannotBeNullError;
        }

        if (this.subPropertyTypes.length > 0) {
            this.suppressValueChangedEvent = true;

            lodash.forEach(this.subPropertyTypes, (subPropertyType: SubPropertyType) => {
                subPropertyType.value = value;
            });

            this.suppressValueChangedEvent = false;
        } else {
            this._value = value;
        }

        this._onValueChanged.trigger(this);
    }

    public get features(): Feature[] {
        return this._features;
    }

    public get subPropertyTypes(): SubPropertyType[] {
        return this._subPropertyTypes;
    }

    public get activeFeatures(): Feature[] {
        if (this.value) {
            return this.features;
        } else {
            return lodash(this.subPropertyTypes)
                .filter((subPropertyType: SubPropertyType) => subPropertyType.value)
                .map((subPropertyType: SubPropertyType) => subPropertyType.features)
                .flatten()
                .uniq((feature: Feature) => feature.featureId)
                .sortBy((feature: Feature) => feature.featureOrder)
                .value();
        }
    }

    public get inactiveFeatures(): Feature[] {
        const activeFeatures: Feature[] = this.activeFeatures;
        if (activeFeatures.length === this.features.length) {
            return [];
        }

        return lodash(activeFeatures)
            .xor(this.features)
            .sortBy((feature: Feature) => feature.featureOrder)
            .value();
    }

    private resetInactiveFeatures(): void {
        this.suppressValueChangedEvent = true;

        lodash.forEach(this.inactiveFeatures, (feature: Feature) => {
            feature.value = null;
        });

        this.suppressValueChangedEvent = false;
    }

    public getSubPropertyTypeById(id: number): SubPropertyType {
        return lodash(this.subPropertyTypes)
            .filter((subPropertyType: SubPropertyType) => subPropertyType.subPropertyTypeId === id)
            .first();
    }

    public getSubPropertyTypeByName(name: string): SubPropertyType {
        return lodash(this.subPropertyTypes)
            .filter((subPropertyType: SubPropertyType) => subPropertyType.subPropertyType === name)
            .first();
    }

    public getFeatureById(id: number): Feature {
        return lodash(this.features)
            .filter((subPropertyType: Feature) => subPropertyType.featureId === id)
            .first();
    }

    public getFeatureByName(name: string): Feature {
        return lodash(this.features)
            .filter((subPropertyType: Feature) => subPropertyType.feature === name)
            .first();
    }

    public getComputedFilter(): NodeUtils.PropertySearch.Filters.PropertyTypes.IPropertyTypeFilter {
        let shouldReturnValue = this._value
                || lodash.any(this.subPropertyTypes, (subPropertyType: SubPropertyType) => subPropertyType.value)
                || lodash.any(this.activeFeatures, (feature: Feature) => feature.value);

        if (shouldReturnValue) {
            var allSubPropertyTypes = false;
            var selectedSubPropertyTypeIds = lodash(this.subPropertyTypes)
                .filter((subPropertyType: SubPropertyType) => subPropertyType.value)
                .map((subPropertyType: SubPropertyType) => subPropertyType.subPropertyTypeId)
                .value();

            if (selectedSubPropertyTypeIds.length === this.subPropertyTypes.length) {
                allSubPropertyTypes = true;
            }

            var activeFeatures = lodash(this.activeFeatures)
                .filter((feature: Feature) => feature.value !== null)
                .partition((feature: Feature) => feature.value)
                .map((features: Feature[]) => lodash.map(features, (feature: Feature) => feature.featureId))
                .value();

            return {
                propertyTypeId: this.propertyTypeId,
                allPropertySubTypes: allSubPropertyTypes,
                propertySubTypeIds: selectedSubPropertyTypeIds,
                includedFeatureIds: activeFeatures[0],
                excludedFeatureIds: activeFeatures[1]
            }
        }

        return null;
    }
}

export {PropertyType}
