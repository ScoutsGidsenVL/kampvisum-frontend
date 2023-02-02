import { useInternetHelper } from '@/helpers/internetHelper'
import { ArrayResult } from '@/interfaces/ArrayResult'
import { BaseRepository } from '@/repositories/baseRepository'
import { CampTypeDeserializer, CampTypeSerializer } from '@/serializer/CampType'

export class CampTypeRepository extends BaseRepository {
  id = '/campTypes/'
  endpoint = '/camp_types/'
  deserializer = CampTypeDeserializer
  serializer = CampTypeSerializer

  getArray(groupId: string, pagination?: string): Promise<any> {
    const { isInternetActive } = useInternetHelper()

    if (isInternetActive.value) {
      return this.get(this.endpoint + "?group=" + groupId, {}).then((response: ArrayResult) => {
        const array: any[] = []
        response.results.forEach((result: any) => {
          array.push(this.deserializer(result))
        })
        return array
      })
    } else {
      return new Promise<any>((resolve, reject) => {
        resolve([])
      })
    }

  }
}
