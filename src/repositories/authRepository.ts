import UserModel from '../models/userModel'
import BaseApiRepository from './baseApiRepository'
import { useInternetHelper } from '../helpers/internetHelper'
import { useOfflineData } from '@/composable/useOfflineData'
import useGroupAndYears from '@/composable/useGroupAndYears'

export default class AuthRepository extends BaseApiRepository {
  id = 'auth'

  me(): Promise<UserModel> {
    const { isInternetActive } = useInternetHelper()
    const { updateMe, getMe } = useOfflineData()

    if (isInternetActive.value) {
      return this.getAuth('/auth/me/').then((input: any) => {
        updateMe(UserModel.deserialize(input))
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

  // async logout(): Promise<void> {
  //   const { isInternetActive } = useInternetHelper()
  //   const { unsetSelectedGroup } = useGroupAndYears()

  //   if (isInternetActive.value) {
  //     return await this.getAuth('/auth/logout/').then((input: any) => {
  //       sessionStorage.removeItem('oidc-access-token')
  //       sessionStorage.removeItem('oidc-refresh-token')
  //       unsetSelectedGroup()
  //     })
  //   }
  //  }
}
