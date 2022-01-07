export interface CategoryParent {
  name?: string
  description: string
}

export const CategoryParentDeserializer = (input: any): CategoryParent => {
  const single: CategoryParent = {
    name: input.name ? input.name : undefined,
    description: input.description ? input.description : "Here comes the info of an category (still needs to be in fixture)"
  }
  return single
}