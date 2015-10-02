interface IPropertyTypeMatrixItem {
    propertyTypeId: number;
    propertyType: string;
    propertyTypeOrder: number;

    subPropertyTypeId?: number;
    subPropertyType?: string;
    subPropertyTypeOrder?: number;

    featureId?: number;
    feature?: string;
    featureOrder?: number;
}

export {IPropertyTypeMatrixItem}