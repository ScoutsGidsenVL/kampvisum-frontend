import useGroupAndYears from '@/composable/useGroupAndYears'
import { BaseRepository } from '@/repositories/baseRepository'
import { SearchedLocationDeserializer } from '@/serializer/SearchedLocation'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { SearchedLocation } from '../serializer/SearchedLocation'

const { selectedGroup } = useGroupAndYears()

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

  search(query: string): Promise<SearchedLocation[]> {
    return this.searchLocation(this.endpoint + query + '&limit=4' + '&lang=en', {}).then((response: { features:Array<any> }) => {
      return response.features.map( x => SearchedLocationDeserializer(x))
    })
  }

  reverseSearch(latLng: { lat: number, lng: number}, config: AxiosRequestConfig = {}): Promise<any> {
    return this.axiosInstanceLocation
      .get(`/reverse?lon=${latLng.lng}&lat=${latLng.lat}`, {})
      .then(function (result: AxiosResponse) {
        // Only return the data of response
        return SearchedLocationDeserializer(result.data.features[0])
      })
      .catch((error: any) => {
        return this.processErrorLoc(error)
      })
  }
  

  searchExistingLocation(query: string): Promise<any> {
    return this.get(`?term=${query}&group=${selectedGroup.value.groupAdminId}`, {}).then((response: any) => {
      const array: any[] = []
      response.results.forEach((result: any) => {
        // result = MemberDeserializer(result)
        array.push(result)
      })
      return array
    })
  }
}
