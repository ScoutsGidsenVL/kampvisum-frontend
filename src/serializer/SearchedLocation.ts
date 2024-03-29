export interface SearchedLocation {
  id?: string
  name?: string,
  isMainLocation?: boolean,
  address?: string,
  latLon?: any
  latitude?: string
  longitude?: string
  properties?: Properties
  country?: string
  postalcode?: string
  township?: string
  street?: string
  houseNumber?: string
}

export interface Properties {
  osm_id?: number;
  extent?: number[];
  country?: string;
  city?: string;
  countrycode?: string;
  postcode?: string;
  locality?: string;
  county?: string;
  type?: string;
  osm_type?: string;
  osm_key?: string;
  housenumber?: string;
  street?: string;
  osm_value?: string;
  state?: string;
}

export const LocationDeserializer = (input: any): SearchedLocation => {
  const single: SearchedLocation = {
    id: input.id ? input.id : undefined,
    name: input.name ? input.name : '',
    isMainLocation: input.is_main_location ? input.is_main_location : false,
    latLon: [input.latitude, input.longitude],
    latitude: input.latitude ? input.latitude : undefined,
    longitude: input.longitude ? input.longitude : undefined,
    address: input.address ? input.address : undefined,
    country: input.country ? input.country : '',
    postalcode: input.postalcode ? input.postalcode : '',
    township: input.township ? input.township : '',
    street: input.street ? input.street : '',
    houseNumber: input.house_number ? input.house_number : '',
  }

  return single
}

export const SearchedLocationDeserializer = (input: any): SearchedLocation => {
  const single: any = {
    name: input.name ? input.name : '',
    isMainLocation: input.isMainLocation ? input.isMainLocation : false,
    properties: input.properties,
    latLon: [input.geometry.coordinates[1], input.geometry.coordinates[0]],
    latitude: input.geometry.coordinates[1],
    longitude: input.geometry.coordinates[0],
    address:
    //TYPE
    // (input.properties.osm_value ? input.properties.osm_value + ', ' : '') +
    
    // STREET & NUMBER
    (input.properties.street ? input.properties.street + ' ' : '') + 
    (input.properties.housenumber ? input.properties.housenumber + ', ' : '') +
    
    // POSTCODE & CITY
    (input.properties.postcode ? input.properties.postcode + ' ' : '') + 
    (input.properties.city ? input.properties.city + ', ' : input.properties.name + ', ') + 
    
    //COUNTRY & COUNTY
      (input.properties.country ? input.properties.country + ' ' : '')
  }

  return single
}

export const SearchedLocationSerializer = (input: SearchedLocation): any => {
  const single: any = {
    id: input.id ? input.id : undefined,
    name: input.name,
    address: input.address,
    is_main_location: input.isMainLocation,
    latitude: input.latLon ? input.latLon[0] : undefined,
    longitude: input.latLon ? input.latLon[1] : undefined,
    country: input.country,
    postalcode: input.postalcode,
    township: input.township,
    street: input.street,
    house_number: input.houseNumber
  }
  return single
}

