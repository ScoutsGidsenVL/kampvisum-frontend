import BaseApiRepository from '@/repositories/baseApiRepository'
import { ArrayResult } from '@/interfaces/ArrayResult'

export abstract class BaseRepository extends BaseApiRepository {
  abstract id: string
  abstract endpoint: string
  public abstract deserializer: any
  public abstract serializer: any

  private previous: string | null = null
  private next: string | null = ''

  getSingle(): Promise<any> {
    return this.get(this.endpoint, {}).then((response: any) => {
      return this.deserializer(response)
    })
  }

  getArray(pagination?: string): Promise<any> {
    return this.get(this.endpoint, {}).then((response: ArrayResult) => {
      const array: any[] = []
      response.results.forEach((result: any) => {
        array.push(this.deserializer(result))
      })
      return array
    })
  }

  getPrevious(): Promise<any> {
    return this.get(this.endpoint, {}).then((response: ArrayResult) => {
      const array: any[] = []
      response.results.forEach((result: any) => {
        array.push(this.deserializer(result))
      })
      return array
    })
  }

  getById(id: string): Promise<any> {
    return this.get(this.endpoint + id, {}).then((response: any) => {
      return this.deserializer(response)
    })
  }

  editById(id: string, data: any): Promise<any> {
    return this.put(this.endpoint + id, data).then((response: any) => {
      return this.deserializer(response)
    })
  }

  search(query: string): Promise<any> {
    return this.get(this.endpoint + '?term=' + query, {}).then((response: any[]) => {
      const array: any[] = []
      response.forEach((result: any) => {
        array.push(this.deserializer(result))
      })
      return array
    })
  }

  create(data: any) {
    return this.post(this.endpoint, this.serializer(data)).then((response: any) => {
      return this.deserializer(response)
    })
  }

  update(id: string, data: any) {
    return this.patch(this.endpoint + id + '/', this.serializer(data)).then((response: any) => {
      return this.deserializer(response)
    })
  }

  formatPaginationUrl = (url: string) => {
    return url
  }

  removeById(id: string | string[]): Promise<any> {
    return this.delete(this.endpoint + id)
  }

  public downloadFile(id: string): Promise<Blob> {
    return this.getFile(`${this.endpoint}${id}/`).then((res) => {
      return res
    })
  }
}

export interface draft {
  insurance_type: string
  data: any
}
