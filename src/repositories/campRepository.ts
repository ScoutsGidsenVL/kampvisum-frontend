import { CampDeserializer, CampSerializer } from '@/serializer/Camp'
import { BaseRepository } from '@/repositories/baseRepository'

export class CampRepository extends BaseRepository {
  id = '/camp/'
  endpoint = '/camps/'
  deserializer = CampDeserializer
  serializer = CampSerializer
}
