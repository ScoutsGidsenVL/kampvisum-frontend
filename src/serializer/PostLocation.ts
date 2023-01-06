import { LocationDeserializer, SearchedLocation, SearchedLocationSerializer } from "./SearchedLocation"

export interface PostLocation {
  id?: string
  name?: string
  contactName?: string
  contactPhone?: string
  contactEmail?: string
  locations?: Array<SearchedLocation>
  zoom: number
  centerLatitude: number
  centerLongitude: number
  centerLatLon: Array<number>
  isChecked?: boolean
  country: string
  postalcode: string
  township: string
  street: string
  houseNumber: string
}

export const PostLocationDeserializer = (input: any): PostLocation => {
  const single: PostLocation = {
    id: input.id ? input.id : undefined,
    name: input.name ? input.name : undefined,
    contactName: input.contact_name ? input.contact_name : undefined,
    contactPhone: input.contact_phone ? input.contact_phone : undefined,
    contactEmail: input.contact_email ? input.contact_email : undefined,
    locations: input.locations ? input.locations.map((l: any) => LocationDeserializer(l)) : undefined,
    zoom: input.zoom ? input.zoom : 7,
    centerLatitude: input.center_latitude ? input.center_latitude : 50.4956754,
    centerLongitude: input.center_longitude ? input.center_longitude : 3.3452037,
    centerLatLon: [input.center_latitude ? input.center_latitude : 50.4956754, input.center_longitude ? input.center_longitude : 3.3452037],
    country: '',
    postalcode: '',
    township: '',
    street: '',
    houseNumber: ''
  }

  if (input.locations[0]) {
    single.country = input.locations[0].country
    single.postalcode = input.locations[0].postalcode
    single.township = input.locations[0].township
    single.street = input.locations[0].street
    single.houseNumber = input.locations[0].house_number
  }
  console.log('SINGLE: ', single)
  return single
}

export const PostLocationSerializer = (input: any): any => {
  const single: any = {
    id: input.id ? input.id : undefined,
    name: input.name,
    contact_name: input.contactName ? input.contactName : '',
    contact_phone: input.contactPhone ? input.contactPhone : '',
    contact_email: input.contactEmail ? input.contactEmail : '',
    locations: input.locations ? input.locations.map((sL: SearchedLocation) => SearchedLocationSerializer(sL)) : [],
    zoom: input.zoom,
    center_latitude: input.centerLatitude,
    center_longitude: input.centerLongitude
  }
  return single
}

