import { Camp, CampDeserializer } from "./Camp"
import { CampType, CampTypeDeserializer } from "./CampType"
import { CategorySet, CategorySetDeserializer } from "./CategorySet"
import { Engagement, EngagementDeserializer } from "./Engagement"

export enum VisumStates {
  SIGNABLE = "SIGNABLE"
}

export interface Visum {
  readonly camp: Camp
  readonly categorySet: CategorySet
  readonly id: string
  readonly engagement: Engagement
  readonly state: string
  groupGroupAdminId: string
  campTypes: Array<CampType>
}

export const VisumDeserializer = (input: any): Visum => {
  const single: Visum = {
    campTypes: input.camp_types ? input.camp_types.map((ct: any) => CampTypeDeserializer(ct)) : undefined,
    camp: CampDeserializer(input.camp),
    categorySet: CategorySetDeserializer(input.category_set),
    engagement: EngagementDeserializer(input.engagement),
    state: input.state ? input.state : undefined,
    id: input.id ? input.id : undefined,
    groupGroupAdminId: input.group_group_admin_id
  }
  return single
}
