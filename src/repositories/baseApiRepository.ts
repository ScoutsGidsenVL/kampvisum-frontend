import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import { OpenIdConnectInterceptors } from 'inuits-vuejs-oidc'
import MasterConfig from '../models/config/masterConfig'
import store from '@/store/store'
import { useNotification } from '../composable/useNotification'
const { triggerNotification, isForbidden } = useNotification()

export default abstract class BaseApiRepository {
  private axiosInstance: AxiosInstance
  private publicAxiosInstance: AxiosInstance
  abstract id: string
  private baseUrl: string

  constructor() {
    // const config: MasterConfig = getModule(configModule, store).config
    const config: MasterConfig = store.getters.config
    this.baseUrl = `${config.api.baseUrl}/${config.api.apiSuffix}`

    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
    })
    this.publicAxiosInstance = axios.create({
      baseURL: this.baseUrl,
    })

    // Add oidc interceptors
    if (config.oidc && config.oidc.clientId) {
      this.axiosInstance.interceptors.request.use(
        // @ts-ignore
        OpenIdConnectInterceptors.buildRequestTokenInterceptorCallback(store)
      )

      this.axiosInstance.interceptors.response.use(
        function (response) {
          return response
        },
        (error) => OpenIdConnectInterceptors.buildResponseErrorInterceptorCallback(error, store,this.axiosInstance)
      )
    }
  }

  getMinioFile(minioUrl: string) {
    const instance = this.axiosInstance
    return instance
      .get(minioUrl)
      .then(function (result: AxiosResponse) {
        // Only return the data of response
        return result.data
      })
      .catch((error: any) => {
        return this.processError(error)
      })
  }

  protected async get(endpoint: string, config: AxiosRequestConfig = {}, publicCall: Boolean = false): Promise<any> {
    const instance = publicCall && !store.getters['openid/isLoggedIn'] ? this.publicAxiosInstance : this.axiosInstance
    return await instance
      .get(endpoint, config)
      .then(function (result: AxiosResponse) {
        isForbidden.value = false
        // Only return the data of response
        return result.data
      })
      .catch((error: any) => {
        return this.processError(error)
      })
  }

  protected post(endpoint: string, data: any, config: AxiosRequestConfig = {}): Promise<any> {
    return this.axiosInstance
      .post(endpoint, data, config)
      .then(function (result: AxiosResponse) {
        // Only return the data of response
        return result.data
      })
      .catch((error: any) => {
        return this.processError(error)
      })
  }

  protected patch(endpoint: string, data: any, config: AxiosRequestConfig = {}): Promise<any> {
    return this.axiosInstance
      .patch(endpoint, data, config)
      .then(function (result: AxiosResponse) {
        // Only return the data of response
        return result.data
      })
      .catch((error: any) => {
        return this.processError(error)
      })
  }

  protected put(endpoint: string, data: any, config: AxiosRequestConfig = {}): Promise<any> {
    return this.axiosInstance
      .put(endpoint, data, config)
      .then(function (result: AxiosResponse) {
        // Only return the data of response
        return result.data
      })
      .catch((error: any) => {
        return this.processError(error)
      })
  }

  protected delete(endpoint: string): Promise<any> {
    return this.axiosInstance
      .delete(endpoint)
      .then(function (result: AxiosResponse) {
        // Only return the data of response
        return result.data
      })
      .catch((error: any) => {
        return this.processError(error)
      })
  }

  protected softDelete(endpoint: string, data: any, config: AxiosRequestConfig = {}): Promise<any> {
    config.data = data

    return this.axiosInstance
      .delete(endpoint, config)
      .then(function (result: AxiosResponse) {
        // Only return the data of response
        return result.data
      })
      .catch((error: any) => {
        return this.processError(error)
      })
  }

  protected getFile(endpoint: string, config: AxiosRequestConfig = {}, publicCall: Boolean = false): Promise<any> {
    config = {
      ...config,
      responseType: 'blob',
    }
    const instance = publicCall && !store.getters['openid/isLoggedIn'] ? this.publicAxiosInstance : this.axiosInstance
    return instance
      .get(endpoint, config)
      .then(function (result: AxiosResponse) {
        // Only return the data of response
        return result.data
      })
      .catch((error: any) => {
        return this.processError(error)
      })
  }

  private processError(error: any): any {
    if (error.response?.data?.file) { 
      triggerNotification(error.response.data.file[0])
    }
    if (error.response.status === 403) {
      isForbidden.value = true
    }
    if (error.response.data[0] === 'DC can only sign after leaders and group leaders have signed') {
      triggerNotification('DC can only sign after leaders and group leaders have signed')
      return true
    }
  }
}
