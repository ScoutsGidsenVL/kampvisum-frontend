import { FileCheckDeserializer, FileCheckSerializer } from "@/serializer/FileCheck"
import { FileItem } from "@/serializer/FileItem"
import { BaseRepository } from "./baseRepository"


export class FileCheckRepository extends BaseRepository {
  id = '/FileCheck/'
  endpoint = '/checks/file/'
  public deserializer = FileCheckDeserializer
  public serializer = FileCheckSerializer

  update(groupID: string, url: string, data: FileItem[]) {
    return this.patch(groupID, url, this.serializer(data)).then((response: any) => {
      return this.deserializer(response)
    })
  }

  removeFileFromList(groupID: string, checkId: string, participantId: string): Promise<any> {
    return this.delete(groupID, `${this.endpoint}${checkId}/${participantId}`)
  }
}
