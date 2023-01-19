import store from '../store/store'

export const usePermission = (): {
  can: (permission: string) => boolean
} => {

  const getPermissions = () => {
    return store.getters.user.permissions as any[]
  }

  const can = (permission: string): boolean => {
    const p = getPermissions()
    if (p) {
      return p.includes('visums.' + permission)
    } else {
      return false
    }
  }

  return {
    can
  }
}
