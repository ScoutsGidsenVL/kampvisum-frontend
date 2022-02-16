import { CampType, CampTypeDeserializer } from "./CampType"

export interface CategorySetParent {
  readonly id: string
  readonly campType?: CampType
}

export const CategorySetParentDeserializer = (input: any): CategorySetParent => {
  const single: CategorySetParent = {
    id: input.id ? input.id : undefined,
    campType: input.camp_type ? CampTypeDeserializer(input.camp_type) : undefined
  }
  return single
}
