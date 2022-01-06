export interface SubCategoryParent {
  name?: string
}

export const SubCategoryParentDeserializer = (input: any): SubCategoryParent => {
  const single: SubCategoryParent = {
    name: input.name ? input.name : undefined,
  }
  return single
}