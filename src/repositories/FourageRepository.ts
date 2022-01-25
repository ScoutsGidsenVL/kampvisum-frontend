import { BaseRepository } from '@/repositories/baseRepository'
import { FourageMember, FourageMemberDeserializer, FourageMemberSerializer } from '@/serializer/FourageMember'

export class FourageRepository extends BaseRepository {
  id = '/fourage/'
  endpoint = '/non_members/'
  searchEndpoint = '/people/'
  deserializer = FourageMemberDeserializer
  serializer = FourageMemberSerializer


  search(query: string, group?: string): Promise<any> {
    return this.get(`${this.searchEndpoint}?term=${query}${(group ? `/${group}` : '')}`, {}).then((response: Array<any>) => {
      const array: any[] = []
      response.forEach((result: FourageMember) => {
        result = FourageMemberDeserializer(result)
        array.push(result)
      })
      return array
    })
  }

}
