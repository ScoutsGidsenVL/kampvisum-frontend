import { DeadlineParent, DeadlineParentDeserializer } from "./DeadlineParent"
import { DeadlineItem, DeadlineItemDeserializer } from "./DeadlineItem"

export interface Deadline {
  createdBy?: string
  createdOn?: string
  updatedBy?: string
  updatedOn?: string
  id?: string
  visum: string
  deadlineParent?: DeadlineParent
  items?: Array<DeadlineItem>
  state?: string
}

export const DeadlineDeserializer = (input: any): Deadline => {
  const single: Deadline = {
    createdBy: input.created_by ? input.created_by : undefined,
    createdOn: input.created_on ? input.created_on : undefined,
    updatedBy: input.updated_by ? input.updated_by : undefined,
    updatedOn: input.updated_on ? input.updated_on : undefined,
    id: input.id,
    visum: input.visum,
    deadlineParent: input.parent ? DeadlineParentDeserializer(input.parent) : undefined,
    items: input.items ? input.items.map((item: any) => DeadlineItemDeserializer(item)) : undefined,
    state: input.state ? input.state : 'UNCHECKED'
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
