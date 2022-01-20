import { Location, LocationDeserializer, LocationSerializer } from '@/serializer/Location'

export interface BaseMember {
  readonly id?: string
  readonly lastName: string
  readonly firstName: string
  readonly phoneNumber: string
  readonly birthDate: string
  readonly street: string
  readonly number: string
  readonly letterBox: string
  readonly comment: string
  readonly city: Location
  readonly postalCode: string
  readonly group?: string
  readonly fullAddress?: string
  readonly fullName?: string
}

export const BaseMemberDeserializer = (input: any): BaseMember => {
  const single: BaseMember = {
    id: input.id ? input.id : undefined,
    lastName: input.last_name,
    firstName: input.first_name,
    phoneNumber: input.phone_number ? input.phone_number.replace(/ /g, '') : undefined,
    birthDate: input.birth_date,
    street: input.street,
    number: input.number,
    letterBox: input.letter_box,
    comment: input.comment,
    city: input.city,
    postalCode: input.postal_code,
    fullAddress: `${input.street} ${input.number} ${(input.letter_box ? ' Bus ' + input.letter_box : '')}, ${input.postal_code} ${input.city}`
  }

  return single
}

export const BaseMemberSerializer = (input: any): any => {
  const single: any = {
    id: input.id ? input.id : undefined,
    last_name: input.lastName,
    first_name: input.firstName,
    phone_number: input.phoneNumber ? input.phoneNumber.replace(/ /g, '') : undefined,
    birth_date: input.birthDate ? input.birthDate : undefined,
    street: input.street,
    number: input.number,
    letter_box: input.letterBox,
    comment: input.comment,
    postal_code: LocationSerializer(input.postCodeCity).postal_code,
    city: LocationSerializer(input.postCodeCity).city,
    group_group_admin_id: input.group ? input.group : null,
  }

  return single
}
