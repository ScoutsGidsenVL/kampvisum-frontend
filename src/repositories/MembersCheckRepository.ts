import { CommentCheckSerializer, CommentCheckDeserializer } from "../serializer/CommentCheck"
import { BaseRepository } from "./baseRepository"

export class CommentCheckRepository extends BaseRepository {
  id = '/CommentCheck/'
  endpoint = '/checks/'
  public deserializer = CommentCheckDeserializer
  public serializer = CommentCheckSerializer

  update(groupId: string, url: string, data: any) {
    return this.patch(groupId, url, this.serializer(data)).then((response: any) => {
      return this.deserializer(response)
    })
  }
}
