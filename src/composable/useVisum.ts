import { CampRepository } from '@/repositories/campRepository'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { Visum } from '@/serializer/Visum'
import { ref, Ref } from 'vue'
import router from '@/router'

const visums = ref<Visum[]>([])
const isFetchingVisums = ref<boolean>(false)

const useVisum = (): {
  visums: Ref<Visum[]>
  getVisums: (groupId: string, year: string) => Promise<void>
  clearVisums: () => void
  isFetchingVisums: Ref<boolean>
  navigateTowardsVisum: (vsium: Visum) => void
  getVisumsAlphabetically: () => Visum[]
} => {
  const getVisums = async (groupId: string, year: string) => {
    if (isFetchingVisums.value === false) {
      isFetchingVisums.value = true
      await RepositoryFactory.get(CampRepository)
        .getArray('?page=1&page_size=100&group=' + groupId + (year !== '' ? '&year=' + year : ''))
        .then((visumsOutput: Visum[]) => {
          visums.value = visumsOutput
          isFetchingVisums.value = false
        })
    }
  }

  const clearVisums = () => {
    visums.value = []
  }

  const getVisumsAlphabetically = (): Visum[] => {
    let temp = ref<any>([])
    temp.value = [...visums.value]
    return temp.value.sort((a: Visum, b: Visum) => a.camp.name.localeCompare(b.camp.name))
  }

  const navigateTowardsVisum = (visum: Visum) => {
    router.push('/kamp/' + visum.id)
  }

  return {
    visums,
    getVisums,
    clearVisums,
    isFetchingVisums,
    navigateTowardsVisum,
    getVisumsAlphabetically
  }
}

export default useVisum
