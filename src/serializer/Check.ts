import { CheckParent, CheckParentDeserializer } from "./CheckParent"

export interface Check {
  id?: string
  checkParent?: CheckParent
}

export const CheckDeserializer = (input: any): Check => {
  const single: Check = {
    id: input.id,
    checkParent: input.parent ? CheckParentDeserializer(input.parent) : undefined
  }

  return single
}

