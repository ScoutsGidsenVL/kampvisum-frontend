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
    address: input.display_name,
    latLon: [input.lat, input.lon]
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

