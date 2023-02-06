import RepositoryFactory from '@/repositories/repositoryFactory'
import { CampRepository } from '@/repositories/campRepository'
import { Group } from '@/serializer/Group'
import { ref, Ref, watch } from 'vue'
import store from '../store/store'
import useVisum from './useVisum'
const { DateTime } = require("luxon");

const years = ref<Array<string>>([])
const isFetchingYears = ref<boolean>(false)
const selectedYear = ref<string>('')
const selectedGroup = ref<any>({ groupAdminId: '' })
let debounce: any

const useGroupAndYears = (): {
  years: Ref<Array<string>>
  selectedYear: Ref<string>
  getYearsForGroup: (groupId: string) => Promise<void>
  isFetchingYears: Ref<boolean>
  setSelectedYear: (year: string) => string
  setSelectedGroup: (group: Group) => Group
  unsetSelectedGroup: () => void
  selectedGroup: Ref<Group>
  getAvailableGroups: () => Group[]
  isInBetweenStartAndEnd: (start: string, end: string) => Boolean
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

  // watch(selectedYear, (newYear: string, oldYear: string) => {
  //   // console.log('HERE@@@'); this loops 10 times?!
  //   console.log(newYear, oldYear);
  //   if (newYear !== oldYear && oldYear !== '') {
  //     getVisums(selectedGroup.value, newYear);
  //   }
  // })

  const setSelectedYear = (year: string) => {
    selectedYear.value = year
    getVisums(selectedGroup.value, year);
    return year
  }

  const setSelectedGroup = (group: Group, backToHome: boolean = true) => {
    selectedGroup.value = group
    getVisums(selectedGroup.value, selectedYear.value)
    return group
  }

  const unsetSelectedGroup = () => {
    selectedGroup.value = null
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

        if (yearsOutput[0]) {
          setSelectedYear(yearsOutput[0])
        }

        isFetchingYears.value = false
      })
  }

  const getAvailableGroups = () => {
    return store.getters.user.scoutsGroups as Group[]
  }

  const isInBetweenStartAndEnd = (start: string, end: string): boolean => {
    var date = DateTime.fromFormat(new Date().toString(), 'yyyy-MM-dd')
    if (date > start && date < end) {
      return true
    } else {
      return false
    }
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
    unsetSelectedGroup,
    isInBetweenStartAndEnd
  }
}

export default useGroupAndYears
