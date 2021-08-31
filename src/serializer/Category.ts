export interface Category {
  id?: string
  uuid?: string
  name?: string
}

export const CategoryDeserializer = (input: any): Category => {
  const single: Category = {
    id: input.id,
    uuid: input.uuid,
    name: input.name,
  }

  return single
}

export const CategorySerializer = (input: any): any => {
  const single: any = {
    name: input.name,
  }
  return single
}
