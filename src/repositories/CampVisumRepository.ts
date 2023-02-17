import { BaseRepository } from '@/repositories/baseRepository'
import { ArrayResult } from '@/interfaces/ArrayResult'
import { Visum, CampVisumDeserializer, CampVisumOverviewDeserializer, CampVisumSerializer } from '@/serializer/Visum'
import { useInternetHelper } from '@/helpers/internetHelper'
import { useOfflineData } from '@/composable/useOfflineData'
import useGroupAndYears from '@/composable/useGroupAndYears'
import { ref } from 'vue'

export class CampVisumRepository extends BaseRepository {
  id = '/camps/'
  endpoint = '/visums/'
  deserializer = CampVisumOverviewDeserializer
  serializer = CampVisumSerializer

  getArray(groupId: string, pagination?: string): Promise<any> {
    const { isInternetActive } = useInternetHelper()
    const { getVisums } = useOfflineData()
    const { selectedGroup, selectedYear } = useGroupAndYears()

    if (isInternetActive.value) {
      return this.get(groupId, this.endpoint + (pagination ? pagination + "&group=" + groupId : "?group=" + groupId), {}).then((response: ArrayResult) => {
        const array: any[] = []
        if (response?.results) {
          response.results.forEach((result: Visum) => {
            array.push(this.deserializer(result))
          })
        }
        return array
      })
    } else {
      return new Promise<any>((resolve): void => {
        getVisums().then((results) => {
          let data: Array<Visum> = []
          if (results) {
            results.forEach((v: Visum) => {
              if (v.year.year === selectedYear.value && v.groupGroupAdminId === selectedGroup.value.groupAdminId) {
                data.push(v)
              }
            })
          }

          resolve(data)
        })
      })
    }

  }

  getGroupYears(groupId: string): Promise<any> {
    const { getYears, updateYears } = useOfflineData()
    const { isInternetActive } = useInternetHelper()
    const { isInBetweenStartAndEnd } = useGroupAndYears()

    if (isInternetActive.value) {
      return this.get(groupId, '/camp_years/', {}).then((response: { results: [] }) => {
        const years = ref<Array<number>>([])
        response.results.forEach((year: Year) => {
          if (isInBetweenStartAndEnd(year.start_date, year.end_date)) {
            years.value.push(year.year);
          } else {
            years.value.unshift(year.year);
          }
        })
        updateYears([...years.value]);
        return years.value
      })
    } else {
      return new Promise<Array<number>>((resolve, reject): void => {
        getYears().then((result: any) => {
          resolve(result)
        })
      })
    }
  }

  getById(groupId: string, id: string): Promise<any> {
    const { isInternetActive } = useInternetHelper()
    const { getVisum } = useOfflineData()


    if (isInternetActive.value) {
      return this.get(groupId, this.endpoint + id, {}).then((response: any) => {
        return this.deserializer(response)
      })
    } else {
      return new Promise<any>((resolve) => {
        getVisum(id.replace('/', '')).then((result: Visum) => {
          resolve(result)
        })
      })
    }
  }

  getDatesLeadersById(groupId: string, id: string): Promise<any> {
    return this.get(groupId, `${this.endpoint}${id}/dates/leaders`, {}).then((response: any) => {
      return response
    })
  }

  patchCategoryFeedback(groupId: string, subCategoryId: string, feedback: string): Promise<any> {
    return this.patch(groupId, `${this.endpoint}${subCategoryId}/feedback`, { feedback: feedback }).then((response: any) => {
      return response
    })
  }

  patchCategoryApproval(groupId: string, subCategoryId: string, approval: string): Promise<any> {
    return this.patch(groupId, `${this.endpoint}${subCategoryId}/approval`, { approval: approval }).then((response: any) => {
      return response
    })
  }

  patchVisumNotes(groupId: string, visumId: string, notes: string): Promise<any> {
    return this.patch(groupId, `${this.endpoint}${visumId}/notes`, { notes: notes }).then((response: any) => {
      return response
    })
  }

  patchVisumHandleFeedback(groupId: string, subCategoryId: string): Promise<any> {
    return this.patch(groupId, `${this.endpoint}${subCategoryId}/handle_feedback`, {}).then((response: any) => {
      return response
    })
  }

  patchVisumHandleFeedbackGlobal(groupId: string, visumId: string): Promise<any> {
    return this.patch(groupId, `${this.endpoint}${visumId}/global_handle_feedback`, {}).then((response: any) => {
      return response
    })
  }

  patchVisumApprovalGlobal(groupId: string, visumId: string): Promise<any> {
    return this.patch(groupId, `${this.endpoint}${visumId}/global_approval`, {}).then((response: any) => {
      return response
    })
  }

  patchVisumDisapproval(groupId: string, visumId: string): Promise<any> {
    return this.patch(groupId, `${this.endpoint}${visumId}/global_disapproval`, {}).then((response: any) => {
      return response
    })
  }

}

export interface Year {
  id: string;
  year: number;
  start_date: string;
  end_date: string;
  created_on: Date;
  updated_on: Date;
  created_by?: any;
  updated_by?: any;
}
