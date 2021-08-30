import { GroupDeserializer, GroupSerializer } from '@/serializer/Group'
import { BaseRepository } from '@/repositories/baseRepository'
import { Section, SectionDeserializer } from '@/serializer/Section'
import { ArrayResult } from '@/interfaces/ArrayResult'

export class GroupRepository extends BaseRepository {
  id = '/groups/'
  endpoint = '/groups/'
  deserializer = GroupDeserializer
  serializer = GroupSerializer

  getGroupSections(groupId: string): Promise<any> {
    return this.get(this.endpoint + groupId + '/sections', {}).then((response: ArrayResult) => {
      const array: any[] = []
      console.log("RESPONSE FOR GROUP: ", response)
      response.results.forEach((result: Section) => {
        array.push(SectionDeserializer(result))
      })
      return array
    })
  }

}
