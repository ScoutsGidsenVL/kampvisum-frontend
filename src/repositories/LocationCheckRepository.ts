import { LocationSerializer } from "@/serializer/Location"
import { PostLocationDeserializer, PostLocationSerializer } from "@/serializer/PostLocation"
import { BaseRepository } from "./baseRepository"



export class LocationCheckRepository extends BaseRepository {
  id = '/LocationCheck/'
  endpoint = '/checks/'
  public deserializer = PostLocationDeserializer
  public serializer = PostLocationSerializer

  update(url: string, data: any) {
    return this.patch(url, [this.serializer(data)]).then((response: any) => {
      return this.deserializer(response)
    })
  }
}




