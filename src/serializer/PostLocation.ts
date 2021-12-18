import { ContactPerson, ContactPersonDeserializer, ContactPersonSerializer } from "./ContactPerson"
import { LocationAddress, LocationAddressSerializer } from '../serializer/LocationAddress'

export interface PostLocation {
  id?: string
  name?: string
  contactPerson?: ContactPerson
  locationAddresses?: Array<LocationAddress>
}

export const PostLocationDeserializer = (input: any): PostLocation => {
  const single: PostLocation = {
  }

  return single
}

export const PostLocationSerializer = (input: any): any => {
  const single: any = {
    id: input.id ? input.id : undefined,
    name: input.name,
    contactPerson: ContactPersonSerializer(input.contactPerson),
    locationAddresses: LocationAddressSerializer(input.locationAddresses)
  }
  return single
}

