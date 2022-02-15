import { CheckParent, CheckParentDeserializer } from "./CheckParent"
import { CommentCheckDeserializer } from "./CommentCheck"
import { DeadlineCategory, DeadlineCategoryDeserializer } from "./DeadlineCategory"

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
  ParticipantCheck = 'ParticipantCheck',
  NumberCheck = 'NumberCheck'
}
export interface Check {
  id?: string
  checkParent?: CheckParent
  value?: any
  endpoint: string,
  state?: string
  category?: DeadlineCategory
  zoom?: number
}

export const CheckDeserializer = (input: any): Check => {
  const single: Check = {
    id: input.id,
    checkParent: input.parent ? CheckParentDeserializer(input.parent) : undefined,
    endpoint: input.endpoint ? input.endpoint : undefined,
    state: input.state ? input.state : 'UNCHECKED',
    category: input.category ? DeadlineCategoryDeserializer(input.category) : undefined,
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
    let arr: Array<any> = []
    input.value.locations.forEach((x:any) => {
      arr.push(PostLocationDeserializer(x))
    })
    single.value = { 
      zoom: input.value.zoom,
      locations: arr, 
      centerLatitude: input.value.center_latitude,
      centerLongitude: input.value.center_longitude
    }
  } else if (single.checkParent?.checkType?.checkType === CheckTypes.ParticipantCheck) 
  {
    single.value = ParticipantCheckDeserializer(input.value)
  } else {
    single.value = input.value
  }

  return single
}

