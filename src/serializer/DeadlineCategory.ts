export interface DeadlineCategory {
  id?: string,
  name?: string,
  label?: string
}

export const DeadlineCategoryDeserializer = (input: any): DeadlineCategory => {
  const single: DeadlineCategory = {
    id: input.id,
    name: input.name,
    label: input.label
  }

  return single
}
