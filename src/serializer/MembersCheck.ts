export interface MembersCheck {
  value: any
}

export const MembersDeserializer = (input: any): MembersCheck => {
  const single: MembersCheck = {
    value: input.value ? input.value : undefined
  }
  return single
}

export const MembersSerializer = (comment: Array<{ id?: string, groupAdminId?: string}>): any => {
  const single: any = {
    value: []
  }
  return single
}
