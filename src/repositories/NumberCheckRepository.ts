import { NumberCheckDeserializer, NumberCheckSerializer } from "@/serializer/NumberCheck"
import { BaseRepository } from "./baseRepository"

export class NumberCheckRepository extends BaseRepository {
  id = '/NumberCheck/'
  endpoint = '/checks/'
  public deserializer = NumberCheckDeserializer
  public serializer = NumberCheckSerializer

  update(url: string, data: any) {
    return this.patch(url, this.serializer(data)).then((response: any) => {
      return this.deserializer(response)
    })
  }
}
