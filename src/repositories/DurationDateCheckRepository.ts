import { DurationDateCheckDeserializer, DurationDateCheckSerializer } from "@/serializer/DurationDateCheck"
import { BaseRepository } from "./baseRepository"

export class DurationDateCheckRepository extends BaseRepository {
  id = '/DurationCheck/'
  endpoint = '/checks/'
  public deserializer = DurationDateCheckDeserializer
  public serializer = DurationDateCheckSerializer

  update(groupId: string, url: string, data: any) {
    return this.patch(groupId, url, this.serializer(data)).then((response: any) => {
      return this.deserializer(response)
    })
  }
}




