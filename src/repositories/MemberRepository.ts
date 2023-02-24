import useGroupAndYears from '@/composable/useGroupAndYears'
import { Filter } from '@/serializer/Filter'
import { Member, MemberDeserializer, MemberSerializer } from '@/serializer/Member'
import { BaseRepository } from '../repositories/baseRepository'

const { selectedGroup } = useGroupAndYears()

export class MemberRepository extends BaseRepository {
  id = '/member/'
  endpoint = '/participants/members/'
  deserializer = MemberDeserializer
  serializer = MemberSerializer

  search(groupId: string, query: string, filter?: Filter): Promise<any> {
    return this.get(groupId, `${this.endpoint}all/?term=${query}${filter && filter.gender ? '&gender=' + filter.gender : ''}${filter && filter.ageMin ? `&min_age=${filter.ageMin}` : ''}${filter && filter.ageMax ? `&max_age=${filter.ageMax}` : ''}${filter && filter.type ? `&type=${filter.type}` : ''}`, {}).then((response: any) => {
      const array: any[] = []
      response.forEach((result: Member) => {
        result = MemberDeserializer(result)
        array.push(result)
      })
      return array
    })
  }
}
