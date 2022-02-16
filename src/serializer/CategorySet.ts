import { Category, CategoryDeserializer } from "./Category"
import { CategorySetParent, CategorySetParentDeserializer } from "./CategorySetParent"

export interface CategorySet {
  readonly categories: Category[]
  readonly id: string
  readonly categorySetParent?: CategorySetParent
}

export const CategorySetDeserializer = (input: any): CategorySet => {
  const single: CategorySet = {
    categorySetParent: input.parent ? CategorySetParentDeserializer(input.parent) : undefined,
    categories: input.categories ? input.categories.map((c: any) => CategoryDeserializer(c)) : undefined,
    id: input.id ? input.id : undefined
  }
  return single
}
