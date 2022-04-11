import { CampRepository } from '@/repositories/campRepository'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { Visum } from '@/serializer/Visum'
import { ref, Ref } from 'vue'
import router from '@/router'

const visums = ref<Visum[]>([])
const visumsAlphabetically = ref<Visum[]>([])
const isFetchingVisums = ref<boolean>(false)

const useVisum = (): {
  visums: Ref<Visum[]>
  visumsAlphabetically: Ref<Visum[]>
  getVisums: (groupId: any, year: string) => Promise<void>
  clearVisums: () => void
  isFetchingVisums: Ref<boolean>
  navigateTowardsVisum: (visum: Visum) => void
} => {
  const getVisums = async (group: any, year: string) => {
    if (isFetchingVisums.value === false) {
      isFetchingVisums.value = true
      await RepositoryFactory.get(CampRepository)
        .getArray('?page=1&page_size=100&group=' + group.groupAdminId + (year !== '' ? '&year=' + year : ''))
        .then((visumsOutput: Visum[]) => {
          visums.value = visumsOutput
          visumsAlphabetically.value = [...visumsOutput]
          visumsAlphabetically.value.sort((a: Visum, b: Visum) => a.camp.name.localeCompare(b.camp.name))
          isFetchingVisums.value = false
        })
    }
  }

  const clearVisums = () => {
    visums.value = []
    visumsAlphabetically.value = []
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
    visumsAlphabetically,
  }
}

export default useVisum
