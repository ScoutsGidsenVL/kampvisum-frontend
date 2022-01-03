export interface Member {
  id?: string
  uuid?: string
  name?: string
  hasPaid?: string
}

export const NameDeserializer = (input: any): Member => {
  const single: Member = {
    id: input.id,
    uuid: input.uuid,
    name: input.name
  }

  return single
}

export const NameSerializer = (input: any): any => {
  const single: any = {
  }
  return single
}

