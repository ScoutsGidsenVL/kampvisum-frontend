import { Member, MemberDeserializer, MemberSerializer } from '@/serializer/Member'
import { BaseRepository } from '@/repositories/baseRepository'
import { Filter } from '@/serializer/Filter'
import useGroupAndYears from '@/composable/useGroupAndYears'

const { selectedGroup } = useGroupAndYears()

export class ParticipantRepository extends BaseRepository {
  id = '/participant/'
  endpoint = '/participants/'
  deserializer = MemberDeserializer
  serializer = MemberSerializer

  search(query: string, group?: string, filter?: Filter): Promise<any> {
    return this.get(`${this.endpoint}?term=${query}${(group ? `/${group}` : '')}${filter && filter.gender ? '&gender=' + filter.gender : ''}${filter && filter.ageMin ? `&min_age=${filter.ageMin}` : ''}${filter && filter.ageMax ? `&max_age=${filter.ageMax}` : ''}${filter && filter.type ? `&type=${filter.type}` : ''}&group=${selectedGroup.value.groupAdminId}`, {}).then((response: any) => {
      const array: any[] = []
      response.results.forEach((result: Member) => {
        result = MemberDeserializer(result)
        array.push(result)
      })
      return array
    })
  }
}
