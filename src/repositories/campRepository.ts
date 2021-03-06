import { CampDeserializer, CampSerializer, Camp } from '@/serializer/Camp'
import { BaseRepository } from '@/repositories/baseRepository'
import { ArrayResult } from '@/interfaces/ArrayResult'
import { Visum, VisumDeserializer } from '@/serializer/Visum'
import { useInternetHelper } from '@/helpers/internetHelper'
import { useOfflineData } from '@/composable/useOfflineData'
import useGroupAndYears from '@/composable/useGroupAndYears'

export class CampRepository extends BaseRepository {
  id = '/camps/'
  endpoint = '/visums/'
  deserializer = VisumDeserializer
  serializer = CampSerializer

  getArray(pagination?: string): Promise<any> {
    const { isInternetActive } = useInternetHelper()
    const { getVisums } = useOfflineData()
    const { selectedGroup, selectedYear } = useGroupAndYears()

    if (isInternetActive.value) {
      return this.get(this.endpoint + pagination, {}).then((response: ArrayResult) => {
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
                    if (v.camp.year.year === selectedYear.value && v.groupGroupAdminId === selectedGroup.value.groupAdminId) {
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
    const { updateYears, getYears } = useOfflineData()
    const { isInternetActive } = useInternetHelper()

    if (isInternetActive.value) {
      return this.get(this.id + groupId + '/years/', {}).then((response: []) => {
        // updateYears(response)
        return response
      })
    } else {
      return new Promise<Array<number>>((resolve, reject): void => {
        getYears().then((result: any) => {
            resolve(result)
        })
      })
    }
  }

  getById(id: string): Promise<any> {
    const { isInternetActive } = useInternetHelper()
    const { getVisum } = useOfflineData()


    if (isInternetActive.value) {
    return this.get(this.endpoint + id, {}).then((response: any) => {
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

  patchCategoryFeedback(subCategoryId: string, feedback: string): Promise<any> {
    return this.patch(`${this.endpoint}${subCategoryId}/feedback`, { feedback: feedback }).then((response: any) => {
      return response
    })
  }

  patchCategoryApproval(subCategoryId: string, approval: string): Promise<any> {
    return this.patch(`${this.endpoint}${subCategoryId}/approval`, { approval: approval }).then((response: any) => {
      return response
    })
  }

  patchVisumNotes(visumId: string, notes: string): Promise<any> {
    return this.patch(`${this.endpoint}${visumId}/notes`, { notes: notes }).then((response: any) => {
      return response
    })
  }

  patchVisumHandleFeedback(subCategoryId: string): Promise<any> {
    return this.patch(`${this.endpoint}${subCategoryId}/handle_feedback`, {}).then((response: any) => {
      return response
    })
  }

  patchVisumHandleFeedbackGlobal(visumId: string): Promise<any> {
    return this.patch(`${this.endpoint}${visumId}/global_handle_feedback`, {}).then((response: any) => {
      return response
    })
  }

  patchVisumApprovalGlobal(visumId: string): Promise<any> {
    return this.patch(`${this.endpoint}${visumId}/global_approval`, {}).then((response: any) => {
      return response
    })
  }

  patchVisumDisapproval(visumId: string): Promise<any> {
    return this.patch(`${this.endpoint}${visumId}/global_disapproval`, {}).then((response: any) => {
      return response
    })
  }

}
