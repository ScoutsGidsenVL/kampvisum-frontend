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

    isOnline().then((result: boolean) => {
      isInternetActive.value = result;
      setTokenIfOffline(result)
    })
    
    setInterval(() => {
      isOnline().then((result: boolean) => {
        isInternetActive.value = result;
        setTokenIfOffline(result)
      })
    }, 5000);
  }

  return {
    checkIfInternetActive,
    isInternetActive,
  }
}