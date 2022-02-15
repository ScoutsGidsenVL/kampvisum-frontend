import { PostLocationDeserializer, PostLocationSerializer } from "@/serializer/PostLocation"
import { BaseRepository } from "./baseRepository"



export class LocationCheckRepository extends BaseRepository {
  id = '/LocationCheck/'
  endpoint = '/checks/'
  public deserializer = PostLocationDeserializer
  public serializer = PostLocationSerializer

  updateLocationCheck(url: string, data: any, parentLocations: Array<any>) {
    let arr: Array<any> = []
    console.log('PARENT LOCS: ', parentLocations)
    parentLocations.forEach((p: any) => {
      arr.push({ id: p.id})
    })
    console.log('ARR 1: ', arr)
    arr.push(this.serializer(data))
    console.log('ARR 2: ', arr)
    return this.patch(url, { value: arr }).then((response: any) => {
      return this.deserializer(response)
    })
  }
}




