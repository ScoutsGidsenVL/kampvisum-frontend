import { Check } from "@/serializer/Check"
import { PostLocationDeserializer, PostLocationSerializer } from "@/serializer/PostLocation"
import { BaseRepository } from "./baseRepository"



export class LocationCheckRepository extends BaseRepository {
  id = '/LocationCheck/'
  endpoint = '/checks/'
  public deserializer = PostLocationDeserializer
  public serializer = PostLocationSerializer

  updateLocationCheck(url: string, data: any, parentLocations?: Array<any>, check?: Check) {
    let arr: Array<any> = []
    if (parentLocations) {
      parentLocations.forEach((p: any) => {
        if (data.id !== p.id) {
          arr.push({ id: p.id})
        }
      })
    }

    arr.push(this.serializer(data))

    return this.patch(url, { locations: arr }).then((response: any) => {
      return this.deserializer(response)
    })
  }

  updateLocationCheckRemove(url: string, parentLocations?: Array<any>) {
    return this.patch(url, { locations: parentLocations }).then((response: any) => {
      return this.deserializer(response)
    })
  }

  addSearched(url: string, parentLocations?: Array<any>) {
    let arr: Array<any> = []
    if (parentLocations) {
      parentLocations.forEach((p: any) => {
          arr.push({ id: p.id})
      })
    }

    return this.patch(url, { locations: arr }).then((response: any) => {
      return this.deserializer(response)
    })
  }
}




