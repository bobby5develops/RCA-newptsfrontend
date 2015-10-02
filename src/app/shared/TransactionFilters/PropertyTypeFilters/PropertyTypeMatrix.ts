/// <reference path="../../../tsd.d.ts" />

import * as lodash from "lodash";
import {IPropertyTypeMatrixItem} from "./IPropertyTypeMatrixItem";
import {Feature} from "./Feature";
import {PropertyType} from "./PropertyType";
import {SubPropertyType} from "./SubPropertyType";

class PropertyTypeMatrix {
    public propertyTypes: PropertyType[] = [];

    constructor(propertyTypeMatrixItems: IPropertyTypeMatrixItem[] = []) {
        this.populateMatrix(propertyTypeMatrixItems);
    }

    public populateMatrix(propertyTypeMatrixItems: IPropertyTypeMatrixItem[]): void {
        this.propertyTypes = lodash(propertyTypeMatrixItems)
            .groupBy((item: IPropertyTypeMatrixItem) => item.propertyTypeId)
            .values()
            .map(
            (itemsByPropertyTypeId: IPropertyTypeMatrixItem[]) => {

                const propertyFeatures: Feature[] = lodash(itemsByPropertyTypeId)
                    .filter((item: IPropertyTypeMatrixItem) => item.featureId && item.feature)
                    .groupBy((item: IPropertyTypeMatrixItem) => item.featureId)
                    .values()
                    .map(
                    (itemsByFeatureId: IPropertyTypeMatrixItem[]) => {
                        const firstFeatureItem: IPropertyTypeMatrixItem = itemsByFeatureId[0];
                        return new Feature(firstFeatureItem.featureId, firstFeatureItem.feature, firstFeatureItem.featureOrder);
                    })
                    .sortBy((feature: Feature) => feature.featureOrder)
                    .value();

                const propertyFeaturesIndex: {[index: string]: Feature} =
                    lodash.indexBy(propertyFeatures, (feature: Feature) => feature.featureId);

                const subProperties: SubPropertyType[] = lodash(itemsByPropertyTypeId)
                    .filter((item: IPropertyTypeMatrixItem) => item.subPropertyTypeId && item.subPropertyType)
                    .groupBy((item: IPropertyTypeMatrixItem) => item.subPropertyTypeId)
                    .values()
                    .map(
                    (itemsBySubPropertyTypeId: IPropertyTypeMatrixItem[]) => {

                        const subPropertyFeatures: Feature[] = lodash(itemsBySubPropertyTypeId)
                            .filter((item: IPropertyTypeMatrixItem) => item.featureId && item.feature)
                            .groupBy((item: IPropertyTypeMatrixItem) => item.featureId)
                            .values()
                            .map(
                            (itemsBySubPropertyTypeIdAndFeatureId: IPropertyTypeMatrixItem[]) => {
                                const firstSubPropertyFeatureItem: IPropertyTypeMatrixItem = itemsBySubPropertyTypeIdAndFeatureId[0];
                                return propertyFeaturesIndex[firstSubPropertyFeatureItem.featureId];
                            })
                            .sortBy((feature: Feature) => feature.featureOrder)
                            .value();

                        const firstSubPropertyItem: IPropertyTypeMatrixItem = itemsBySubPropertyTypeId[0];
                        return new SubPropertyType(
                            firstSubPropertyItem.subPropertyTypeId,
                            firstSubPropertyItem.subPropertyType,
                            firstSubPropertyItem.subPropertyTypeOrder,
                            subPropertyFeatures);
                    })
                    .sortBy((subPropertyType: SubPropertyType) => subPropertyType.subPropertyTypeOrder)
                    .value();

                const firstPropertyItem: IPropertyTypeMatrixItem = itemsByPropertyTypeId[0];
                return new PropertyType(firstPropertyItem.propertyTypeId, firstPropertyItem.propertyType,
                                        firstPropertyItem.propertyTypeOrder, subProperties, propertyFeatures);
            })
            .sortBy((propertyType: PropertyType) => propertyType.propertyTypeOrder)
            .value();
    }

    public getPropertyTypeById(propertyTypeId: number): PropertyType {
        return lodash(this.propertyTypes)
            .filter((propertyType: PropertyType) => propertyType.propertyTypeId === propertyTypeId)
            .first();
    }

    public getPropertyTypeByName(propertyTypeName: string): PropertyType {
        return lodash(this.propertyTypes)
            .filter((propertyType: PropertyType) => propertyType.propertyType === propertyTypeName)
            .first();
    }
}

export {PropertyTypeMatrix}
