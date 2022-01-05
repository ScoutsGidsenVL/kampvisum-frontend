import { CampDeserializer, CampSerializer } from '@/serializer/Camp'
import { BaseRepository } from '@/repositories/baseRepository'
import { ArrayResult } from '@/interfaces/ArrayResult'

export class CampRepository extends BaseRepository {
  id = '/camps/'
  endpoint = '/visums/'
  deserializer = CampDeserializer
  serializer = CampSerializer

  getArray(pagination?: string): Promise<any> {
    return this.get(this.endpoint + pagination, {}).then((response: ArrayResult) => {
      const array: any[] = []
      response.results.forEach((result: any) => {
        array.push(this.deserializer(result))
      })
      return array
    })
  }

  getGroupYears(groupId: string): Promise<any> {
    // return this.get(this.endpoint + groupId + '/years', {}).then((response: []) => {
    return this.get(this.id + groupId + '/years', {}).then((response: []) => {
      return response
    })
  }
}
