import { Category, CategoryDeserializer } from "./Category"

export interface CategorySet {
  readonly categories: Category[]
  readonly id: string
}

export const CategorySetDeserializer = (input: any): CategorySet => {
  const single: CategorySet = {
    categories: input.categories ? input.categories.map((c: any) => CategoryDeserializer(c)) : undefined,
    id: input.id ? input.id : undefined
  }
  return single
}
