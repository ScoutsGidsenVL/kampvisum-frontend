import { ArrayResult } from '@/interfaces/ArrayResult'
import { BaseRepository } from '@/repositories/baseRepository'
import { DeadlineDeserializer, DeadlineSerializer } from '@/serializer/Deadline'

export class DeadlineRepository extends BaseRepository {
  id = '/deadlinesRepository/'
  endpoint = '/deadlines/'
  deserializer = DeadlineDeserializer
  serializer = DeadlineSerializer

  getArray(groupId: string, visumId?: string): Promise<any> {
    return this.get(groupId, `${this.endpoint}visum/${visumId}`, {}).then((response: ArrayResult) => {
      const array: any[] = []
      response.results.forEach((result: any) => {
        array.push(this.deserializer(result))
      })
      return array
    })
  }

  createDeadline(groupId: string, data: any) {
    return this.post(groupId, this.endpoint, this.serializer(data)).then((response: any) => {
      return this.deserializer(response)
    })
  }

  createDeadlineSubCategory(groupId: string, data: any) {
    return this.post(groupId, `${this.endpoint}sub_category/`, this.serializer(data)).then((response: any) => {
      return this.deserializer(response)
    })
  }

  createDeadlineCheck(groupId: string, data: any) {
    return this.post(groupId, `${this.endpoint}checks/`, this.serializer(data)).then((response: any) => {
      return this.deserializer(response)
    })
  }

  updateFlag(groupId: string, deadlineId: string, id: string, data: any) {
    return this.patch(groupId, this.endpoint + 'flags/' + deadlineId + '/' + id, data).then((response: any) => {
      return response
    })
  }

}
