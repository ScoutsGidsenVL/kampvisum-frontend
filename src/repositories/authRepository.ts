import UserModel from '../models/userModel'
import BaseApiRepository from './baseApiRepository'
import { useInternetHelper } from '../helpers/internetHelper'
import { useOfflineData } from '@/composable/useOfflineData'

export default class AuthRepository extends BaseApiRepository {
  id = 'auth'

  me(): Promise<UserModel> {
    const { isInternetActive } = useInternetHelper()
    const { updateMe, getMe } = useOfflineData()

    if (isInternetActive.value) {
      return this.get('/auth/me/').then((input: any) => {
        // updateMe(UserModel.deserialize(input))
        return UserModel.deserialize(input)
      })
    } else {
      return new Promise<UserModel>((resolve, reject): void => {
        getMe().then((result: any) => {
          resolve(result)
        })
      })
    }
    
  }
}
