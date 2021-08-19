import { GroupDeserializer, GroupSerializer } from '@/serializer/Group'
import { BaseRepository } from '@/repositories/baseRepository'
import { Section, SectionDeserializer } from '@/serializer/Section'

export class GroupRepository extends BaseRepository {
  id = '/groups/'
  endpoint = '/groups/'
  deserializer = GroupDeserializer
  serializer = GroupSerializer

  getGroupSections(groupId: string): Promise<any> {
    return this.get(this.endpoint + groupId + '/sections', {}).then((response: []) => {
      const array: any[] = []
      response.forEach((result: Section) => {
        console.log('BEFORE: ', result)
        console.log('AFTER: ', SectionDeserializer(result))
        array.push(SectionDeserializer(result))
      })
      return array
    })
  }

}
