import { CampRepository } from '@/repositories/campRepository'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { Group } from '@/serializer/Group'
import store from '../store/store'
import { ref, Ref, watch } from 'vue'
import useVisum from './useVisum'
import { useNavigation } from './useNavigation'

const years = ref<Array<string>>([])
const isFetchingYears = ref<boolean>(false)
const selectedYear = ref<string | undefined>()
const selectedGroup = ref<any>({ groupAdminId: '' })

const useGroupAndYears = (): {
  years: Ref<Array<string>>
  selectedYear: Ref<string | undefined>
  getYearsForGroup: (groupId: string) => Promise<void>
  isFetchingYears: Ref<boolean>
  setSelectedYear: (year: string) => string
  setSelectedGroup: (group: Group) => Group
  selectedGroup: Ref<Group>
  getAvailableGroups: () => Group[]
} => {
  const { getVisums, clearVisums } = useVisum()
  const { goToHome } = useNavigation()

  watch(
    () => store.getters.user.scoutsGroups,
    (groups: Group[]) => {
      // Set to true for now, if you go to child page it will redirect to home.
      // implement way to set correct group if on child page
      setSelectedGroup(groups[0], true)
    }
  )

  watch(selectedGroup, (group: Group) => {
    console.log("SELECTED GROUP CHANGED: ", group.groupAdminId)
    getYearsForGroup(group.groupAdminId)
  })

  watch(selectedYear, (year: string | undefined) => {
    year && getVisums(selectedGroup.value.groupAdminId, year)
  })

  const setSelectedYear = (year: string) => {
    selectedYear.value = year
    return year
  }

  const setSelectedGroup = (group: Group, backToHome: boolean = true) => {
    selectedGroup.value = group
    //If group changes reset year, visums an go to home
    years.value = []
    selectedYear.value = undefined
    clearVisums()
    if (backToHome) {
      goToHome()
    }
    return group
  }

  const getYearsForGroup = async (groupId: string) => {
    isFetchingYears.value = true
    await RepositoryFactory.get(CampRepository)
      .getGroupYears(groupId)
      .then((yearsOutput: Array<string>) => {
        years.value = yearsOutput
        setSelectedYear(yearsOutput[0])
        isFetchingYears.value = false
      })
  }

  const getAvailableGroups = () => {
    return store.getters.user.scoutsGroups as Group[]
  }

  return {
    years,
    selectedYear,
    setSelectedYear,
    getAvailableGroups,
    getYearsForGroup,
    isFetchingYears,
    selectedGroup,
    setSelectedGroup,
  }
}

export default useGroupAndYears
