import { SimpleCheckDeserializer, SimpleCheckSerializer } from "@/serializer/SimpleCheck"
import { BaseRepository } from "./baseRepository"


export class SimpleCheckRepository extends BaseRepository {
  id = '/SimpleCheck/'
  endpoint = '/checks/'
  public deserializer = SimpleCheckDeserializer
  public serializer = SimpleCheckSerializer

  update(groupId: string, url: string, data: any) {
    return this.patch(groupId, url, this.serializer(data)).then((response: any) => {
      return this.deserializer(response)
    })
  }
}




