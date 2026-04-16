import { AxiosRequestConfig } from 'axios'

export class Interceptors {
  public static buildRequestTokenInterceptorCallback = (keycloak:any) => {
    return function (config: AxiosRequestConfig) {
      if (!config.headers) {
        config.headers = {}
      }
      config.headers['Authorization'] = `Bearer ${keycloak.token}`
      return config
    }
  }
}
