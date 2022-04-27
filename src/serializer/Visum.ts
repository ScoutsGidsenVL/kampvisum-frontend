import { Camp, CampDeserializer } from "./Camp"
import { CampType, CampTypeDeserializer } from "./CampType"
import { CategorySet, CategorySetDeserializer } from "./CategorySet"
import { Engagement, EngagementDeserializer } from "./Engagement"

export enum VisumStates {
  SIGNABLE = "SIGNABLE",
  NOT_SIGNABLE = "NOT_SIGNABLE",
  DATA_REQUIRED = "DATA_REQUIRED",
  FEEDBACK_HANDLED = "FEEDBACK_HANDLED",
  APPROVED = "APPROVED"
}

export interface Visum {
  readonly camp: Camp
  readonly categorySet: CategorySet
  readonly id: string
  readonly engagement?: Engagement
  readonly state: string
  groupGroupAdminId: string
  campTypes: Array<CampType>
  notes?: string
}

export const VisumDeserializer = (input: any): Visum => {
  const single: Visum = {
    campTypes: input.camp_types ? input.camp_types.map((ct: any) => CampTypeDeserializer(ct)) : undefined,
    camp: CampDeserializer(input.camp),
    categorySet: CategorySetDeserializer(input.category_set),
    engagement: input.engagement ? EngagementDeserializer(input.engagement) : undefined,
    state: input.state ? input.state : undefined,
    id: input.id ? input.id : undefined,
    groupGroupAdminId: input.group_group_admin_id,
    notes: input.notes ? input.notes : ''
  }
  return single
}
