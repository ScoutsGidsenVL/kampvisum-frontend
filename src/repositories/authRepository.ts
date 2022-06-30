import UserModel from '../models/userModel'
import BaseApiRepository from './baseApiRepository'
import { useInternetHelper } from '../helpers/internetHelper'
import { useOfflineData } from '@/composable/useOfflineData'
import store from '../store/store'

export default class AuthRepository extends BaseApiRepository {
  id = 'auth'

  me(): Promise<UserModel> {
    const { isInternetActive } = useInternetHelper()
    const { updateMe, getMe } = useOfflineData()

    if (isInternetActive.value) {
      return this.get('/auth/me/').then((input: any) => {
        // updateMe(UserModel.deserialize(input))
        const user = UserModel.deserialize(input)
        // store.dispatch('setUser', user)
        return user
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
