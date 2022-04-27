export interface Engagement {
  readonly id: string
  readonly leaders?: EngagementUser
  readonly groupLeaders?: EngagementUser
  readonly districtCommisioner?: EngagementUser
  readonly approved?: boolean
  readonly canSign?: boolean
  readonly leadersCanSign?: boolean
  readonly districtCommisionerCanSign?: boolean
}

export interface EngagementUser {
  firstName?: string,
  lastName?: string
}

export interface Approval {
  approved: boolean
}

export interface Signature {
  leaders: GroupAdmin
  groupLeaders: GroupAdmin
  districtCommisioner: GroupAdmin
}

interface GroupAdmin {
  groupAdminId?: string
}

export const EngagementDeserializer = (input: any): Engagement => {
  const single: Engagement = {
    id: input.id ? input.id : undefined,
    leaders: input.leaders ? EngagementUserDeserializer(input.leaders) : undefined,
    groupLeaders: input.group_leaders ? EngagementUserDeserializer(input.group_leaders) : undefined,
    districtCommisioner: input.district_commissioner ? EngagementUserDeserializer(input.district_commissioner) : undefined,
    approved: input.approved ? input.approved : false,
    canSign: input.can_sign ? input.can_sign : false,
    leadersCanSign: input.leaders_can_sign ? input.leaders_can_sign : false,
    districtCommisionerCanSign: input.district_commisioner_can_sign ? input.district_commisioner_can_sign : false
  }
  return single
}

export const GroupAdminSerializer = (input: GroupAdmin): any => {
  const single: any = {
    group_admin_id: input.groupAdminId
  }
  return single
}

export const SignatureSerializer = (input: Signature): any => {
  const single: any = {
    leaders: input.leaders ? GroupAdminSerializer(input.leaders) : {},
    group_leaders: input.groupLeaders ? GroupAdminSerializer(input.groupLeaders) : {},
    district_commisioner: input.districtCommisioner ? GroupAdminSerializer(input.districtCommisioner) : {}
  }
  return single
}

export const EngagementUserDeserializer = (input: any): EngagementUser => {
  const single: any = {
    firstName: input.first_name ? input.first_name : undefined,
    lastName: input.last_name ? input.last_name : undefined
  }
  return single
}