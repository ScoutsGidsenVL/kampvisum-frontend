import store from '../store/store'

export enum permissions {
  'CREATE_VISUM' = 'visums.create_visum',
  'DELETE_VISUM' = 'visums.delete_visum',
  'UPDATE_VISUM' = 'visums.update_visum',
  'LIST_VISUM' = 'visums.list_visum'
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
