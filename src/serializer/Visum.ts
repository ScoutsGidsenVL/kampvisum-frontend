import { Camp, CampDeserializer } from "./Camp"
import { CategorySet, CategorySetDeserializer } from "./CategorySet"

export interface Visum {
  readonly camp: Camp
  readonly categorySet: CategorySet
  readonly id: string
  groupGroupAdminId: string
}

export const VisumDeserializer = (input: any): Visum => {
  const single: Visum = {
    camp: CampDeserializer(input.camp),
    categorySet: CategorySetDeserializer(input.category_set),
    id: input.id ? input.id : undefined,
    groupGroupAdminId: input.group_group_admin_id
  }
  return single
}
