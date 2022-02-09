import router from '@/router'
import { Visum } from '@/serializer/Visum'

export const useNavigation = (): {
  navigateTowardsCategory: (name: string, visum: Visum, categoryUuid: string, route: any) => void
  navigateTowardsSection: (name: string, visum: Visum, categoryUuid: string, sectionId: string, route: any) => void
  jumpToId: (id: string | string[]) => void
} => {

  const navigateTowardsCategory = (name: string, visum: Visum, categoryUuid: string, route: any) => {
    const navigate = (name: string) => {
      router.push('/kamp/' + visum.id.toString() + '/' + name + '/' + categoryUuid)
    }
    navigate(name.toLowerCase())
  }

  const navigateTowardsSection = (name: string, visum: Visum, categoryUuid: string, sectionId: string, route: any) => {
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
    document.getElementById(id).setAttribute("style", "padding:5px; background-color: #F4F5D4;");
    // @ts-ignore
    const y = element.getBoundingClientRect().top - 80;
    window.scrollTo({top: y, behavior: 'smooth'});
  }

  return {
    navigateTowardsCategory,
    navigateTowardsSection,
    jumpToId
  }
}