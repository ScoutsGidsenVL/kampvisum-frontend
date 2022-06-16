import { Ref, ref } from "vue"
const isInternetActive = ref<Boolean>(true)

export const useInternetHelper = (): {
  checkIfInternetActive: () => void,
  isInternetActive:  Ref<Boolean>
} => {

  const checkIfInternetActive = async () => {

    const setTokenIfOffline = (state: boolean) => {
      if (!state) {
        sessionStorage.setItem('oidc-access-token', 'offline');
        sessionStorage.setItem('oidc-refresh-token', 'offline');
      } 
    }

    setTokenIfOffline(true)
    
    setInterval(() => {
      isInternetActive.value = true
      console.log(true)
      setTokenIfOffline(true)
    }, 5000);
  }

  return {
    checkIfInternetActive,
    isInternetActive,
  }
}