import { FlagParent } from "./FlagParent"

export interface Flag {
  createdBy?: string
  createdOn?: string
  flag?: boolean
  id?: string
  flagParent?: FlagParent

}

export const FlagDeserializer = (input: any): Flag => {
  const single: Flag = {
    createdBy: input.created_by ? input.created_by : undefined,
    createdOn: input.created_on ? input.created_on : undefined,
    flag: input.flag ? input.flag : false,
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
