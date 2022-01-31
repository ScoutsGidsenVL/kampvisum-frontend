import { BaseRepository } from '@/repositories/baseRepository'
import { Member, MemberDeserializer, MemberSerializer } from '@/serializer/Member'

export class ParticipantRepository extends BaseRepository {
  id = '/participant/'
  endpoint = '/participant/'
  searchEndpoint = '/participants/'
  deserializer = MemberDeserializer
  serializer = MemberSerializer

  search(query: string, group?: string): Promise<any> {
    return this.get(`${this.searchEndpoint}?term=${query}${(group ? `/${group}` : '')}`, {}).then((response: Array<any>) => {
      const array: any[] = []

      response.forEach((result: Member) => {
        result = MemberDeserializer(result)
        array.push(result)
      })
      console.log('arr: ', array)
      return array
    })
  }
}
