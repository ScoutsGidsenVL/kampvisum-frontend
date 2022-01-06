import { CategoryParent, CategoryParentDeserializer } from "./CategoryParent"
import { SubCategory, SubCategoryDeserializer } from "./SubCategory"

export interface Category {
  id?: string
  subCategories?: SubCategory
  categoryParent?: CategoryParent
}

export const CategoryDeserializer = (input: any): Category => {
  const single: Category = {
    id: input.id,
    subCategories: input.sub_categories ? input.sub_categories.map((subCategory: any) => SubCategoryDeserializer(subCategory)) : [],
    categoryParent: input.parent ? CategoryParentDeserializer(input.parent) : undefined
  }

  return single
}

export const CategorySerializer = (input: any): any => {
  const single: any = {
    name: input.name,
  }
  return single
}
