import router from '@/router'
import { Camp } from '@/serializer/Camp'

export const useNavigation = (): {
  navigateTowardsCategory: (name: string, camp: Camp, categoryUuid: string, route: any) => void
} => {

  const navigateTowardsCategory = (name: string, camp: Camp,categoryUuid: string, route: any) => {
    const navigate = (name: string) => {
      router.push('/kamp/' + camp.uuid.toString() + '/' + name + '/' + categoryUuid)
    }

    navigate(name.toLowerCase())
  }

  return {
    navigateTowardsCategory
  }
}