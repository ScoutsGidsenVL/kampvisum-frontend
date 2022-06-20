import { useInternetHelper } from '@/helpers/internetHelper'
import axios, { AxiosResponse } from 'axios'

export default class StaticFileRepository {
  public getFile(fileUrl: string): Promise<any> {
    const { isInternetActive } = useInternetHelper()

    if (isInternetActive.value) {
      return axios.get(process.env.BASE_URL + fileUrl).then(function (result: AxiosResponse) {
        return result.data
      })
    } else {
      if (fileUrl === 'config.json') {
        return new Promise<any>((resolve, reject): void => {
          const config = {
            "frontend": {
                "baseUrl": "https://kamp-acc.scoutsengidsenvlaanderen.be"
            },
            "api": {
                "baseUrl": "https://kamp-acc.scoutsengidsenvlaanderen.be",
                "apiSuffix": "api/"
            },
            "oidc": {
                "baseUrl": "https://login.scoutsengidsenvlaanderen.be/auth/realms/scouts",
                "serverBaseUrl": "/api/oidc",
                "authEndpoint": "protocol/openid-connect/auth",
                "logoutEndpoint": "protocol/openid-connect/logout",
                "clientId": "kampvisum"
            }
        }
          resolve(config)
        })
      } else {
        return new Promise((resolve) => {
          resolve({})
        })
      }
    }
    
  }
}
