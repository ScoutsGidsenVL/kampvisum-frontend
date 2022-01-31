import { CheckParent, CheckParentDeserializer } from "./CheckParent"
import { CommentCheckDeserializer } from "./CommentCheck"

//VALUE DESERIALIZERS (make it more dynamic MAYBE?)
import { ValueDeserializer } from "./DurationDateCheck"
import { ParticipantCheckDeserializer } from "./ParticipitantCheck"
import { PostLocationDeserializer } from "./PostLocation"

export enum CheckTypes {
  SimpleCheck = 'SimpleCheck',
  DurationCheck = 'DurationCheck',
  CommentCheck = 'CommentCheck',
  CampLocationCheck = 'CampLocationCheck',
  LocationCheck = 'LocationCheck',
  FileUploadCheck = 'FileUploadCheck',
  MemberCheck = 'MemberCheck',
  ParticipantCheck = 'ParticipantCheck'
}
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

  if (single.checkParent?.checkType?.checkType === CheckTypes.DurationCheck) {
    single.value = ValueDeserializer(input.value)
  } else if (single.checkParent?.checkType?.checkType === CheckTypes.CommentCheck) 
  {
    single.value = CommentCheckDeserializer(input)
  } else if (single.checkParent?.checkType?.checkType === CheckTypes.LocationCheck) 
  {
    single.value = PostLocationDeserializer(input.value)
  } else if (single.checkParent?.checkType?.checkType === CheckTypes.CampLocationCheck) 
  {
    single.value = PostLocationDeserializer(input.value)
  } else if (single.checkParent?.checkType?.checkType === CheckTypes.ParticipantCheck) 
  {
    single.value = ParticipantCheckDeserializer(input.value)
  } else {
    single.value = input.value
  }

  return single
}

