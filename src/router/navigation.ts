import router from '@/router'
import { Visum } from '@/serializer/Visum'

export const useNavigation = (): {
  navigateTowardsCategory: (name: string, visum: Visum, categoryUuid: string, route: any) => void
} => {

  const navigateTowardsCategory = (name: string, visum: Visum, categoryUuid: string, route: any) => {
    const navigate = (name: string) => {
      router.push('/kamp/' + visum.id.toString() + '/' + name + '/' + categoryUuid)
    }

    navigate(name.toLowerCase())
  }

  return {
    navigateTowardsCategory
  }
}