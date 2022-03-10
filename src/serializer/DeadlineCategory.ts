export interface DeadlineCategory {
  id?: string,
  name?: string,
  label?: string
  category?: DeadlineCategory
}

export const DeadlineCategoryDeserializer = (input: any): DeadlineCategory => {
  const single: DeadlineCategory = {
    id: input.id,
    name: input.name,
    label: input.label,
    category: input.category ? DeadlineCategoryDeserializer(input.category) : undefined
  }

  return single
}
