import { BaseRepository } from '@/repositories/baseRepository'
import { FourageMemberDeserializer, FourageMemberSerializer } from '@/serializer/FourageMember'

export class FourageRepository extends BaseRepository {
  id = '/fourage/'
  endpoint = '/non_members/'
  deserializer = FourageMemberDeserializer
  serializer = FourageMemberSerializer
}
