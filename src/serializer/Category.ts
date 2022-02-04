import { CategoryParent, CategoryParentDeserializer } from "./CategoryParent"
import { SubCategory, SubCategoryDeserializer } from "./SubCategory"

export interface Category {
  id?: string
  subCategories?: SubCategory
  categoryParent: CategoryParent
  state: string
}

export const CategoryDeserializer = (input: any): Category => {
  const single: Category = {
    id: input.id,
    subCategories: input.sub_categories ? input.sub_categories.map((subCategory: any) => SubCategoryDeserializer(subCategory)) : [],
    categoryParent: CategoryParentDeserializer(input.parent),
    state: input.state ? input.state : 'UNCHECKED'
  }

  return single
}

export const CategorySerializer = (input: any): any => {
  const single: any = {
    name: input.name,
  }
  return single
}
