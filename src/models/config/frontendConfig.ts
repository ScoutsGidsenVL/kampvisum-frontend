import Serializable from '../../interfaces/serializable'

export default class FrontendConfig implements Serializable<FrontendConfig> {
  baseUrl!: string
  logoutUrl!: string

  deserialize(input: any) {
    this.baseUrl = input.baseUrl
    this.logoutUrl = input.logoutUrl ? input.logoutUrl : 'https://login.scoutsengidsenvlaanderen.be/auth/realms/scouts/protocol/openid-connect/logout?client_id=groepsadmin-production-client&post_logout_redirect_uri='

    if (!this.baseUrl) {
      throw new Error('Config needs an baseUrl')
    }

    return this
  }
}
