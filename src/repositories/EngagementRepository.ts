import { BaseRepository } from '@/repositories/baseRepository'
import { Approval, Engagement, EngagementDeserializer, Signature, SignatureSerializer } from '@/serializer/Engagement'
import { Visum } from '@/serializer/Visum'

export class EngagementRepository extends BaseRepository {
  id = '/engagement/'
  endpoint = 'visums/engagement/'
  deserializer = EngagementDeserializer
  serializer = EngagementDeserializer

  approveVisum(groupId: string, visum: Visum): Promise<any> {
    const data: Approval = { approved: true }
    return this.update(groupId, visum.id, data).then((response: Engagement) => {
      return response
    })
  }

  signVisum(groupId: string, engagement: Engagement): Promise<any> {
    return this.patch(groupId, this.endpoint + engagement.id + '/', undefined).then((response: any) => {
      return this.deserializer(response)
    })
  }
}
