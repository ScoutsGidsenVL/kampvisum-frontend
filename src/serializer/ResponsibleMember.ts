import { Group, GroupDeserializer } from './Group'

export interface ResponsibleMember {
  readonly id: number
  readonly firstName: string
  readonly lastName: string
  readonly birthDate: string
  readonly email: string
  readonly membershipNumber: number
  readonly phoneNumber: string
  readonly scoutsGroups?: Group[],
  public permissions: Array<string> = [],
}

export const ResponsibleMemberDeserializer = (input: any): ResponsibleMember => {
  const single: ResponsibleMember = {
    id: input.id ? input.id : undefined,
    firstName: input.first_name ? input.first_name : undefined,
    lastName: input.last_name ? input.last_name : undefined,
    birthDate: input.birth_date ? input.birth_date : undefined,
    email: input.email ? input.email : undefined,
    membershipNumber: input.membership_number ? input.membership_number : undefined,
    phoneNumber: input.phone_number ? input.phone_number.replace(/ /g, '') : undefined,
    scoutsGroups: input.scouts_group ? input.scouts_groups.map((group: any) => GroupDeserializer(group)) : undefined,
    permissions: input.user_permissions ? input.user_permissions : []
  }
  return single
}

export const ResponsibleMemberSerializer = (input: any): any => {
  const single: any = {
    first_name: input.firstName,
    last_name: input.lastName,
    birth_date: input.birthDate,
    email: input.email,
    membership_number: input.membershipNumber,
    responsible_phone_number: input.phoneNumber ? input.phoneNumber.replace(/ /g, '') : '/',
  }

  return single
}
