interface IPropertyDetailResponse {
  propertyKey_id:number;
  property_id:number;
  deal_id:number;
  status_id:number;
  status_tx:string;
  status_dt:string;
  transType_id:number;
  transType_tx:string;
  transSubType_id:number;
  transSubType_tx:string;
  propertyType_id:number;
  propertyType_tx:string;
  propertySubType_id:number;
  propertySubType_tx:string;
  propertyName_tx:string;
  addressStd_tx:string;
  postalCode_id:number;
  postalCode_tx:string;
  city_id:number;
  city_tx:string;
  county_id:number;
  county_tx:string;
  stateProv_id:number;
  stateProv_tx:string;
  country_id:number;
  country_tx:string;
  country_cd:string;
  theatre_id:number;
  theatre_tx:string;
  continent_id:number;
  continent_tx:string;
  metro_id:number;
  metro_tx:string;
  rCASubTheatre_id:number;
  rCASubTheatre_tx:string;
  rCATheatre_id:number;
  rCATheatre_tx:string;
  rCAZone_id:number;
  rCAZone_tx:string;
  region_id:number;
  region_tx:string;
  zone_id:number;
  zone_tx:string;
  market_id:number;
  market_tx:string;
  subMarket_id:number;
  subMarket_tx:string;
  units_dbl:number;
  geoCodeQuality_id:number;
  numberOfProperties_nb:number;
  numberBuildings_nb:number;

  // new fields to add
  numberOfStories ?:number;
  rentableArea ?:number;
  occupancy ?:number;
  yearBuilt ?:number;
  yearRenovated;
  currentWalkScore ?:number;
  currentTransitscore ?:number;
  altName ?:string;
  altAddress ?:string;
  apn ?:number[];
  dealStatus ?:string; //closed may 15
  troubledStatus ?:string; //resolved may 15
  troubledComments ?:string; // 9/8/11 trustee john benson phone 404-853-8000
  devDescription ?:string; //  plans to complete a multi-million dollar renovation
  purpose ?:string; // bought for renovation
  distressedLoanAmt ?:number;
  priorUse ?:number;
  improvedType ?:string; //improved
  capRate: number;
  statusDate: string;
  statusPriceQualifier: string;
  //players
//  <td>{{::player.role}}: {{::player.name}}</td>
//<td>{{::player.address}}<br/>{{::player.city}}, {{::player.stateProv}} {{::player.postalCode}} ({{::player.country}}<br/>{{::player.website}}</td>
//<td>{{::player.type}}</td>
//<td>{{::player.acquisitions}}</td>
//<td>{{::player.dispositions}}</td>
  players: {
    role: string;
    name: string;
    address: string;
    city: string;
    stateProv: string;
    postalCode: number;
    country: string;
    webiste: string;
    type: string;
    acquisitions: number;
    dispositions: number;
  }[];

  landArea_dbl:number;
  interestConveyed_tx:number;
  parking_tx:string;
  currentOwner:{
    name: string;
    address_tx: string;
    city_tx: string;
    stateProv_tx: string;
    country_tx: string;
    yearsOwned_nb: number;
    investorGroup_tx: string;
    knownHoldings_nb: number;
    knownHoldingsValue_dbl: string;
  };
  tenants:{
    name: string;
    exp: string;
  }[];
  lastKnownPrice:number;
  currentValue:number;
  lat_dbl:number;
  lon_dbl:number;
  statusPriceUSD_amt:number;
  statusPriceEur_amt:number;
  statusPriceGBP_amt:number;
  statusPriceJPY_amt:number;
  statusPriceLocal_amt:number;
  statusPriceQualifier_tx:string;
  statusPricePerUnit_amt:number;

  statusPricerPerUnitLocal_amt:number;

  statusPriceAdjustedUSD_amt:number;
  statusPriceAdjustedEUR_amt:number;
  statusPriceAdjustedGBP_amt:number;
  statusPriceAdjustedJPY_amt:number;
  statusPriceAdjustedLocal_amt:number;
  portfolio_fg:boolean;
  Location_GeoPoint:number[];
  Location_GeoShape:{
    type: string;
    coordinates: number[];
  }
}

export { IPropertyDetailResponse }
