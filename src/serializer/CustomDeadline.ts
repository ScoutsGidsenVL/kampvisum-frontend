export interface CustomDeadline {
  category?: string
  label?: string
}

export const CustomDeadlineDeserializer = (input: any): CustomDeadline => {
  const single: CustomDeadline = {
    category: input.category,
    label: input.label,
  }

  return single
}

export const CustomDeadlineSerializer = (input: any): any => {
  const single: any = {
    category: input.category,
    label: input.label,
  }
  return single
}
