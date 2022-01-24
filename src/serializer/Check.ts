import { CheckParent, CheckParentDeserializer } from "./CheckParent"
import { CommentCheckDeserializer } from "./CommentCheck"

//VALUE DESERIALIZERS (make it more dynamic MAYBE?)
import { Value, ValueDeserializer } from "./DurationDateCheck"
import { PostLocationDeserializer } from "./PostLocation"
export interface Check {
  id?: string
  checkParent?: CheckParent
  value?: any
  endpoint: string
}

export const CheckDeserializer = (input: any): Check => {
  const single: Check = {
    id: input.id,
    checkParent: input.parent ? CheckParentDeserializer(input.parent) : undefined,
    endpoint: input.endpoint ? input.endpoint : undefined
  }

  if (single.checkParent?.checkType?.checkType === 'DurationCheck') {
    single.value = ValueDeserializer(input.value)
  } else if (single.checkParent?.checkType?.checkType === 'CommentCheck') 
  {
    single.value = CommentCheckDeserializer(input)
  } else if (single.checkParent?.checkType?.checkType === 'CampLocationCheck') 
  {
    single.value = PostLocationDeserializer(input.value)
  } else if (single.checkParent?.checkType?.checkType === 'LocationCheck') 
  {
    single.value = PostLocationDeserializer(input.value)
  }
  else {
    single.value = input.value
  }

  return single
}

