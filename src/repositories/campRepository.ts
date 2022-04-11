import { CampDeserializer, CampSerializer, Camp } from '@/serializer/Camp'
import { BaseRepository } from '@/repositories/baseRepository'
import { ArrayResult } from '@/interfaces/ArrayResult'
import { Visum, VisumDeserializer } from '@/serializer/Visum'

export class CampRepository extends BaseRepository {
  id = '/camps/'
  endpoint = '/visums/'
  deserializer = VisumDeserializer
  serializer = CampSerializer

  getArray(pagination?: string): Promise<any> {
    return this.get(this.endpoint + pagination, {}).then((response: ArrayResult) => {
      const array: any[] = []
      if (response?.results) { 
        response.results.forEach((result: Visum) => {
          array.push(this.deserializer(result))
        })
      }
      return array
    })
  }

  getGroupYears(groupId: string): Promise<any> {
    // return this.get(this.endpoint + groupId + '/years', {}).then((response: []) => {
    return this.get(this.id + groupId + '/years/', {}).then((response: []) => {
      return response
    })
  }
}
