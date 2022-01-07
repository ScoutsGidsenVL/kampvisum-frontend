export interface SubCategoryParent {
  name?: string
  description: string
  explanation: string
}

export const SubCategoryParentDeserializer = (input: any): SubCategoryParent => {
  const single: SubCategoryParent = {
    name: input.name ? input.name : undefined,
    description: input.description ? input.description : "Description",
    explanation: input.explanation ? input.explanation : "Explanation"
  }
  return single
}