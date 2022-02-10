export interface GroupType {
  id: string
  groupType?: string
  parent?: any
}

export const GroupTypeDeserializer = (input: any): GroupType => {
  const single: GroupType = {
    id: input.id ? input.id : undefined,
    groupType: input.groupType ? input.groupType : undefined,
    parent: input.parent ? input.parent : undefined
  }

  return single
}

export const GroupTypeSerializer = (input: GroupType): any => {
  const single: any = {
  }

  return single
}
