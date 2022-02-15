import { Check, CheckDeserializer } from "./Check"
import { Visum, VisumDeserializer } from "./Visum"
import { DueDate, DueDateDeserializer, DueDateSerializer } from "./DueDate"
import { SubCategory, SubCategoryDeserializer } from "./SubCategory"
import { DeadlineParent, DeadlineParentDeserializer } from "./DeadlineParent"
export interface Deadline {
  createdBy?: string
  createdOn?: string
  id?: string
  visum: string
  linkedChecks?: Array<Check>
  linkedSubCategories?: Array<SubCategory>
  deadlineParent?: DeadlineParent
  updatedBy?: string
  updatedOn?: string
}

export const DeadlineDeserializer = (input: any): Deadline => {
  console.log('RAW DEADLINES:', input)
  const single: Deadline = {
    createdBy: input.created_by ? input.created_by : undefined,
    createdOn: input.created_on ? input.created_on : undefined,
    id: input.id,
    linkedChecks: input.linked_checks ? input.linked_checks.map((lc: any) => CheckDeserializer(lc)) : undefined,
    linkedSubCategories: input.linked_sub_categories ? input.linked_sub_categories.map((lsc: any) => SubCategoryDeserializer(lsc)) : undefined,
    deadlineParent: input.parent ? DeadlineParentDeserializer(input.parent) : undefined,
    updatedBy: input.updated_by ? input.updated_by : undefined,
    updatedOn: input.updated_on ? input.updated_on : undefined,
    visum: input.visum,
  }

  return single
}

export const DeadlineSerializer = (input: Deadline): any => {
  const single: any = {
    visum: input.visum,
    // due_date: DueDateSerializer(input.dueDate),
    // deadline_check: { id: input.deadlineCheck.id }
  }
  return single
}
