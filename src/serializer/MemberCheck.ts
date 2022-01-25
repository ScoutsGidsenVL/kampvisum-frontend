import { Member } from "./Member"

export interface MemberCheck {
  id?: string
  value?: string
  endpoint: string
}

export const MemberCheckDeserializer = (input: any): MemberCheck => {
  const single: MemberCheck = {
    id: input.id,
    value: input.value ? input.value : undefined,
    endpoint: input.endpoint ? input.endpoint : undefined
  }
  return single
}

export const MemberCheckSerializer = (input: Member): any => {
  const single: any = {
    value: input.groupAdminId ? input.groupAdminId : input.id
  }
  return single
}

