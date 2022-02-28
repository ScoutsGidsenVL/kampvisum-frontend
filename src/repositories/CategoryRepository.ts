import { BaseRepository } from '@/repositories/baseRepository'
import { CategoryDeserializer, CategorySerializer } from '@/serializer/Category'

export class CategoryRepository extends BaseRepository {
  id = '/categoryRepo/'
  endpoint = '/visums_categories/'
  deserializer = CategoryDeserializer
  serializer = CategorySerializer
}
