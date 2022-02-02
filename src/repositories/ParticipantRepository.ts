import { BaseRepository } from '@/repositories/baseRepository'
import { Member, MemberDeserializer, MemberSerializer } from '@/serializer/Member'

export class ParticipantRepository extends BaseRepository {
  id = '/participant/'
  endpoint = '/participants/'
  deserializer = MemberDeserializer
  serializer = MemberSerializer

  search(query: string, group?: string): Promise<any> {
    return this.get(`${this.endpoint}?term=${query}${(group ? `/${group}` : '')}`, {}).then((response: any) => {
      const array: any[] = []

      response.results.forEach((result: Member) => {
        result = MemberDeserializer(result)
        array.push(result)
      })
      console.log('arr: ', array)
      return array
    })
  }
}
