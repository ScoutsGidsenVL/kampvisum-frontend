import { Camp, CampDeserializer } from "./Camp"
import { CategorySetDeserializer } from "./CategorySet"

export interface Visum {
  readonly camp?: Camp
  readonly categorySet?: any
  readonly id: string
}

export const VisumDeserializer = (input: any): Visum => {
  const single: Visum = {
    camp: input.camp ? CampDeserializer(input.camp) : undefined,
    categorySet: input.category_set ? CategorySetDeserializer(input.category_set) : undefined,
    id: input.id ? input.id : undefined
  }
  return single
}
