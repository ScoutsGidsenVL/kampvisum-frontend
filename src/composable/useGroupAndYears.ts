import RepositoryFactory from '@/repositories/repositoryFactory'
import { CampRepository } from '@/repositories/campRepository'
import { Group } from '@/serializer/Group'
import { ref, Ref, watch } from 'vue'
import store from '../store/store'
import useVisum from './useVisum'

const years = ref<Array<string>>([])
const isFetchingYears = ref<boolean>(false)
const selectedYear = ref<string | undefined>()
const selectedGroup = ref<any>({ groupAdminId: '' })
let debounce: any

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

  watch(
    () => store.getters.user.scoutsGroups,
    (groups: Group[]) => {
      // Set to true for now, if you go to child page it will redirect to home.
      // implement way to set correct group if on child page
      clearTimeout(debounce)
      debounce = setTimeout(() => {
        if (window.location.pathname.includes('kampvisum-home')) {
          setSelectedGroup(groups[0], true)
        }
      }, 100)
    }
  )

  watch(selectedGroup, (group: Group) => {
    clearTimeout(debounce)
      debounce = setTimeout(() => {
        getYearsForGroup(group.groupAdminId)
      }, 100)
  })

  watch(selectedYear, (year: string | undefined) => {
    year && getVisums(selectedGroup.value, year)
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
    return group
  }

  const getYearsForGroup = async (groupId: string) => {
    clearVisums()
    isFetchingYears.value = true
    await RepositoryFactory.get(CampRepository)
      .getGroupYears(groupId)
      .then((yearsOutput: Array<string>) => {
        if (yearsOutput.length === 0) { 
          clearVisums()
        }
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
