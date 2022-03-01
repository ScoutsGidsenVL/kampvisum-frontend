import { Location } from '@/serializer/Location'

export interface BaseMember {
  id: string
  groupAdminId?: string
  lastName: string
  firstName: string
  phoneNumber: string
  birthDate: string
  street: string
  number: string
  letterBox: string
  comment: string
  city: Location
  postalCode: string
  groupGroupAdminId?: string
  email?: string
  fullAddress?: string
  fullName?: string
  hasPaid?: boolean
  isMember?: boolean
  isChecked?: boolean
  inactiveMember?: boolean
  wrapperId: string
}

export const BaseMemberDeserializer = (input: any, wId?:string, pStatus?: string): BaseMember => {
  const single: BaseMember = {
    hasPaid: pStatus === 'Y' ? true : false,
    wrapperId: wId ? wId : '',
    id: input.id ? input.id : input.group_admin_id,
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
    isMember: input.is_member ? input.is_member : false,
    isChecked: false,
    inactiveMember: input.inactive_member ? input.inactive_member : false
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
