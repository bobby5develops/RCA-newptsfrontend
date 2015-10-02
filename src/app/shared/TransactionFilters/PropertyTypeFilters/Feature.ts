/// <reference path="../../../tsd.d.ts" />

import * as lodash from "lodash";
import {LiteEvent, ILiteEvent} from "../../../common/LiteEvent";

class Feature {
    constructor(public featureId: number,
                public feature: string,
                public featureOrder: number) {
    }

    private _value: boolean = null;
    public get value(): boolean {
        return this._value;
    }

    public set value(value: boolean) {
        if(!value != value) {
            this._value = value;
            this._onValueChanged.trigger(this);
        }
    }

    private _onValueChanged: LiteEvent<Feature> = new LiteEvent<Feature>();
    public get onValueChanged(): ILiteEvent<Feature>{
        return this._onValueChanged;
    }

    public setValue(value: boolean): void {
        this.value = value;
    }
}

export {Feature}
