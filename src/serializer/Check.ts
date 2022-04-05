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
  name?: string
  label?: string
}

export const CheckDeserializer = (input: any): Check => {
  const single: Check = {
    id: input.id,
    checkParent: input.parent ? CheckParentDeserializer(input.parent) : undefined,
    endpoint: input.endpoint ? input.endpoint : undefined,
    category: input.category ? DeadlineCategoryDeserializer(input.category) : undefined,
    
    name: input.name ? input.name : undefined,
    label: input.label ? input.label : undefined,
    state: input.state ? input.state : 'UNCHECKED',
  }

  if (single.checkParent?.checkType?.checkType === CheckTypes.NumberCheck) {
    if (input.value) {
      single.value = input.value.toString();
    }
  }

  if (single.checkParent?.checkType?.checkType === CheckTypes.DurationCheck) {
    single.value = ValueDeserializer(input.value)
  } else if (single.checkParent?.checkType?.checkType === CheckTypes.CommentCheck) 
  {
    single.value = CommentCheckDeserializer(input)
  } else if (single.checkParent?.checkType?.checkType === CheckTypes.LocationCheck) 
  {
    //REFACTOR TO DESERIALIZER
    let arr: Array<any> = []
    input.value.locations.forEach((x:any) => {
      arr.push(PostLocationDeserializer(x))
    })
    single.value = { 
      zoom: input.value.zoom,
      locations: arr, 
      centerLatitude: input.value.center_latitude,
      centerLongitude: input.value.center_longitude,
      centerLatLon: [input.value.center_latitude, input.value.center_longitude]
    }
  } else if (single.checkParent?.checkType?.checkType === CheckTypes.CampLocationCheck) 
  {
    //REFACTOR TO DESERIALIZER
    let arr: Array<any> = []
    input.value.locations.forEach((x:any) => {
      arr.push(PostLocationDeserializer(x))
    })
    single.value = { 
      zoom: input.value.zoom,
      locations: arr, 
      centerLatitude: input.value.center_latitude,
      centerLongitude: input.value.center_longitude,
      centerLatLon: [input.value.center_latitude, input.value.center_longitude]
    }
  } else if (single.checkParent?.checkType?.checkType === CheckTypes.ParticipantCheck) 
  {
    single.value = ParticipantCheckDeserializer(input.value)
  } else if (single.checkParent?.checkType?.checkType === CheckTypes.FileUploadCheck) {
    single.value = input.value
  } else {
    single.value = input.value
  }

  return single
}

