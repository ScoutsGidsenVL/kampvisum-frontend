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
}

export const PostLocationDeserializer = (input: any): PostLocation => {
  const single: PostLocation = {
    name: input.name ? input.name : undefined,
    contactName: input.contact_name ? input.contact_name : undefined,
    contactPhone: input.contact_phone ? input.contact_phone : undefined,
    contactEmail: input.contact_email ? input.contact_email : undefined,
    locations: input.locations ? input.locations.map((l: any) => LocationDeserializer(l)) : undefined,
    zoom: input.zoom ? input.zoom : 7,
    centerLatitude: input.center_latitude ? input.center_latitude : 50.4956754,
    centerLongitude: input.center_longitude ? input.center_longitude : 3.3452037

  }
  return single
}

export const PostLocationSerializer = (input: any): any => {
  const single: any = {
    id: input.id ? input.id : undefined,
    name: input.name,
    contact_name: input.contactName ? input.contactName : undefined,
    contact_phone: input.contactPhone ? input.contactPhone : undefined,
    contact_email: input.contactEmail ? input.contactEmail : undefined,
    locations: input.locations.map((sL: SearchedLocation) => SearchedLocationSerializer(sL)),
    zoom: input.zoom,
    center_latitude: input.centerLatitude,
    center_longitude: input.centerLongitude
  }
  return single
}

