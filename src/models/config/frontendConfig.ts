import Serializable from '../../interfaces/serializable'

export default class FrontendConfig implements Serializable<FrontendConfig> {
  baseUrl!: string

  deserialize(input: any) {
    this.baseUrl = input.baseUrl

    if (!this.baseUrl) {
      throw new Error('Config needs an api baseUrl')
    }

    return this
  }
}
