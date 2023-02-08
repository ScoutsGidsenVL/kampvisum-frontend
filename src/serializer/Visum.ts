import { YearDeserializer } from "./Year"
import { CampType, CampTypeDeserializer } from "./CampType"
import { CategorySet, CategorySetDeserializer } from "./CategorySet"
import { Section, SectionDeserializer } from "./Section"
import { Engagement, EngagementDeserializer } from "./Engagement"

export enum VisumStates {
  SIGNABLE = "SIGNABLE",
  NOT_SIGNABLE = "NOT_SIGNABLE",
  DATA_REQUIRED = "DATA_REQUIRED",
  FEEDBACK_HANDLED = "FEEDBACK_HANDLED",
  APPROVED = "APPROVED"
}

export interface Visum {
  readonly id: string
  groupGroupAdminId: string
  groupName: string
  year?: any
  name: string
  startDate?: string
  endDate?: string
  sections: Array<string> | Array<Section>
  campTypes: Array<CampType>
  readonly categorySet: CategorySet
  readonly engagement?: Engagement
  readonly state: string
  notes?: string
  readonly createdBy?: string
  readonly createdOn?: string
  readonly updatedBy?: string
  readonly updatedOn?: string
}

export const VisumDeserializer = (input: any): Visum => {
  const single: Visum = {
    id: input.id ? input.id : undefined,
    groupGroupAdminId: input.group_group_admin_id,
    groupName: input.group_name,
    year: input.year ? YearDeserializer(input.year) : undefined,
    name: input.name,
    startDate: input.start_date,
    endDate: input.end_date,
    sections: input.sections ? input.sections.map((section: any) => SectionDeserializer(section)) : undefined,
    campTypes: input.camp_types ? input.camp_types.map((ct: any) => CampTypeDeserializer(ct)) : undefined,
    categorySet: CategorySetDeserializer(input.category_set),
    engagement: input.engagement ? EngagementDeserializer(input.engagement) : undefined,
    state: input.state ? input.state : undefined,
    notes: input.notes ? input.notes : '',
    createdBy: input.created_by ? input.created_by : undefined,
    createdOn: input.created_on ? input.created_on : undefined,
    updatedBy: input.updated_by ? input.updated_by : undefined,
    updatedOn: input.updated_on ? input.updated_on : undefined
  }
  return single
}
