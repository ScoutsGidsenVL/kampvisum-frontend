import UserModel from '../models/userModel'
import BaseApiRepository from './baseApiRepository'
import { useInternetHelper } from '../helpers/internetHelper'

export default class AuthRepository extends BaseApiRepository {
  id = 'auth'

  me(): Promise<UserModel> {
    const { isInternetActive } = useInternetHelper()

    if (isInternetActive.value) {
      return this.get('/auth/me/').then((input: any) => {
        console.log('OUTPUT: ', UserModel.deserialize(input))
        return UserModel.deserialize(input)
      })
    } else {
      return new Promise<UserModel>((resolve, reject): void => {
        const user = {
          "id": "5b4bda13-df27-45f6-bd9c-d7d22a5f7d07",
          "user_permissions": [
              "visums.edit_visum",
              "visums.view_visum_feedback",
              "visums.list_visum",
              "visums.view_visum",
              "visums.view_visum_approval"
          ],
          "scouts_groups": [
              {
                  "group_admin_id": "X9002G",
                  "name": "Testgroep voor .be-site",
                  "full_name": "Testgroep voor .be-site X9002G",
                  "type": "Test",
                  "is_section_leader": true,
                  "is_group_leader": true,
                  "is_district_commissioner": false
              }
          ],
          "scouts_functions": [
              {
                  "group_admin_id": "d5f75b320b812440010b81255456034c",
                  "scouts_groups": [
                      "X9002G"
                  ],
                  "code": "AGRL",
                  "description": "Adjunct Groepsleiding",
                  "is_leader": true,
                  "is_group_leader": true,
                  "is_district_commissioner": false,
                  "end": null
              },
              {
                  "group_admin_id": "d5f75b320b812440010b812555cc039e",
                  "scouts_groups": [
                      "X9002G"
                  ],
                  "code": "JGVL",
                  "description": "Jonggidsen-Jongverkennerleiding",
                  "is_leader": true,
                  "is_group_leader": false,
                  "is_district_commissioner": false,
                  "end": null
              }
          ],
          "is_superuser": false,
          "username": "ricardo.acosta",
          "first_name": "Ricardo",
          "last_name": "Acosta Torres",
          "email": "ricardo@inuits.eu",
          "is_staff": false,
          "is_active": true,
          "date_joined": "2022-04-13T14:07:59.773946Z",
          "last_login": null,
          "group_admin_id": "5b4bda13-df27-45f6-bd9c-d7d22a5f7d07",
          "gender": "M",
          "phone_number": "",
          "membership_number": "9839203345193",
          "customer_number": "I254006",
          "birth_date": "2001-05-22",
          "last_authenticated": "2022-06-15T14:57:07.128001Z",
          "last_refreshed": null,
          "last_updated": null,
          "last_updated_groups": "2022-06-15T14:56:46.371252Z",
          "last_updated_functions": "2022-06-15T14:56:46.663867Z",
          "groups": [
              2,
              1
          ]
      }

        const userResult = UserModel.deserialize(user)
        console.log('userResult ', userResult)
        resolve(userResult)
      })
    }
    
  }
}
