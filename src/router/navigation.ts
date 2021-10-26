import router from '@/router'

export const useNavigation = (): {
  navigateTowardsCategory: (name: string, categoryUuid: string, route: any) => void
} => {

  const navigateTowardsCategory = (name: string, categoryUuid: string, route: any) => {
    const navigate = (name: string) => {
      console.log('CHECK: ', name)
      router.push('/kamp/' + route.params.campId.toString() + '/' + name + '/' + categoryUuid)
    }

    navigate(name.toLowerCase())
  }

  return {
    navigateTowardsCategory
  }
}