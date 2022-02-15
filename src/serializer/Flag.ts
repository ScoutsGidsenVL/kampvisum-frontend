export interface Flag {
  createdBy?: string
  createdOn?: string
  flag?: boolean
  id?: string
  parent?: 

}

export const FlagDeserializer = (input: any): Flag => {
  const single: Flag = {
    category: input.category,
  }

  return single
}

export const FlagSerializer = (input: Flag): any => {
  const single: any = {
  }
  return single
}
