import { BaseRepository } from '@/repositories/baseRepository'
import { Section, SectionDeserializer } from '@/serializer/Section'
import { ArrayResult } from '@/interfaces/ArrayResult'
import { useInternetHelper } from '@/helpers/internetHelper'

export class GroupRepository extends BaseRepository {
  id = '/groups/'
  endpoint = ''
  deserializer = undefined
  serializer = undefined

  getGroupSections(groupId: string): Promise<any> {
    const { isInternetActive } = useInternetHelper()

    if (isInternetActive.value) {
      return this.get(groupId, `/sections`, {}).then((response: ArrayResult) => {
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
