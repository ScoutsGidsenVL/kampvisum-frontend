import MasterConfig from '@/models/config/masterConfig';
import { BaseRepository } from '@/repositories/baseRepository';
import { FileDeserializer, FileItem } from '@/serializer/FileItem';
import store from '@/store/store'
import axios from 'axios'
export interface PresignedPost {
  "url": string,
  "directory_path": string,
  "original_name": string,
  "fields": {
    "key": string,
    "x-amz-algorithm": string,
    "x-amz-credential": string,
    "x-amz-date": string,
    "policy": string,
    "x-amz-signature": string
  }
}

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

  getBase = (): string => {
    const config: MasterConfig = store.getters.config
    return `${config.minio.baseUrl}/${config.minio.storageBucketName}`
  }

  getPresignedPost = async (fileName: string): Promise<PresignedPost> => {
    return this.postWithoutGroupId('files/s3/presigned_url_post', { name: fileName })
  }

  uploadToPresignedPost = async (formData: FormData): Promise<any> => {
    return await axios.post(`${this.getBase()}`, formData);
  }

  //FUNCTION TO COUPLE IT TOWARDS A CHECK

  public uploadFile = async (groupID: string, file: any): Promise<FileItem> => {
    const presignedPost = await this.getPresignedPost(file.name)
    const presignedFormData = new FormData()
    presignedFormData.append('file', file)
    presignedFormData.append('key', presignedPost.fields.key)
    presignedFormData.append('x-amz-algorithm', presignedPost.fields['x-amz-algorithm'])
    presignedFormData.append('x-amz-credential', presignedPost.fields['x-amz-credential'])
    presignedFormData.append('x-amz-date', presignedPost.fields['x-amz-date'])
    presignedFormData.append('policy', presignedPost.fields.policy)
    presignedFormData.append('x-amz-signature', presignedPost.fields['x-amz-signature'])

    await this.uploadToPresignedPost(presignedFormData)

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }

    const fd = new FormData()
    fd.append('file', file)
    fd.append('directory_path', presignedPost.directory_path)
    fd.append('original_name', presignedPost.original_name)

    return this.post(groupID, this.endpoint, fd, config).then((response: any) => {
      return FileDeserializer(response)
    }).catch((error: any) => {
      return error
    })
  }
}
