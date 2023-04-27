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

  search(groupId: string, query: string): Promise<any> {
    return this.get(groupId ? groupId : selectedGroup.value.groupAdminId, `${this.endpoint}?term=${query}`, {}).then((response: any) => {
      const array: any[] = []
      response.results.forEach((result: any) => {
        result = PostLocationDeserializer(result)
        array.push(result)
      })
      return array
    })
  }

  getCampLocations(groupId: string, filters: LocationFilter): Promise<any> {
    let filterParams = {}

    if (filters.year) {
      filterParams = { ...filterParams, ...{ year: filters.year } }
    }

    if (filters.startDate) {
      filterParams = { ...filterParams, ...{ start_date: filters.startDate } }
    }

    if (filters.endDate) {
      filterParams = { ...filterParams, ...{ end_date: filters.endDate } }
    }

    if (filters.groupNumber) {
      filterParams = { ...filterParams, ...{ group: filters.groupNumber } }
    }

    if (!filters.groupNumber) {
      filterParams = { ...filterParams, ...{ group: 'any' } }
    }

    console.log('FILTERSS...,', filterParams)
    return this.getWithoutGroupId(`/visums${this.endpoint}`, { params: filterParams }).then((response: any) => {
      return response
    })
  }
}
