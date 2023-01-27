import { Member } from "@/serializer/Member"
import { ParticipantCheckDeserializer, ParticipantCheckSerializer } from "@/serializer/ParticipitantCheck"
import { BaseRepository } from "./baseRepository"


export class ParticipantCheckRepository extends BaseRepository {
  id = '/ParticipitantCheck/'
  endpoint = '/checks/participant/'
  public deserializer = ParticipantCheckDeserializer
  public serializer = ParticipantCheckSerializer

  update(url: string, members: Member[]) {
    return this.patch(url, this.serializer(members)).then((response: any) => {
      if (response.value) {
        return this.deserializer(response.value);
      }
      return false;
    })
  }

  removeParticipantFromList(checkId: string, participantId: string): Promise<any> {
    return this.delete(`${this.endpoint}${checkId}/${participantId}`)
  }

  toggleHasPaid(checkId: string, wrapperParticipantId: string) {
    return this.patch(`${this.endpoint}${checkId}/${wrapperParticipantId}`, {}).then((response: any) => {
      return this.deserializer(response.value)
    })
  }
}




