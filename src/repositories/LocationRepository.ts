import { BaseRepository } from '@/repositories/baseRepository'
import { LocationFilter } from '@/serializer/Filter'
import { PostLocationDeserializer } from '@/serializer/PostLocation'
export class LocationRepository extends BaseRepository {
  id = '/locations/'
  endpoint = '/locations/'
  deserializer = undefined
  serializer = undefined

  search(query: string): Promise<any> {
    return this.get(`${this.endpoint}?term=${query}`, {}).then((response: any) => {
      const array: any[] = []
      response.results.forEach((result: any) => {
        result = PostLocationDeserializer(result)
        array.push(result)
      })
      return array
    })
  }

  getCampLocations(filters: LocationFilter): Promise<any> {
    return this.get(`/visums${this.endpoint}?number=${filters.groupNumber}&year=${filters.year}&startDate=${filters.startDate}&endDate=${filters.endDate}`, {}).then((response: any) => {
      return response
    })
  }
}
