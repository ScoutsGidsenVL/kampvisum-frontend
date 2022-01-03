export interface SearchedLocation {
  name?: string,
  isHeadLocation?: boolean,
  address?: string,
  latLon?: Array<number>
  properties?: Properties
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

export const SearchedLocationDeserializer = (input: any): SearchedLocation => {
  const single: SearchedLocation = {
    name: input.name ? input.name : '',
    isHeadLocation: input.isHeadLocation ? input.isHeadLocation : false,
    properties: input.properties,
    latLon: [input.geometry.coordinates[1], input.geometry.coordinates[0]],
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
    (input.properties.county ? '(' + input.properties.county + ') ' : '') +
    (input.properties.country ? input.properties.country + ' ' : '')
  }

  return single
}

export const SearchedLocationSerializer = (input: any): any => {
  const single: any = {
    name: input.name,
    start_date: input.startDate,
    end_date: input.startDate,
    sections: input.sections
  }
  return single
}

