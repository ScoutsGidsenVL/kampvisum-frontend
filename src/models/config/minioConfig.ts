import Serializable from '../../interfaces/serializable'

export default class MinioConfig implements Serializable<MinioConfig> {
  baseUrl!: string
  storageBucketName!: string

  deserialize(input: any) {
    this.baseUrl = input.baseUrl
    this.storageBucketName = input.storageBucketName

    if (!this.baseUrl) {
      throw new Error('Config needs an baseUrl')
    }

    if (!this.storageBucketName) {
      throw new Error('Config needs an storageBucketName')
    }

    return this
  }
}