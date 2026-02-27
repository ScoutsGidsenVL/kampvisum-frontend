import { SelectCheckSerializer, SelectCheckDeserializer } from '../serializer/SelectCheck'
import { BaseRepository } from './baseRepository'

export class SelectCheckRepository extends BaseRepository {
  id = '/SelectCheck/'
  endpoint = '/checks/'
  public deserializer = SelectCheckDeserializer
  public serializer = SelectCheckSerializer

  update(groupId: string, url: string, data: any) {
    return this.patch(groupId, url, this.serializer(data)).then((response: any) => {
      return this.deserializer(response)
    })
  }
}
