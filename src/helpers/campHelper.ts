import RepositoryFactory from '@/repositories/repositoryFactory'
import { CampVisumRepository } from '@/repositories/CampVisumRepository'
import { CategoryRepository } from '@/repositories/CategoryRepository'
import { useRoute } from 'vue-router'
import { ref, Ref } from 'vue'
import { Visum } from '@/serializer/Visum'
import { Category } from '@/serializer/Category'
import store from '../store/store'
import useGroupAndYears from '@/composable/useGroupAndYears'
import { Group } from '@/serializer/Group'
import { useNavigation } from '@/composable/useNavigation'

const campsByGroup = ref<Visum[]>([])
const { setSelectedGroup, selectedGroup } = useGroupAndYears()
const { goToHome } = useNavigation()

export const useCampHelper = (): {
  getCampByRouteParam: () => Promise<Visum>,
  getCategoryByRouteParam: () => Promise<Category>,
  setCampsByGroup: (camps: Visum[]) => void,
  campsByGroup: Ref<Visum[]>,
} => {

  const route = useRoute()

  const getCampByRouteParam = async (): Promise<Visum> => {
    return RepositoryFactory.get(CampVisumRepository)
      .getById(selectedGroup.value.groupAdminId, route.params.campId.toString() + "/")
      .then((c: Visum) => {
        store.getters.user.scoutsGroups.forEach((userGroup: Group) => {
          if (userGroup.groupAdminId === c.groupGroupAdminId) {
            setSelectedGroup(userGroup)
          }
        })

        if (selectedGroup.value.groupAdminId !== c.groupGroupAdminId) {
          // goToHome()
        }

        return c
      })
  }

  const getCategoryByRouteParam = async (): Promise<Category> => {
    return RepositoryFactory.get(CategoryRepository)
      .getById(selectedGroup.value.groupAdminId, route.params.id.toString() + "/")
      .then((c: Category) => { return c })
  }

  const setCampsByGroup = (camps: Visum[]) => {
    campsByGroup.value = camps
  }

  return {
    getCampByRouteParam,
    setCampsByGroup,
    campsByGroup,
    getCategoryByRouteParam
  }
}