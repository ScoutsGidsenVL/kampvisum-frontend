import { CampRepository } from '@/repositories/campRepository'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { Visum } from '@/serializer/Visum'
import { ref, Ref } from 'vue'

const visums = ref<Visum[]>([])
const isFetchingVisums = ref<boolean>(false)

const useVisum = (): {
  visums: Ref<Visum[]>
  getVisums: (groupId: string, year: string) => Promise<void>
  clearVisums: () => void
  isFetchingVisums: Ref<boolean>
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

  return {
    visums,
    getVisums,
    clearVisums,
    isFetchingVisums,
  }
}

export default useVisum
