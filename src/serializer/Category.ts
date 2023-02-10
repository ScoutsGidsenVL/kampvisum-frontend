import { CategoryParent, CategoryParentDeserializer } from "./CategoryParent"
import { SubCategory, SubCategoryDeserializer } from "./SubCategory"

export interface Category {
  visum?: { id: string, name: string }
  id?: string
  subCategories?: SubCategory[]
  categoryParent: CategoryParent
  state: string
  notes?: string
}

export const CategoryDeserializer = (input: any): Category => {
  const single: Category = {
    visum: input.visum ? input.visum : undefined,
    id: input.id,
    subCategories: input.sub_categories ? input.sub_categories.filter((x: any) => x !== null).map((subCategory: any) => SubCategoryDeserializer(subCategory)) : [],
    categoryParent: CategoryParentDeserializer(input.parent),
    state: input.state ? input.state : 'UNCHECKED',
    notes: input.notes ? input.notes : 'Here are DC Notes'
  }

  return single
}

export const CategorySerializer = (input: any): any => {
  const single: any = {
    name: input.name,
  }
  return single
}
