import useGroupAndYears from '@/composable/useGroupAndYears';
import { BaseRepository } from '@/repositories/baseRepository';
import { FileDeserializer, FileItem } from '@/serializer/FileItem';

const { selectedGroup } = useGroupAndYears();

export class FileRepository extends BaseRepository {
  id = '/files/'
  endpoint = '/files/'
  deserializer = FileDeserializer
  serializer = null

  search(groupId: string, query: string): Promise<any> {
    return this.get(groupId, `/checks/file/search/?term=${query}`, {}).then((response: any) => {
      const array: any[] = []
      response.results.forEach((result: FileItem) => {
        result = this.deserializer(result)
        array.push(result)
      })
      return array
    })
  }

  public uploadFile(groupID: string, file: any): Promise<FileItem> {
    const fd = new FormData()
    fd.append('file', file)

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }
    return this.post(groupID, this.endpoint, fd, config).then((response: any) => {
      return FileDeserializer(response)
    }).catch((error: any) => {
      return error
    })
  }
}
