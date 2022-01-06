import { CheckType, CheckTypeDeserializer } from "./CheckType"

export interface CheckParent {
  checkType?: CheckType
  explanation?: string
  id?: string
  label?: string
  link?: string
  name?: string
}

export const CheckParentDeserializer = (input: any): CheckParent => {
  const single: CheckParent = {
    checkType: input.check_type ? CheckTypeDeserializer(input.check_type) : undefined,
    explanation: input.explanation ? input.explanation : undefined,
    id: input.id,
    label: input.label ? input.label : undefined,
    link: input.link ? input.link : undefined,
    name: input.name ? input.name : undefined
  }

  return single
}

