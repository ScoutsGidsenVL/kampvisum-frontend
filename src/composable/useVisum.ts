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

  const navigateTowardsVisum = (visum: Visum) => {
    console.log('NAVIGATING...')
    router.push('/kamp/' + visum.id)
  }

  return {
    visums,
    getVisums,
    clearVisums,
    isFetchingVisums,
    navigateTowardsVisum
  }
}

export default useVisum
