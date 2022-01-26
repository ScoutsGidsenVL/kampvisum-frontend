import { Member } from "@/serializer/Member"
import { MemberCheckDeserializer, MemberCheckSerializer } from "@/serializer/MemberCheck"
import { BaseRepository } from "./baseRepository"


export class MemberCheckRepository extends BaseRepository {
  id = '/MemberCheck/'
  endpoint = '/checks/'
  public deserializer = MemberCheckDeserializer
  public serializer = MemberCheckSerializer

  update(url: string, data: Member[]) {
    return this.patch(url, this.serializer(data)).then((response: any) => {
      return this.deserializer(response.value)
    })
  }
}




