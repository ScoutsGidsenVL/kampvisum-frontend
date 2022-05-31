import { Sidebar, SidebarState } from '@/helpers/infoBarHelper'
import { usePhoneHelper } from '@/helpers/phoneHelper'
import router from '@/router'
import { Visum } from '@/serializer/Visum'
import { ref, Ref } from 'vue'
export interface breadcrumb {
  title: string
  name: string
  uuid?: string
}
const { checkIfIsMobileSize } = usePhoneHelper()

const breadcrumbs = ref<breadcrumb[]>([])
const sidebar = ref<Sidebar>({ state: checkIfIsMobileSize() ? SidebarState.CLOSED : SidebarState.OPEN })


export const useNavigation = (): {
  navigateTowardsPassport: (visumId:string) => void
  navigateTowardsCategory: (name: string, visum: Visum, categoryUuid: string) => void
  navigateTowardsSection: (name: string, visum: Visum, categoryUuid: string, sectionId: string) => void
  jumpToId: (id: string | string[]) => void
  breadcrumbs: Ref<breadcrumb[]>
  sidebar: Ref<Sidebar>
  setBreadcrumbs: (b: breadcrumb[]) => void
  goToHome: () => void,
  navigateTowardsVisum: (visumId:string) => void
} => {
  const setBreadcrumbs = (b: breadcrumb[]) => {
    breadcrumbs.value = b
  }

  const navigateTowardsVisum = (visumId: string) => {
    const navigate = () => {
      router.push('/kamp/' + visumId)
    }
    navigate()
  }

  const navigateTowardsCategory = (name: string, visum: Visum, categoryUuid: string) => {
    const navigate = (name: string) => {
      router.push('/kamp/' + visum.id.toString() + '/' + 'category' + '/' + categoryUuid)
    }
    navigate(name.toLowerCase())
  }

  const navigateTowardsSection = (name: string, visum: Visum, categoryUuid: string, sectionId: string) => {
    const navigate = (name: string) => {
      router.push('/kamp/' + visum.id.toString() + '/' + 'category' + '/' + categoryUuid + '/section/' + sectionId)
    }
    navigate(name.toLowerCase())
  }

  const goToHome = () => {
    // router.push('/kampvisum-home')
    console.log('Going to home...')
    window.location.pathname = '/'
  }

  const jumpToId = (id: string | string[]) => {
    // @ts-ignore
    const element = document.getElementById(id)
    // @ts-ignore
    if (element) {
      element.setAttribute('style', 'border: 4px solid #000000')
    }
    let y
    // @ts-ignore
    if (element) {
     y = element.getBoundingClientRect().top - 230
    }
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  const navigateTowardsPassport = (visumId: string) => {
    const navigate = () => {
      router.push('/kamp/' + visumId + '/paspoort')
    }
    navigate()
  }

  return {
    navigateTowardsCategory,
    navigateTowardsPassport,
    navigateTowardsSection,
    navigateTowardsVisum,
    setBreadcrumbs,
    breadcrumbs,
    jumpToId,
    goToHome,
    sidebar
  }
}
