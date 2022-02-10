import { Member, MemberDeserializer, MemberSerializer } from '@/serializer/Member'
import { BaseRepository } from '../repositories/baseRepository'

export class SectionsRepository extends BaseRepository {
  id = '/sections/'
  endpoint = '/sections/'
  deserializer = MemberDeserializer
  serializer = MemberSerializer
}
