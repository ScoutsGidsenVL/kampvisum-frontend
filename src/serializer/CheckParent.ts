import { CheckType, CheckTypeDeserializer } from "./CheckType"

export interface CheckParent {
  checkType: CheckType
  explanation?: string
  id?: string
  label?: string
  link?: string
  name?: string
  isMultiple?: Boolean
}

export const CheckParentDeserializer = (input: any): CheckParent => {
  const single: CheckParent = {
    checkType: CheckTypeDeserializer(input.check_type),
    explanation: input.explanation ? input.explanation : undefined,
    id: input.id,
    label: input.label ? input.label : undefined,
    link: input.link ? input.link : undefined,
    name: input.name ? input.name : undefined,
    isMultiple: input.is_multiple ? input.is_multiple : false
  }

  return single
}

