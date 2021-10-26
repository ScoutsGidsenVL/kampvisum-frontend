import RepositoryFactory from '@/repositories/repositoryFactory'
import { CampRepository } from '@/repositories/campRepository'
import { Camp } from '@/serializer/Camp'
import { useRoute } from 'vue-router'
import { ref, Ref } from 'vue'

const campsByGroup = ref<Camp[]>([])

export const useCampHelper = (): {
  getCampByRouteParam: () => Promise<Camp>,
  setCampsByGroup: (camps: Camp[]) => void,
  campsByGroup: Ref<Camp[]>,
} => {

  const route = useRoute()

  const getCampByRouteParam = async (): Promise<Camp> => {
    console.log('WOW: ', route.params.campId.toString())
    return RepositoryFactory.get(CampRepository)
      .getById(route.params.campId.toString())
      .then((c: Camp) => { return c})
  }

  const setCampsByGroup = (camps: Camp[]) => {
    campsByGroup.value = camps
  }

  return {
    getCampByRouteParam,
    setCampsByGroup,
    campsByGroup
  }
}