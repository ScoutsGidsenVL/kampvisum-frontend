import { Name, NameDeserializer, NameSerializer } from "./Name"

export interface Section {
  readonly id?: string
  readonly uuid?: string
  readonly deleted?: any
  readonly name?: Name
  readonly hidden?: boolean
  readonly group?: string
}

export const SectionDeserializer = (input: any): Section => {
  const single: Section = {
    id: input.id ? input.id : undefined,
    name: input.name ? NameDeserializer(input.name) : undefined,
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
    name: input.name ? NameSerializer(input.name) : undefined,
    deleted: input.deleted ? input.deleted : undefined,
    uuid: input.uuid ? input.uuid : undefined,
    hidden: input.hidden ? input.hidden : undefined,
    group: input.group ? input.group : undefined,
  }

  return single
}

export const SectionObjectsToSectionStrings = (sections: Section[]) => {
  const sectionsUuids: string[] = []
  sections.forEach((section: Section) => {
    if (section.id) {
      sectionsUuids.push(section.id)
    }
  })

  return sectionsUuids
}
