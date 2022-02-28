import { CategoryParent, CategoryParentDeserializer } from "./CategoryParent"
import { SubCategory, SubCategoryDeserializer } from "./SubCategory"

export interface Category {
  camp?: { name: string }
  visum?: { id: string }
  id?: string
  subCategories?: SubCategory
  categoryParent: CategoryParent
  state: string
}

export const CategoryDeserializer = (input: any): Category => {
  const single: Category = {
    camp: input.camp ? input.camp : undefined,
    visum: input.visum ? input.visum : undefined,
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
