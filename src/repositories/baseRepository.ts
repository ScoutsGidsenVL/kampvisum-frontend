import BaseApiRepository from '@/repositories/baseApiRepository'
import { ArrayResult } from '@/interfaces/ArrayResult'
import { Filter } from '@/serializer/Filter'

export abstract class BaseRepository extends BaseApiRepository {
  abstract id: string
  abstract endpoint: string
  public abstract deserializer: any
  public abstract serializer: any

  private previous: string | null = null
  private next: string | null = ''

  getSingle(groupId: string): Promise<any> {
    return this.get(groupId, this.endpoint, {}).then((response: any) => {
      return this.deserializer(response)
    })
  }

  getArray(groupId: string, pagination?: string): Promise<any> {
    return this.get(groupId, this.endpoint, {}).then((response: ArrayResult) => {
      const array: any[] = []
      response.results.forEach((result: any) => {
        array.push(this.deserializer(result))
      })
      return array
    })
  }

  getPrevious(groupId: string): Promise<any> {
    return this.get(groupId, this.endpoint, {}).then((response: ArrayResult) => {
      const array: any[] = []
      response.results.forEach((result: any) => {
        array.push(this.deserializer(result))
      })
      return array
    })
  }

  getById(groupId: string, id: string): Promise<any> {
    return this.get(groupId, this.endpoint + id, {}).then((response: any) => {
      return response
    })
  }

  editById(groupId: string, id: string, data: any): Promise<any> {
    return this.put(groupId, this.endpoint + id, data).then((response: any) => {
      return this.deserializer(response)
    })
  }

  search(groupId: string, query: string, filter?: Filter): Promise<any> {
    return this.get(groupId, this.endpoint + '?term=' + query, {}).then((response: any[]) => {
      const array: any[] = []
      response.forEach((result: any) => {
        array.push(this.deserializer(result))
      })
      return array
    })
  }

  create(groupId: string, data: any) {
    return this.post(groupId, this.endpoint, this.serializer(data)).then((response: any) => {
      return this.deserializer(response)
    })
  }

  update(groupId: string, id: string, data: any) {
    return this.patch(groupId, this.endpoint + id + '/', this.serializer(data)).then((response: any) => {
      return this.deserializer(response)
    })
  }

  formatPaginationUrl = (url: string) => {
    return url
  }

  removeById(groupId: string, id: string | string[]): Promise<any> {
    return this.delete(groupId, this.endpoint + id)
  }

  softRemove(groupId: string, url: string, data: any) {
    return this.softDelete(groupId, url, this.serializer(data)).then((response: any) => {
      return this.deserializer(response)
    })
  }

  public downloadFile(groupId: string, id: string): Promise<Blob> {
    return this.getFile(groupId, `${this.endpoint}${id}/`).then((res) => {
      return res
    })
  }
}

export interface draft {
  insurance_type: string
  data: any
}
