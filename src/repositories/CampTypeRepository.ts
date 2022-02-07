import { BaseRepository } from '@/repositories/baseRepository'
import { CampTypeDeserializer, CampTypeSerializer } from '@/serializer/CampType'

export class CampTypeRepository extends BaseRepository {
  id = '/campTypes/'
  endpoint = '/camp_types/'
  deserializer = CampTypeDeserializer
  serializer = CampTypeSerializer
}
