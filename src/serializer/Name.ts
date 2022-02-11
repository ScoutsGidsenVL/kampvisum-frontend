export interface Name {
  id?: string
  uuid?: string
  name?: string
  gender?: string
  deleted?: string
  hidden?: boolean
  ageGroup?: string
}

export const NameDeserializer = (input: any): Name => {
  const single: Name = {
    id: input.id,
    uuid: input.uuid,
    name: input.name,
    gender: input.gender,
    deleted: input.deleted,
    hidden: input.hidden ? input.hidden : undefined,
    ageGroup: input.age_group ? input.age_group : undefined
  }
  return single
}

export const NameSerializer = (input: any): any => {
  const single: any = {
    name: input.name,
    start_date: input.startDate,
    end_date: input.startDate
  }
  return single
}

