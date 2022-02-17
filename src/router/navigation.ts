import router from '@/router'
import { Group } from '@/serializer/Group'
import { Visum } from '@/serializer/Visum'
import { ref, Ref } from 'vue'
export interface breadcrumb {
  title: string
  name: string
  uuid?: string
}

const breadcrumbs = ref<breadcrumb[]>([])
const selectedGroup = ref<Group>({ groupAdminId: '' })

export const useNavigation = (): {
  navigateTowardsCategory: (name: string, visum: Visum, categoryUuid: string) => void
  navigateTowardsSection: (name: string, visum: Visum, categoryUuid: string, sectionId: string) => void
  jumpToId: (id: string | string[]) => void
  breadcrumbs: Ref<breadcrumb[]>
  selectedGroup: Ref<any>
  setBreadcrumbs: (b: breadcrumb[]) => void
  setSelectedGroup: (group: Group) => void
} => {

  const setSelectedGroup = (group: Group) => {
      // router.push('/kampvisum-home/')
      console.log('TRIGGER')
      selectedGroup.value = group
  }

  const setBreadcrumbs = (b: breadcrumb[]) => {
    breadcrumbs.value = b
  }

  const navigateTowardsCategory = (name: string, visum: Visum, categoryUuid: string) => {
    const navigate = (name: string) => {
      router.push('/kamp/' + visum.id.toString() + '/' + name + '/' + categoryUuid)
    }
    navigate(name.toLowerCase())
  }

  const navigateTowardsSection = (name: string, visum: Visum, categoryUuid: string, sectionId: string) => {
    const navigate = (name: string) => {
      router.push('/kamp/' + visum.id.toString() + '/' + name + '/' + categoryUuid + '/section/' + sectionId)
    }
    navigate(name.toLowerCase())
  }

  const jumpToId = (id: string | string[]) => {
    // @ts-ignore
    const element = document.getElementById(id);
    // @ts-ignore
    // element.addClass('bg-red')
    document.getElementById(id).setAttribute("style", "padding:5px; background-color: #FBCCD4; border: 2px solid #E00A1E")
    // @ts-ignore
    const y = element.getBoundingClientRect().top - 80;
    window.scrollTo({top: y, behavior: 'smooth'});
  }

  return {
    navigateTowardsCategory,
    navigateTowardsSection,
    jumpToId,
    breadcrumbs,
    setBreadcrumbs,
    selectedGroup,
    setSelectedGroup
  }
}