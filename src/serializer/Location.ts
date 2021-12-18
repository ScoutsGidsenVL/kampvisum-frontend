import { ContactPerson, ContactPersonDeserializer } from "./ContactPerson"

export interface Location {
  id?: string
  title?: string
  type?: string
  contactPerson?: ContactPerson
  address?: string
  latLng?: Array<number>
}

export const LocationDeserializer = (input: any): Location => {
  const single: Location = {
    id: input.id ? input.id : undefined,
    title: input.title ? input.title : undefined,
    type: input.type ? input.type : undefined,
    contactPerson: input.contactPerson ? ContactPersonDeserializer(input.contactPerson) : undefined,
    address: input.address ? input.address : undefined,
    latLng: input.latLng ? input.latLng : undefined
  }

  return single
}

export const LocationSerializer = (input: any): any => {
  const single: any = {
    
  }
  return single
}

