import { Member } from "@/serializer/Member"
import { ParticipantCheckDeserializer, ParticipantCheckSerializer } from "@/serializer/ParticipitantCheck"
import { BaseRepository } from "./baseRepository"


export class ParticipantCheckRepository extends BaseRepository {
  id = '/ParticipitantCheck/'
  endpoint = '/checks/participant/'
  public deserializer = ParticipantCheckDeserializer
  public serializer = ParticipantCheckSerializer

  update(groupId: string, url: string, members: Member[]) {
    return this.patch(groupId, url, this.serializer(members)).then((response: any) => {
      if (response.value) {
        return this.deserializer(response.value);
      }
      return false;
    })
  }

  removeParticipantFromList(groupId: string, checkId: string, participantId: string): Promise<any> {
    return this.delete(groupId, `${this.endpoint}${checkId}/${participantId}`)
  }

  toggleHasPaid(groupId: string, checkId: string, wrapperParticipantId: string) {
    return this.patch(groupId, `${this.endpoint}${checkId}/${wrapperParticipantId}`, {}).then((response: any) => {
      return this.deserializer(response.value)
    })
  }
}




