import { Camp, CampDeserializer } from "./Camp"
import { CategorySet, CategorySetDeserializer } from "./CategorySet"

export interface Visum {
  readonly camp?: Camp
  readonly categorySet: CategorySet
  readonly id: string
}

export const VisumDeserializer = (input: any): Visum => {
  const single: Visum = {
    camp: input.camp ? CampDeserializer(input.camp) : undefined,
    categorySet: CategorySetDeserializer(input.category_set),
    id: input.id ? input.id : undefined
  }
  return single
}
