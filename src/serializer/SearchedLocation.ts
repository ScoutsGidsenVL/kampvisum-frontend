export interface SearchedLocation {
  name?: string,
  isHeadLocation?: boolean,
  address?: string,
  latLon?: Array<number>
}

export const SearchedLocationDeserializer = (input: any): SearchedLocation => {
  const single: SearchedLocation = {
    name: input.name ? input.name : '',
    isHeadLocation: input.isHeadLocation ? input.isHeadLocation : false,
    address:
    (input.properties.country ? input.properties.country + ', ' : '') + 
    (input.properties.county ? input.properties.county + ', ' : '') + 
    (input.properties.city ? input.properties.city + ' ' : input.properties.name + ' ') + 
    (input.properties.postcode ? input.properties.postcode + ', ' : '') + 
    (input.properties.street ? input.properties.street + ' ' : '') + 
    (input.properties.housenumber ? input.properties.housenumber : ''),
    latLon: [input.geometry.coordinates[1], input.geometry.coordinates[0]]
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

