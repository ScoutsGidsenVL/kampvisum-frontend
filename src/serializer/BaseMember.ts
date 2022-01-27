import { Location } from '@/serializer/Location'

export interface BaseMember {
  readonly id: string
  readonly groupAdminId?: string
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
  groupGroupAdminId?: string
  readonly email?: string
  readonly fullAddress?: string
  readonly fullName?: string
  readonly hasPaid?: string
  readonly isMember?: boolean
  isChecked?: boolean
}

export const BaseMemberDeserializer = (input: any): BaseMember => {
  const single: BaseMember = {
    id: input.id ? input.id : undefined,
    groupAdminId: input.group_admin_id ? input.group_admin_id : undefined,
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
    email: input.email ? input.email : undefined,
    fullName: `${input.first_name} ${input.last_name}`,
    fullAddress: `${input.street} ${input.number} ${(input.letter_box ? ' Bus ' + input.letter_box : '')}, ${input.postal_code} ${input.city}`,
    isMember: input.is_member ? input.is_member : false
  }
  return single
}

export const BaseMemberSerializer = (input: BaseMember): any => {
  const single: any = {
    id: input.id ? input.id : undefined,
    last_name: input.lastName,
    first_name: input.firstName,
    phone_number: input.phoneNumber ? input.phoneNumber.replace(/ /g, '') : undefined,
    cell_number: input.phoneNumber ? input.phoneNumber.replace(/ /g, '') : undefined,
    birth_date: input.birthDate ? input.birthDate : undefined,
    street: input.street,
    number: input.number,
    letter_box: input.letterBox,
    comment: input.comment,
    postal_code: Number(input.postalCode),
    city: input.city,
    group_group_admin_id: input.groupGroupAdminId ? input.groupGroupAdminId : null,
    email: input.email ? input.email : undefined
  }

  return single
}
