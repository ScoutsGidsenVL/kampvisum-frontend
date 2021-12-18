export interface LocationAddress {
  name?: string
  displayName?: string
  isMainLocation?: boolean
}

export const LocationAddressDeserializer = (input: any): LocationAddress => {
  const single: LocationAddress = {
  }

  return single
}

export const LocationAddressSerializer = (input: any): any => {
  const single: any = {
    name: input.name,
    displayName: input.displayName,
    isMainLocation: input.isMainLocation
  }
  return single
}

