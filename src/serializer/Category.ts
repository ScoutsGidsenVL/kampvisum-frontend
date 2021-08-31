import { SubCategory, SubCategoryDeserializer } from "./SubCategory"

export interface Category {
  name?: string
  status?: boolean
  uuid?: string
  subCategories?: SubCategory
}

export const CategoryDeserializer = (input: any): Category => {
  const single: Category = {
    name: input.name,
    status: input.status,
    uuid: input.uuid,
    subCategories: input.sub_categories ? input.sub_categories.map((subCategory: any) => SubCategoryDeserializer(subCategory)) : [
      {name: 'Planning', status: false, uuid: 'UUID123456789'},
      {name: 'Logistiek', status: false, uuid: 'UUID123456789'},
      {name: 'Veiligheid', status: false, uuid: 'UUID123456789'}
    ]
  }

  return single
}

export const CategorySerializer = (input: any): any => {
  const single: any = {
    name: input.name,
  }
  return single
}
