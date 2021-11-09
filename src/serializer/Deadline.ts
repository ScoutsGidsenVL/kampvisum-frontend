import { DeadlineItem, DeadlineItemDeserializer } from "./DeadlineItem"

export interface Deadline {
  title?: string
  deadline?: string
  info?: string
  checklist?: Array<DeadlineItem>
}

export const DeadlineDeserializer = (input: any): Deadline => {
  const single: Deadline = {
    title: input.title,
    deadline: input.deadline,
    info: input.info,
    checklist: input.checklist ? input.checklist.map((deadlineItem: any) => DeadlineItemDeserializer(deadlineItem)) : []
  }

  return single
}

export const DeadlineSerializer = (input: any): any => {
  const single: any = {
    title: input.title,
    deadline: input.deadline,
    info: input.info,
    checklist: input.checklist,
  }
  return single
}
