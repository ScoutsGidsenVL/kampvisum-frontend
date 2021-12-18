import { BaseRepository } from '@/repositories/baseRepository'
import { SearchedLocationDeserializer } from '@/serializer/SearchedLocation'
import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import { SearchedLocation } from '../serializer/SearchedLocation'

export class LocationSearchRepository extends BaseRepository {
  id = '/location-search/'
  endpoint = '/search/'
  deserializer = undefined
  serializer = undefined

  // https://nominatim.openstreetmap.org/search/DORP%STRAAT%20dNUMMER?format=json

  private axiosInstanceLocation = axios.create({
    baseURL: 'https://nominatim.openstreetmap.org',
  })

  protected searchLocation(endpoint: string, data: any, config: AxiosRequestConfig = {}): Promise<any> {
    return this.axiosInstanceLocation
      .post(endpoint, data, config)
      .then(function (result: AxiosResponse) {
        // Only return the data of response
        return result.data
      })
      .catch((error: any) => {
        return this.processErrorLoc(error)
      })
  }

  private processErrorLoc(error: any): void {}

  search(query: string): Promise<SearchedLocation> {
    return this.searchLocation(this.endpoint + query + '?format=json', {}).then((response: Array<any>) => {
      const searchedResult  = SearchedLocationDeserializer(response[0])
      return searchedResult
    })
  }

}
