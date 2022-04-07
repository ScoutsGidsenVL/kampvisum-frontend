import { BaseRepository } from '@/repositories/baseRepository'
import { Approval, Engagement, EngagementDeserializer, Signature, SignatureSerializer } from '@/serializer/Engagement'
import { Visum } from '@/serializer/Visum'

export class EngagementRepository extends BaseRepository {
  id = '/engagement/'
  endpoint = 'visums/engagement/'
  deserializer = EngagementDeserializer
  serializer = EngagementDeserializer

  approveVisum(visum: Visum): Promise<any> {
    const data: Approval = { approved: true }
    return this.update(visum.id, data).then((response: Engagement) => {
      console.log('Response Engagement Approval: ', response)
      return response
    })
  }


  signVisum(visum: Visum): Promise<any> {
    const data: Signature = {
      leaders: { groupAdminId: '' },
      groupLeaders: {},
      districtCommisioner: {}
    }

    return this.update(visum.id, SignatureSerializer(data)).then((response: Engagement) => {
      console.log('Response Engagement Signature: ', response)
      return response
    })
  }

}
