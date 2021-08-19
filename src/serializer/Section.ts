export interface Section {
  readonly id?: string
  readonly name?: string
  readonly deleted?: any
  readonly uuid?: string
  readonly hidden?: boolean
  readonly group?: string
}

export const SectionDeserializer = (input: any): Section => {
  const single: Section = {
    id: input.id ? input.id : undefined,
    name: input.name ? input.name : undefined,
    deleted: input.deleted ? input.deleted : undefined,
    uuid: input.uuid ? input.uuid : undefined,
    hidden: input.hidden,
    group: input.group ? input.group : undefined,
  }

  return single
}

export const SectionSerializer = (input: any): any => {
  const single: any = {
    id: input.id ? input.id : undefined,
    name: input.name ? input.name : undefined,
    deleted: input.deleted ? input.deleted : undefined,
    uuid: input.uuid ? input.uuid : undefined,
    hidden: input.hidden ? input.hidden : undefined,
    group: input.group ? input.group : undefined,
  }

  return single
}
