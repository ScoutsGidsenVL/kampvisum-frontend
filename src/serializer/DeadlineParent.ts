import { DueDate, DueDateDeserializer } from "./DueDate"
export interface DeadlineParent {
  checks?: Array<any>
  createdBy?: string
  createdOn?: string
  deadlineType?: string
  description?: string
  dueDate?: DueDate
  explanation?: string
  id?: string
  isImportant: boolean
  label?: string
  name?: string
  subCategpries?: any
}

export const DeadlineParentDeserializer = (input: any): DeadlineParent => {
  const single: DeadlineParent = {
    checks: input.checks ? input.checks : undefined,
    createdBy: input.created_by ? input.created_by : undefined,
    createdOn: input.created_on ? input.created_on : undefined,
    deadlineType: input.deadline_type ? input.deadline_type : undefined,
    description: input.description ? input.description : undefined,
    dueDate: DueDateDeserializer(input.due_date),
    explanation: input.explanation ? input.explanation : undefined,
    id: input.id ? input.id : undefined,
    isImportant: input.is_important ? input.is_important : undefined,
    label: input.label ? input.label : undefined,
    name: input.name ? input.name : undefined,
    subCategpries: input.sub_categories ? input.sub_categories : undefined,
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
