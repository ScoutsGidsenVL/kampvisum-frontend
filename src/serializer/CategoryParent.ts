export interface CategoryParent {
  name?: string
  description: string
  explanation: string
}

export const CategoryParentDeserializer = (input: any): CategoryParent => {
  const single: CategoryParent = {
    name: input.name ? input.name : undefined,
    description: input.description ? input.description : "Description",
    explanation: input.explanation ? input.explanation : "Explanation"
  }
  return single
}