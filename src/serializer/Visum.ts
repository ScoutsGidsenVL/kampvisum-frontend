import { Camp, CampDeserializer } from "./Camp"
import { CampType, CampTypeDeserializer } from "./CampType"
import { CategorySet, CategorySetDeserializer } from "./CategorySet"

export interface Visum {
  readonly camp: Camp
  readonly categorySet: CategorySet
  readonly id: string
  groupGroupAdminId: string
  campTypes: Array<CampType>
}

export const VisumDeserializer = (input: any): Visum => {
  const single: Visum = {
    campTypes: input.camp_types ? input.camp_types.map((ct: any) => CampTypeDeserializer(ct)) : undefined,
    camp: CampDeserializer(input.camp),
    categorySet: CategorySetDeserializer(input.category_set),
    id: input.id ? input.id : undefined,
    groupGroupAdminId: input.group_group_admin_id
  }
  return single
}
