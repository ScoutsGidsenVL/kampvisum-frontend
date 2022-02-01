export interface CategoryParent {
  name?: string
  label?: string
  description: string
  explanation: string
}

export const CategoryParentDeserializer = (input: any): CategoryParent => {
  const single: CategoryParent = {
    name: input.name ? input.name : undefined,
    label: input.label ? input.label : undefined,
    description: input.description ? input.description : undefined,
    explanation: input.explanation ? input.explanation : undefined
  }
  return single
}