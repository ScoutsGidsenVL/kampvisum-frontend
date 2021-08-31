export interface SubCategory {
  name?: string
  status?: boolean
  uuid?: string
}

export const SubCategoryDeserializer = (input: any): SubCategory => {
  const single: SubCategory = {
    name: input.name,
    status: input.status,
    uuid: input.uuid,
  }

  return single
}

export const SubCategorySerializer = (input: any): any => {
  const single: any = {
    name: input.name,
  }
  return single
}
