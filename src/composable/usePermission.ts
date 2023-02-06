import store from '../store/store'

export enum permissions {
  'CREATE_VISUM' = 'visums.add_campvisum',
  'DELETE_VISUM' = 'visums.delete_campvisum',
  'UPDATE_VISUM' = 'visums.change_campvisum',
  'LIST_VISUM' = 'visums.view_campvisum'
}

export const usePermission = (): {
  can: (permission: string) => boolean
} => {

  const getPermissions = () => {
    return store.getters.user.permissions as any[]
  }

  const can = (permission: string): boolean => {
    if (permission.length === 0) {
      return true
    }
    const p = getPermissions()
    if (p) {
      return p.includes(permission)
    } else {
      return false
    }
  }

  return {
    can
  }
}
