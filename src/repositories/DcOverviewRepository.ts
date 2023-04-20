import { BaseRepository } from '@/repositories/baseRepository'
import { DcOverviewDeserializer } from '@/serializer/DcOverview'

export class DcOverviewRepository extends BaseRepository {
  id = '/DcOverview/'
  endpoint = '/visums/'
  deserializer = DcOverviewDeserializer
  serializer = undefined

  //GETS ALL GROUPS FOR DC OVERVIEW, GROUP SET TO ANY TO JUST GET ALL
  getSingle(year: string): Promise<any> {
    return this.get(`any&year=${year}`, `/visums/all`, {}).then((response: any) => {
      console.log('results', response.results);
      return response.results
    })
  }
}
