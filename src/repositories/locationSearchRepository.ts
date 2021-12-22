import { BaseRepository } from '@/repositories/baseRepository'
import { SearchedLocationDeserializer } from '@/serializer/SearchedLocation'
import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import { SearchedLocation } from '../serializer/SearchedLocation'

export class LocationSearchRepository extends BaseRepository {
  id = '/location-search/'
  endpoint = '/api/?q='
  deserializer = undefined
  serializer = undefined

  // https://nominatim.openstreetmap.org/search/DORP%STRAAT%20dNUMMER?format=json
  //https://photon.komoot.io/api/?q=berlin

  private axiosInstanceLocation = axios.create({
    baseURL: 'https://photon.komoot.io',
  })

  protected searchLocation(endpoint: string, data: any, config: AxiosRequestConfig = {}): Promise<any> {
    return this.axiosInstanceLocation
      .get(endpoint, data)
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
    return this.searchLocation(this.endpoint + query + '&limit=5', {}).then((response: { features:Array<any> }) => {
      const searchedResult  = SearchedLocationDeserializer(response.features[0])
      return searchedResult
    })
  }

}
