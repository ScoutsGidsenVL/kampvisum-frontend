import { FlagParent } from "./FlagParent"

export interface Flag {
  createdBy?: string
  createdOn?: string
  flag?: boolean
  id?: string
  flagParent?: FlagParent

}

export const FlagDeserializer = (input: any): Flag => {
  console.log('RAW FlagDeserializer: ', input)
  const single: Flag = {
    createdBy: input.createdBy ? input.createdBy : undefined,
    createdOn: input.createdOn ? input.createdOn : undefined,
    flag: input.flag ? input.flag : undefined,
    id: input.id ? input.id : undefined,
    flagParent: input.parent ? input.parent : undefined
  }

  return single
}

export const FlagSerializer = (input: Flag): any => {
  const single: any = {
  }
  return single
}
