import { GroupDeserializer, GroupSerializer } from '@/serializer/Group'
import { BaseRepository } from '@/repositories/baseRepository'
import { Section, SectionDeserializer } from '@/serializer/Section'
import { ArrayResult } from '@/interfaces/ArrayResult'
import { useInternetHelper } from '@/helpers/internetHelper'

export class GroupRepository extends BaseRepository {
  id = '/groups/'
  endpoint = 'ga/groups/'
  deserializer = GroupDeserializer
  serializer = GroupSerializer

  getArray(groupId: string, pagination?: string): Promise<any> {
    return this.get(groupId, this.endpoint, {}).then((response: Array<any>) => {
      const array: any[] = []
      response.forEach((result: any) => {
        array.push(this.deserializer(result))
      })
      return array
    })
  }

  getGroupSections(groupId: string): Promise<any> {
    const { isInternetActive } = useInternetHelper()

    if (isInternetActive.value) {
      return this.get(groupId, `/sections/${groupId}/`, {}).then((response: ArrayResult) => {
        const array: any[] = []
        response.results.forEach((result: Section) => {
          array.push(SectionDeserializer(result))
        })
        return array
      })
    } else {
      return new Promise<any>((resolve, reject) => {
        resolve(true)
      })
    }
  }
}
