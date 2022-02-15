export interface FlagParent {
  id?: string
  index?: string
  label?: boolean
  name?: string
}

export const FlagParentDeserializer = (input: any): FlagParent => {
  const single: FlagParent = {
    id: input.id,
    index: input.index,
    label: input.label,
    name: input.name,
  }

  return single
}

export const FlagParentSerializer = (input: FlagParent): any => {
  const single: any = {
  }
  return single
}
