export interface SubCategoryParent {
  name?: string
  label?: string
  description: string
  explanation: string
}

export const SubCategoryParentDeserializer = (input: any): SubCategoryParent => {
  const single: SubCategoryParent = {
    name: input.name ? input.name : undefined,
    label: input.label ? input.label : undefined,
    description: input.description ? input.description : undefined,
    explanation: input.explanation ? input.explanation : undefined,
  }
  return single
}