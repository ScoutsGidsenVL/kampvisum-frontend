import { CheckParent, CheckParentDeserializer } from "./CheckParent"

//VALUE DESERIALIZERS (make it more dynamic MAYBE?)
import { Value, ValueDeserializer } from "./DurationDateCheck"
export interface Check {
  id?: string
  checkParent?: CheckParent
  value?: any
  endpoint: string
}

export const CheckDeserializer = (input: any): Check => {
  // console.log('CHECK: ', input)
  const single: Check = {
    id: input.id,
    checkParent: input.parent ? CheckParentDeserializer(input.parent) : undefined,
    endpoint: input.endpoint ? input.endpoint : undefined
  }

  if (single.checkParent?.checkType?.checkType === 'DurationCheck') {
    single.value = ValueDeserializer(input.value)
  } else {
    single.value = input.value
  }
  // console.log('SINGLE: ', single)

  return single
}

