import Serializable from '../../interfaces/serializable'

export default class FrontendConfig implements Serializable<FrontendConfig> {
  baseUrl!: string
  logoutUrl!: string

  deserialize(input: any) {
    this.baseUrl = input.baseUrl
    this.logoutUrl = input.logoutUrl

    if (!this.baseUrl) {
      throw new Error('Config needs an baseUrl')
    }

    return this
  }
}
