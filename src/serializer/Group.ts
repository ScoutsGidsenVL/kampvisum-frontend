export interface Group {
  readonly id?: string
  readonly groupAdminId?: string
  readonly number?: string
  readonly name?: string
  readonly foundation?: string
  readonly onlyLeaders?: boolean
  readonly showMembersImproved?: boolean
  readonly email?: string
  readonly website?: string
  readonly info?: string
  readonly subGroups?: any
  readonly type?: any
  readonly publicRegistration?: any
  readonly deleted?: any
  readonly uuid: string
  readonly fullInfo?: string
}

export const GroupDeserializer = (input: any): Group => {
  const single: Group = {
    id: input.id ? input.id : undefined,
    groupAdminId: input.group_admin_id ? input.group_admin_id : undefined,
    number: input.number ? input.number : undefined,
    name: input.name ? input.name : undefined,
    foundation: input.foundation ? input.foundation : undefined,
    onlyLeaders: input.only_leaders ? input.only_leaders : undefined,
    showMembersImproved: input.show_members_improved ? input.show_members_improved : undefined,
    email: input.email ? input.email : undefined,
    website: input.website ? input.website : undefined,
    info: input.info ? input.info : undefined,
    subGroups: input.sub_groups ? input.sub_groups : undefined,
    type: input.type ? input.type : undefined,
    publicRegistration: input.public_registration ? input.public_registration : undefined,
    deleted: input.deleted ? input.deleted : undefined,
    uuid: input.uuid ? input.uuid : undefined,
    fullInfo: input.id && input.name ? `${input.name} - ${input.number}` : undefined,
  }

  return single
}

export const GroupSerializer = (input: any): any => {
  const single: any = {
    id: input.id ? input.id : undefined,
  }

  return single
}
