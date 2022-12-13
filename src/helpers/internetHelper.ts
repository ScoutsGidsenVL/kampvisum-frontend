import { Ref, ref } from "vue"
const isInternetActive = ref<Boolean>(true)

export const useInternetHelper = (): {
  checkIfInternetActive: () => void,
  isInternetActive:  Ref<Boolean>
} => {

  const checkIfInternetActive = async () => {
    const isOnline = require('is-online')

    const setTokenIfOffline = (state: boolean) => {
      if (!state) {
        sessionStorage.setItem('oidc-access-token', 'offline');
        sessionStorage.setItem('oidc-refresh-token', 'offline');
      }
    }

    const checkInternet = () => {
      isOnline().then((result: boolean) => {
        if (isInternetActive.value !== result) {
          window.location.replace('/')
        }
        isInternetActive.value = result;
        setTokenIfOffline(result)
      })
    }
    
    checkInternet()

    setInterval(() => {
      checkInternet()
    }, 5000);
  }

  return {
    checkIfInternetActive,
    isInternetActive,
  }
}