import RepositoryFactory from '@/repositories/repositoryFactory'
import { CampRepository } from '@/repositories/campRepository'
import { CategoryRepository } from '@/repositories/CategoryRepository'
import { Camp } from '@/serializer/Camp'
import { useRoute } from 'vue-router'
import { ref, Ref } from 'vue'
import { Visum } from '@/serializer/Visum'
import { Category } from '@/serializer/Category'

const campsByGroup = ref<Camp[]>([])

export const useCampHelper = (): {
  getCampByRouteParam: () => Promise<Visum>,
  getCategoryByRouteParam: () => Promise<Category>,
  setCampsByGroup: (camps: Camp[]) => void,
  campsByGroup: Ref<Camp[]>,
} => {

  const route = useRoute()

  const getCampByRouteParam = async (): Promise<Visum> => {
    return RepositoryFactory.get(CampRepository)
      .getById(route.params.campId.toString() + "/")
      .then((c: Visum) => { return c})
  }

  const getCategoryByRouteParam = async (): Promise<Category> => {
    return RepositoryFactory.get(CategoryRepository)
      .getById(route.params.id.toString() + "/")
      .then((c: Category) => { return c})
  }

  const setCampsByGroup = (camps: Camp[]) => {
    campsByGroup.value = camps
  }

  return {
    getCampByRouteParam,
    setCampsByGroup,
    campsByGroup,
    getCategoryByRouteParam
  }
}