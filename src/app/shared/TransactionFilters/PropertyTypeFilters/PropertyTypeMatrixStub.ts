/// <reference path="../../../tsd.d.ts" />

import * as lodash from "lodash";

import {IPropertyTypeMatrixItem} from "./IPropertyTypeMatrixItem";

var dataDump = [
    "1,Apartment,1,NULL,NULL,NULL,NULL,NULL,NULL",
    "1,Apartment,1,2,Garden,1,NULL,NULL,NULL",
    "1,Apartment,1,2,Garden,1,46,age-restricted,1",
    "1,Apartment,1,2,Garden,1,49,student hsng,2",
    "1,Apartment,1,2,Garden,1,24,subsidized,3",
    "1,Apartment,1,1,Mid/Highrise,2,NULL,NULL,NULL",
    "1,Apartment,1,1,Mid/Highrise,2,46,age-restricted,1",
    "1,Apartment,1,1,Mid/Highrise,2,49,student hsng,2",
    "1,Apartment,1,1,Mid/Highrise,2,24,subsidized,3",
    "3,Hotel,2,NULL,NULL,NULL,NULL,NULL,NULL",
    "3,Hotel,2,3,Full-Service,1,NULL,NULL,NULL",
    "3,Hotel,2,3,Full-Service,1,6,boutique,1",
    "3,Hotel,2,3,Full-Service,1,8,casino,2",
    "3,Hotel,2,3,Full-Service,1,42,resort,3",
    "3,Hotel,2,3,Full-Service,1,50,suite,4",
    "3,Hotel,2,4,Limited Service,2,NULL,NULL,NULL",
    "3,Hotel,2,4,Limited Service,2,8,casino,2",
    "3,Hotel,2,4,Limited Service,2,13,extended stay,5",
    "3,Hotel,2,4,Limited Service,2,42,resort,3",
    "3,Hotel,2,4,Limited Service,2,50,suite,4",
    "4,Industrial,3,NULL,NULL,NULL,NULL,NULL,NULL",
    "4,Industrial,3,5,Flex,1,NULL,NULL,NULL",
    "4,Industrial,3,5,Flex,1,-1,Single Tenant,1",
    "4,Industrial,3,5,Flex,1,40,R&D,2",
    "4,Industrial,3,5,Flex,1,51,tech/telecom/data center,3",
    "4,Industrial,3,6,Warehouse,2,NULL,NULL,NULL",
    "4,Industrial,3,6,Warehouse,2,-1,Single Tenant,1",
    "4,Industrial,3,6,Warehouse,2,66,manufacturing,2",
    "4,Industrial,3,6,Warehouse,2,41,refrigerated,3",
    "4,Industrial,3,6,Warehouse,2,11,distribution,4",
    "6,Office,4,NULL,NULL,NULL,NULL,NULL,NULL",
    "6,Office,4,7,Office - CBD,1,NULL,NULL,NULL",
    "6,Office,4,7,Office - CBD,1,-1,Single Tenant,1",
    "6,Office,4,7,Office - CBD,1,26,medical,2",
    "6,Office,4,7,Office - CBD,1,40,R&D,3",
    "6,Office,4,7,Office - CBD,1,51,tech/telecom/data center,4",
    "6,Office,4,8,Office - Sub,2,NULL,NULL,NULL",
    "6,Office,4,8,Office - Sub,2,-1,Single Tenant,1",
    "6,Office,4,8,Office - Sub,2,26,medical,2",
    "6,Office,4,8,Office - Sub,2,40,R&D,3",
    "6,Office,4,8,Office - Sub,2,51,tech/telecom/data center,4",
    "6,Office,4,8,Office - Sub,2,37,park,5",
    "7,Retail,5,NULL,NULL,NULL,NULL,NULL,NULL",
    "7,Retail,5,9,Strip,1,NULL,NULL,NULL",
    "7,Retail,5,10,Mall & Other,2,NULL,NULL,NULL",
    "7,Retail,5,9,Strip,1,-1,Single Tenant,1",
    "7,Retail,5,10,Mall & Other,2,-1,Single Tenant,1",
    "11,Seniors Housing & Care,6,NULL,NULL,NULL,NULL,NULL,NULL",
    "11,Seniors Housing & Care,6,57,Nursing Care,1,NULL,NULL,NULL",
    "11,Seniors Housing & Care,6,56,Seniors Housing,2,NULL,NULL,NULL",
    "10,Other,7,NULL,NULL,NULL,NULL,NULL,NULL",
    "12,Mobile/Mfg Housing,8,NULL,NULL,NULL,NULL,NULL,NULL",
    "13,Parking Facility,9,NULL,NULL,NULL,NULL,NULL,NULL",
    "14,Self Storage,10,NULL,NULL,NULL,NULL,NULL,NULL",
    "15,Other Misc,11,NULL,NULL,NULL,NULL,NULL,NULL",
    "16,Co op,12,NULL,NULL,NULL,NULL,NULL,NULL",
    "8,Dev Sites,13,NULL,NULL,NULL,NULL,NULL,NULL",
    "17,Mixed Use,14,NULL,NULL,NULL,NULL,NULL,NULL"
];

//http://stackoverflow.com/questions/4878756/javascript-how-to-capitalize-first-letter-of-each-word-like-a-2-word-city
function toTitleCase(str) {
    if (str == null) return null;
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

var parseDataDump = () => {
    return lodash(dataDump)
        .map((lineItem: string) =>lineItem.split(","))
        .map((lineItemArray: string[]) =>lodash.map(lineItemArray, (lineItemValue)=>lineItemValue === "NULL" ? null : lineItemValue))
        .map(
        (lineItemArray: string[]) => {
            var x = 0;

            var parseIntOrNull = (value: any) => value == null ? null : parseInt(value);

            var propertyTypeId = parseInt(lineItemArray[x++]);
            var propertyType = lineItemArray[x++];
            var propertyTypeOrder = parseInt(lineItemArray[x++]);

            var subPropertyTypeId = parseIntOrNull(lineItemArray[x++]);
            var subPropertyType = lineItemArray[x++];
            var subPropertyTypeOrder = parseIntOrNull(lineItemArray[x++]);

            var featureId = parseIntOrNull(lineItemArray[x++]);
            var feature = toTitleCase(lineItemArray[x++]);
            var featureOrder = parseIntOrNull(lineItemArray[x++]);

            return {
                propertyTypeId: propertyTypeId,
                propertyType: propertyType,
                propertyTypeOrder: propertyTypeOrder,
                subPropertyTypeId: subPropertyTypeId,
                subPropertyType: subPropertyType,
                subPropertyTypeOrder: subPropertyTypeOrder,
                featureId: featureId,
                feature: feature,
                featureOrder: featureOrder
            };
        }).value();
};

var PropertyTypeMatrixStub: IPropertyTypeMatrixItem[] = parseDataDump();

export {PropertyTypeMatrixStub}
