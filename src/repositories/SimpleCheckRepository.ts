import { SimpleCheckDeserializer, SimpleCheckSerializer } from "@/serializer/SimpleCheck"
import { BaseRepository } from "./baseRepository"


export class SimpleCheckRepository extends BaseRepository {
  id = '/SimpleCheck/'
  endpoint = '/checks/'
  deserializer = SimpleCheckDeserializer
  serializer = SimpleCheckSerializer

  update(url: string, data: any) {
    return this.patch(url, this.serializer(data)).then((response: any) => {
      return this.deserializer(response)
    })
  }
}




