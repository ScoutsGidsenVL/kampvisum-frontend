import { SectionDeserializer, SectionSerializer } from '@/serializer/Section'
import { BaseRepository } from '../repositories/baseRepository'

export class SectionsRepository extends BaseRepository {
  id = '/sections/'
  endpoint = '/sections/'
  deserializer = SectionDeserializer
  serializer = SectionSerializer
}
