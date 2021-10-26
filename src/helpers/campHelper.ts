import RepositoryFactory from '@/repositories/repositoryFactory'
import { CampRepository } from '@/repositories/campRepository'
import { Camp } from '@/serializer/Camp'
import { useRoute } from 'vue-router'

export const useCampHelper = (): {
  getCampByRouteParam: () => Promise<Camp>,
} => {

  const route = useRoute()

  const getCampByRouteParam = async (): Promise<Camp> => {
    return RepositoryFactory.get(CampRepository)
      .getById(route.params.campId.toString())
      .then((c: Camp) => { return c})
  }

  return {
    getCampByRouteParam,
  }
}