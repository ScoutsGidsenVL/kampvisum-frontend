export interface ContactPerson {
  name?: string
  phoneNumber?: string
}

export const ContactPersonDeserializer = (input: any): ContactPerson => {
  const single: ContactPerson = {
    name: input.name,
    phoneNumber: input.phoneNumber
  }

  return single
}

export const ContactPersonSerializer = (input: any): any => {
  const single: any = {
    name: input.name,
    phoneNumber: input.phoneNumber
  }
  return single
}

