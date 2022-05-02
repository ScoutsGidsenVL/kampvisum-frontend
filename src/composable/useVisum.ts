import { CampRepository } from '@/repositories/campRepository'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { Visum, VisumStates } from '@/serializer/Visum'
import { ref, Ref } from 'vue'
import router from '@/router'
import { Category } from '@/serializer/Category'
import { SubCategory } from '@/serializer/SubCategory'
import {StatusFeedbackState} from '@/components/semantics/Feedback.vue'

const visums = ref<Visum[]>([])
const visumsAlphabetically = ref<Visum[]>([])
const isFetchingVisums = ref<boolean>(false)

export type GlobalVisumState = 'ACCEPTED' | 'FEEDBACK' | 'DISAPPROVED' | 'INPROGRESS' | 'READYFORDC'

const useVisum = (): {
  visums: Ref<Visum[]>
  visumsAlphabetically: Ref<Visum[]>
  getVisums: (groupId: any, year: string) => Promise<void>
  clearVisums: () => void
  isFetchingVisums: Ref<boolean>
  navigateTowardsVisum: (visum: Visum) => void
  getGlobalVisumState: (visum: Visum) => GlobalVisumState
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

  const getGlobalVisumState = (visum: Visum) :  GlobalVisumState => {

    //If no signable, it's needs feedback to resolve
    if(visum.state ===  VisumStates.NOT_SIGNABLE){
      return 'DISAPPROVED'
    }

    //Check if subcategory has feedback state
    try {
      visum.categorySet.categories.forEach((cat: Category) => {
        cat.subCategories && cat.subCategories.forEach((subCat: SubCategory ) => {
          if(subCat.approval === StatusFeedbackState.APPROVED_FEEDBACK){
            throw 'Break'
          }
        })
      })
    } catch (e) {
      return 'FEEDBACK' 
    }

    //If camp is accepted show green badge
    if(visum.state === VisumStates.APPROVED) {
      return 'ACCEPTED'
    }

    //Show if dc can sign camp
    if(visum.engagement?.leaders && visum.engagement.groupLeaders){
      return 'READYFORDC'
    }

    //Leaders are working on camp
    return 'INPROGRESS'
  }

  return {
    visums,
    getVisums,
    clearVisums,
    isFetchingVisums,
    navigateTowardsVisum,
    visumsAlphabetically,
    getGlobalVisumState,
  }
}

export default useVisum
