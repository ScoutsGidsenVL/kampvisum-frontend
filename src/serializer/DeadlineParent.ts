import { DueDate, DueDateDeserializer } from "./DueDate"
import { Year, YearDeserializer } from "./Year"
import { CampType, CampTypeDeserializer } from "./CampType"

export interface DeadlineParent {
  id?: string
  createdBy?: string
  createdOn?: string
  updatedBy?: string
  updatedOn?: string
  campYear?: Year
  campTypes?: Array<CampType>
  isImportant: boolean
  dueDate?: DueDate
  name?: string
  label?: string
  description?: string
  explanation?: string
}

export const DeadlineParentDeserializer = (input: any): DeadlineParent => {
  const single: DeadlineParent = {
    id: input.id ? input.id : undefined,
    createdBy: input.created_by ? input.created_by : undefined,
    createdOn: input.created_on ? input.created_on : undefined,
    updatedBy: input.updated_by ? input.updated_by : undefined,
    updatedOn: input.updated_on ? input.updated_on : undefined,
    campYear: input.camp_year ? YearDeserializer(input.camp_year) : undefined,
    campTypes: input.camp_types ? input.camp_types.map((camp_type: any) => CampTypeDeserializer(camp_type)) : undefined,
    isImportant: input.is_important ? input.is_important : undefined,
    dueDate: DueDateDeserializer(input.due_date),
    name: input.name ? input.name : undefined,
    label: input.label ? input.label : undefined,
    description: input.description ? input.description : undefined,
    explanation: input.explanation ? input.explanation : undefined,
  }

  return single
}

export const DeadlineParentSerializer = (input: DeadlineParent): any => {
  const single: any = {
    // visum: input.visum,
    name: input.name,
    label: input.label,
    description: input.description,
    explanation: input.explanation,
    // important: input.important,
    // due_date: DueDateSerializer(input.dueDate),
    // deadline_check: { id: input.deadlineCheck.id }
  }
  return single
}
