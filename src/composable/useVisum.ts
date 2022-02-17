import { CampRepository } from '@/repositories/campRepository'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { Visum } from '@/serializer/Visum'
import { ref, Ref } from 'vue'

const visums = ref<Visum[]>([])
const isFetchingVisums = ref<boolean>(false)

const useVisum = (): {
  visums: Ref<Visum[]>
  getVisums: (groupId: string, year: string) => Promise<void>
  isFetchingVisums: Ref<boolean>
} => {
  const getVisums = async (groupId: string, year: string) => {
    isFetchingVisums.value = true
    await RepositoryFactory.get(CampRepository)
      .getArray('?page=1&page_size=100&group=' + groupId + (year !== '' ? '&year=' + year : ''))
      .then((visumsOutput: Visum[]) => {
        visums.value = visumsOutput
        isFetchingVisums.value = false
      })
  }

  return {
    visums,
    getVisums,
    isFetchingVisums,
  }
}

export default useVisum
