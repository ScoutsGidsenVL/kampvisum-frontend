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
    return this.get(this.id + groupId + '/years/', {}).then((response: []) => {
      return response
    })
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
    return this.patch(`${this.endpoint}${subCategoryId}/notes`, {}).then((response: any) => {
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

}
