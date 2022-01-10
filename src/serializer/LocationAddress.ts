export interface LocationAddress {
  name?: string
  address?: string
  isMainLocation?: boolean,
  latitude?: string
  longitude?: string
}

export const LocationAddressDeserializer = (input: any): LocationAddress => {
  const single: LocationAddress = {
  }

  return single
}

export const LocationAddressSerializer = (input: any): any => {
  const single: any = {
    name: input.name,
    address: input.address,
    isMainLocation: input.isMainLocation,
    latitude: input.latLon[0],
    longitude: input.latLon[1]

  }
  return single
}

