import RepositoryFactory from '@/repositories/repositoryFactory'
import AuthRepository from '@/repositories/authRepository'
import useGroupAndYears from '@/composable/useGroupAndYears'
import { useOfflineData } from '@/composable/useOfflineData'

const useAuthHelper = (): {
    logoutFromGA: () => void
} => {
    const { unsetSelectedGroup } = useGroupAndYears()
    const { unsetMe } = useOfflineData()
    const logoutFromGA = async (): Promise<void> => {
        RepositoryFactory.get(AuthRepository).logout()
        clearTokens()
        unsetSelectedGroup()
        unsetMe()
    }

    const clearTokens = () => {
        sessionStorage.removeItem('oidc-access-token')
        sessionStorage.removeItem('oidc-refresh-token')
    }

    return {
        logoutFromGA
    }
}


export default useAuthHelper
