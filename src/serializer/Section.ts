import { GroupType, GroupTypeDeserializer } from "./GroupType"
import { Name, NameDeserializer, NameSerializer } from "./Name"

export interface Section {
  readonly id?: string
  readonly uuid?: string
  readonly deleted?: any
  name: Name
  readonly hidden?: boolean
  readonly group?: string
  groupType?: GroupType
  groupAdminId?: string
  
}

export const SectionDeserializer = (input: any): Section => {
  const single: Section = {
    id: input.id ? input.id : undefined,
    name: NameDeserializer(input.name),
    deleted: input.deleted ? input.deleted : undefined,
    uuid: input.uuid ? input.uuid : undefined,
    hidden: input.hidden,
    group: input.group ? input.group : undefined,
    groupType: input.group_type ? GroupTypeDeserializer(input.group_type) : undefined,
    groupAdminId: input.group_group_admin_id ? input.group_group_admin_admin_id : undefined
  }
  return single
}

export const SectionSerializer = (input: Section): any => {
  console.log('SECTION EXAMPLE: ', input)
  const single: any = {
    group_group_admin_id: input.groupAdminId ? input.groupAdminId : undefined,
    group_type: input.groupType ? input.groupType : undefined,
    name: input.name ? NameSerializer(input.name) : undefined
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
