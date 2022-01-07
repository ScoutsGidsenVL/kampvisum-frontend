import { CheckParent, CheckParentDeserializer } from "./CheckParent"

export interface Check {
  id?: string
  checkParent?: CheckParent
  value?: string
  endpoint: string
}

export const CheckDeserializer = (input: any): Check => {
  const single: Check = {
    id: input.id,
    checkParent: input.parent ? CheckParentDeserializer(input.parent) : undefined,
    value: input.value ? input.value : undefined,
    endpoint: input.endpoint ? input.endpoint : undefined
  }

  return single
}

