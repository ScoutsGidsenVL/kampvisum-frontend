import { ArrayResult } from '@/interfaces/ArrayResult'
import { BaseRepository } from '@/repositories/baseRepository'
import { DeadlineDeserializer, DeadlineSerializer } from '@/serializer/Deadline'

export class DeadlineRepository extends BaseRepository {
  id = '/deadlinesRepository/'
  endpoint = '/deadlines/'
  deserializer = DeadlineDeserializer
  serializer = DeadlineSerializer

  getArray(visumId?: string): Promise<any> {
    return this.get(`${this.endpoint}visum/${visumId}`, {}).then((response: ArrayResult) => {
      const array: any[] = []
      response.results.forEach((result: any) => {
        array.push(this.deserializer(result))
      })
      return array
    })
  }

  createDeadline(data: any) {
    return this.post(this.endpoint, this.serializer(data)).then((response: any) => {
      return this.deserializer(response)
    })
  }

  createDeadlineSubCategory(data: any) {
    return this.post(`${this.endpoint}sub_category/`, this.serializer(data)).then((response: any) => {
      return this.deserializer(response)
    })
  }

  createDeadlineCheck(data: any) {
    return this.post(`${this.endpoint}checks/`, this.serializer(data)).then((response: any) => {
      return this.deserializer(response)
    })
  }
  
  updateFlag(deadlineId: string, id: string, data: any) {
    return this.patch(this.endpoint + 'flags/' + deadlineId + '/' + id, data).then((response: any) => {
      return response
    })
  }

}
