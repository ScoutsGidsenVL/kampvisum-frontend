import RepositoryFactory from '@/repositories/repositoryFactory'
import AuthRepository from '@/repositories/authRepository'
import useGroupAndYears from '@/composable/useGroupAndYears'
import { useOfflineData } from '@/composable/useOfflineData'
import { ref } from 'vue'

export const isLoggedIn = ref<boolean>(false)

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
        window.location.replace('kampvisum-home')
    }

    const clearTokens = () => {
        sessionStorage.removeItem('oidc-access-token')
        sessionStorage.removeItem('oidc-refresh-token')
    }

    return {
        logoutFromGA,
    }
}


export default useAuthHelper
