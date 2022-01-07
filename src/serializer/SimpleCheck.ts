import { CheckParent, CheckParentDeserializer } from "./CheckParent"

export interface SimpleCheck {
  id?: string
  value?: string
  endpoint: string
}

export const SimpleCheckDeserializer = (input: any): SimpleCheck => {
  const single: SimpleCheck = {
    id: input.id,
    value: input.value ? input.value : undefined,
    endpoint: input.endpoint ? input.endpoint : undefined
  }
  return single
}

export const SimpleCheckSerializer = (input: any): any => {
  const single: any = {
    id: input.id,
    value: input.value ? input.value : undefined
  }
  return single
}

