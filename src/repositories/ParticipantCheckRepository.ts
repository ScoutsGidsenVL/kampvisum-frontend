import { Member } from "@/serializer/Member"
import { ParticipantCheckDeserializer, ParticipantCheckSerializer } from "@/serializer/ParticipitantCheck"
import { BaseRepository } from "./baseRepository"


export class ParticipantCheckRepository extends BaseRepository {
  id = '/ParticipitantCheck/'
  endpoint = '/checks/'
  public deserializer = ParticipantCheckDeserializer
  public serializer = ParticipantCheckSerializer

  update(url: string, data: Member[]) {
    return this.patch(url, this.serializer(data)).then((response: any) => {
      return this.deserializer(response.value)
    })
  }
}




