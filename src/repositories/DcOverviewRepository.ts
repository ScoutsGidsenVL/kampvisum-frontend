import { BaseRepository } from '@/repositories/baseRepository'
import { DcOverviewDeserializer } from '@/serializer/DcOverview'

export class DcOverviewRepository extends BaseRepository {
  id = '/DcOverview/'
  endpoint = '/visums/'
  deserializer = DcOverviewDeserializer
  serializer = undefined

  //GETS ALL GROUPS FOR DC OVERVIEW, GROUP SET TO ANY TO JUST GET ALL
  getSingle(): Promise<any> {
    return this.get('any', `/visums/all`, {}).then((response: any) => {
      let result: Array<any> = []
      for (const [key, value] of Object.entries(response.results)) {
        if (value) {
          result.push({ groupAdminId: key, value: value })
        }
      }
      return result
    })
  }
}
