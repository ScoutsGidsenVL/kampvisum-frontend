import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import { Interceptors } from '../interceptors/Interceptors'
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

    // Interceptors
    this.axiosInstance.interceptors.request.use(
        Interceptors.buildRequestTokenInterceptorCallback(store.getters.keycloak)
    )
    
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && error.response.status === 401) {
          try {
            await store.getters.keycloak.updateToken(); // refresh the token
            const token = store.getters.keycloak.token;
            if (token) {
              // retry the failed request with the new token
              const config = error.config;
              config.headers.Authorization = `Bearer ${token}`;
              return this.axiosInstance(config);
            }
          } catch (e) {
            console.error('Failed to refresh token', e);
          }
        }
        return Promise.reject(error);
      }
    );
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

  protected async getAuth(endpoint: string, config: AxiosRequestConfig = {}, publicCall: Boolean = false): Promise<any> {
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

  protected async get(groupId: string, endpoint: string, config: AxiosRequestConfig = {}, publicCall: Boolean = false): Promise<any> {
    const instance = publicCall && !store.getters['openid/isLoggedIn'] ? this.publicAxiosInstance : this.axiosInstance
    return await instance
      .get(this.parseEndpoint(groupId, endpoint), config)
      .then(function (result: AxiosResponse) {
        isForbidden.value = false
        // Only return the data of response
        return result.data
      })
      .catch((error: any) => {
        return this.processError(error)
      })
  }

  protected post(groupId: string, endpoint: string, data: any, config: AxiosRequestConfig = {}): Promise<any> {
    return this.axiosInstance
      .post(this.parseEndpoint(groupId, endpoint), data, config)
      .then(function (result: AxiosResponse) {
        // Only return the data of response
        return result.data
      })
      .catch((error: any) => {
        return this.processError(error)
      })
  }

  protected postWithoutGroupId(endpoint: string, data: any, config: AxiosRequestConfig = {}): Promise<any> {
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

  protected patch(groupId: string, endpoint: string, data: any, config: AxiosRequestConfig = {}): Promise<any> {
    return this.axiosInstance
      .patch(this.parseEndpoint(groupId, endpoint), data, config)
      .then(function (result: AxiosResponse) {
        // Only return the data of response
        return result.data
      })
      .catch((error: any) => {
        return this.processError(error)
      })
  }

  protected put(endpoint: string, groupId: string, data: any, config: AxiosRequestConfig = {}): Promise<any> {
    return this.axiosInstance
      .put(this.parseEndpoint(groupId, endpoint), data, config)
      .then(function (result: AxiosResponse) {
        // Only return the data of response
        return result.data
      })
      .catch((error: any) => {
        return this.processError(error)
      })
  }

  protected delete(groupId: string, endpoint: string): Promise<any> {
    return this.axiosInstance
      .delete(this.parseEndpoint(groupId, endpoint))
      .then(function (result: AxiosResponse) {
        // Only return the data of response
        return result.data
      })
      .catch((error: any) => {
        return this.processError(error)
      })
  }

  protected softDelete(groupId: string, endpoint: string, data: any, config: AxiosRequestConfig = {}): Promise<any> {
    config.data = data

    return this.axiosInstance
      .delete(this.parseEndpoint(groupId, endpoint), config)
      .then(function (result: AxiosResponse) {
        // Only return the data of response
        return result.data
      })
      .catch((error: any) => {
        return this.processError(error)
      })
  }

  protected getFile(groupId: string, endpoint: string, config: AxiosRequestConfig = {}, publicCall: Boolean = false): Promise<any> {
    config = {
      ...config,
      responseType: 'blob',
    }
    const instance = publicCall && !store.getters['openid/isLoggedIn'] ? this.publicAxiosInstance : this.axiosInstance
    return instance
      .get(this.parseEndpoint(groupId, endpoint), config)
      .then(function (result: AxiosResponse) {
        // Only return the data of response
        return result.data
      })
      .catch((error: any) => {
        return this.processError(error)
      })
  }

  private parseEndpoint(groupId: string, endpoint: string): string {
    if (!endpoint.includes('?')) {
      return endpoint + '?group=' + groupId
    }

    if (!endpoint.includes('group')) {
      return endpoint + '&group=' + groupId
    }
    return endpoint
  }

  private processError(error: any): any {
    if (error.response?.data[0] && error.response?.data[0] === 'Je mag niet twee keer dezelfde kampverantwoordelijke opgeven.') {
      triggerNotification('Je mag niet twee keer dezelfde kampverantwoordelijke opgeven.', '#E00A1E')
      return true;
    }
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
