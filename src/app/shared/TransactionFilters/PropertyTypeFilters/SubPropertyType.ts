/// <reference path="../../../tsd.d.ts" />

import * as lodash from "lodash";
import {Feature} from "./Feature";
import {LiteEvent, ILiteEvent} from "../../../common/LiteEvent";

class SubPropertyType {
    public static valueCannotBeNullError: string = "Value cannot be null";

    constructor(public subPropertyTypeId: number,
                public subPropertyType: string,
                public subPropertyTypeOrder: number,
                private _features: Feature[] = []) {
    }

    private _onValueChanged: LiteEvent<SubPropertyType> = new LiteEvent<SubPropertyType>();
    public get onValueChanged(): ILiteEvent<SubPropertyType> {
        return this._onValueChanged;
    }

    private _value: boolean = false;
    public get value(): boolean {
        return this._value;
    }

    public set value(value: boolean) {
        if (this._value !== value) {
            if (value === null) {
                throw SubPropertyType.valueCannotBeNullError;
            }

            this._value = value;
            this._onValueChanged.trigger(this);
        }
    }

    public get features(): Feature[] {
        return this._features;
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
}

export {SubPropertyType}
