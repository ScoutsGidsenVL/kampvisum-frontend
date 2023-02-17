import { Category, CategoryDeserializer } from "./Category"
import { CategorySetParent, CategorySetParentDeserializer } from "./CategorySetParent"

export interface CategorySet {
  readonly categories: Category[]
  readonly id: string
  readonly categorySetParent?: CategorySetParent
}

export const CategorySetDeserializer = (input: any): CategorySet => {
  const single: CategorySet = {
    categories: input.categories ? input.categories.filter((x: any) => x !== null).map((c: any) => CategoryDeserializer(c)) : undefined,
    id: input.id ? input.id : undefined,
    categorySetParent: input.parent ? CategorySetParentDeserializer(input.parent) : undefined
  }
  return single
}
