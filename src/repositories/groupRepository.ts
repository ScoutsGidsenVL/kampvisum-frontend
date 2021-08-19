import { GroupDeserializer, GroupSerializer } from '@/serializer/Group'
import { BaseRepository } from '@/repositories/baseRepository'

export class GroupRepository extends BaseRepository {
  id = '/groups/'
  endpoint = '/groups/'
  deserializer = GroupDeserializer
  serializer = GroupSerializer
}
