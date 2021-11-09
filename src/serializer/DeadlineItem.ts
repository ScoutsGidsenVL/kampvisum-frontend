export interface DeadlineItem {
  category?: string
  label?: string
}

export const DeadlineItemDeserializer = (input: any): DeadlineItem => {
  const single: DeadlineItem = {
    category: input.category,
    label: input.label,
  }

  return single
}

export const DeadlineItemSerializer = (input: any): any => {
  const single: any = {
    category: input.category,
    label: input.label,
  }
  return single
}
