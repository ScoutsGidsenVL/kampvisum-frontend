import { Check, CheckDeserializer } from "./Check"
import { Visum, VisumDeserializer } from "./Visum"
import { DueDate, DueDateDeserializer, DueDateSerializer } from "./DueDate"
import { SubCategory, SubCategoryDeserializer } from "./SubCategory"
export interface Deadline {
  id?: string
  visum: string
  name: string
  label: string
  description: string
  explanation: string 
  important: boolean
  dueDate: DueDate
  deadlineCheck?: Check
  deadlineSubCategory?: SubCategory
}

export const DeadlineDeserializer = (input: any): Deadline => {
  const single: Deadline = {
    id: input.id,
    visum: input.visum,
    name: input.name,
    label: input.label,
    description: input.description,
    explanation: input.explanation,
    important: input.important,
    dueDate: DueDateDeserializer(input.due_date),
    deadlineCheck: input.deadline_check ? CheckDeserializer(input.deadline_check) : undefined,
    deadlineSubCategory: input.deadline_sub_category ? SubCategoryDeserializer(input.deadline_sub_category) : undefined
  }

  return single
}

export const DeadlineSerializer = (input: Deadline): any => {
  const single: any = {
    visum: input.visum,
    name: input.name,
    label: input.label,
    description: input.description,
    explanation: input.explanation,
    important: input.important,
    due_date: DueDateSerializer(input.dueDate),
    // deadline_check: { id: input.deadlineCheck.id }
  }
  return single
}
