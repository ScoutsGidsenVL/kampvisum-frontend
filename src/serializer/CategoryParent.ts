export interface CategoryParent {
  name?: string
}

export const CategoryParentDeserializer = (input: any): CategoryParent => {
  const single: CategoryParent = {
    name: input.name ? input.name : undefined,
  }
  return single
}