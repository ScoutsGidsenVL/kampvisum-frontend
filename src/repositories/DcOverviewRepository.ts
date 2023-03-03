import { BaseRepository } from '@/repositories/baseRepository'
import { DcOverviewDeserializer } from '@/serializer/DcOverview'

export class DcOverviewRepository extends BaseRepository {
  id = '/DcOverview/'
  endpoint = '/dc_coverview/'
  deserializer = DcOverviewDeserializer
  serializer = undefined
}
