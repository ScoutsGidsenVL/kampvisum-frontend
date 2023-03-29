import { AxiosRequestConfig } from 'axios'

export class Interceptors {
  public static buildRequestTokenInterceptorCallback = (keycloak:any) => {
    return function (config: AxiosRequestConfig) {
      const authorization = 'Authorization'
      config.headers.common[authorization] = `Bearer ${keycloak.token}`
      return config
    }
  }
}
