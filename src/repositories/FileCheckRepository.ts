import { FileCheckDeserializer, FileCheckSerializer } from "@/serializer/FileCheck"
import { FileItem } from "@/serializer/FileItem"
import { BaseRepository } from "./baseRepository"


export class FileCheckRepository extends BaseRepository {
  id = '/FileCheck/'
  endpoint = '/checks/file/'
  public deserializer = FileCheckDeserializer
  public serializer = FileCheckSerializer

  update(url: string, data: FileItem[]) {
    return this.patch(url, this.serializer(data)).then((response: any) => {
      return this.deserializer(response)
    })
  }

  removeFileFromList(checkId: string, participantId: string): Promise<any> {
    return this.delete(`${this.endpoint}${checkId}/${participantId}`)
  }
}
