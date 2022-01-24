import { BaseRepository } from '@/repositories/baseRepository'
import { FileDeserializer, FileItem } from '@/serializer/FileItem'

export class FileRepository extends BaseRepository {
  id = '/files/'
  endpoint = '/files/'
  deserializer = FileDeserializer
  serializer =  null

  public uploadFile(file: any): Promise<FileItem> {
    const fd = new FormData()
    fd.append('file', file)

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }
    return this.post(this.endpoint, fd, config).then((response: any) => {
      return FileDeserializer(response)
    })
  }
}
