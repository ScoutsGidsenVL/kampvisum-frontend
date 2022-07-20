import useGroupAndYears from '@/composable/useGroupAndYears'
import { BaseRepository } from '@/repositories/baseRepository'
import { LocationFilter } from '@/serializer/Filter'
import { PostLocationDeserializer } from '@/serializer/PostLocation'
const { selectedGroup } = useGroupAndYears()

export class LocationRepository extends BaseRepository {
  id = '/locations/'
  endpoint = '/locations/'
  deserializer = undefined
  serializer = undefined

  search(query: string): Promise<any> {
    return this.get(`${this.endpoint}?term=${query}&group=${selectedGroup.value.groupAdminId}`, {}).then((response: any) => {
      const array: any[] = []
      response.results.forEach((result: any) => {
        result = PostLocationDeserializer(result)
        array.push(result)
      })
      return array
    })
  }

  getCampLocations(filters: LocationFilter): Promise<any> {
    console.log('FILTERS: ', filters)
    let filterParams = {}

    if (filters.year) {
      filterParams = {...filterParams, ...{year: filters.year}}
    }

    if (filters.startDate) {
      filterParams = {...filterParams, ...{start_date: filters.startDate}}
    }

    if (filters.endDate) {
      filterParams = {...filterParams, ...{end_date: filters.endDate}}
    }

    if (filters.groupNumber) {
      filterParams = {...filterParams, ...{group: filters.groupNumber}}
    }

    return this.get(`/visums${this.endpoint}`, { params: filterParams}).then((response: any) => {
      return response
    })
  }
}
