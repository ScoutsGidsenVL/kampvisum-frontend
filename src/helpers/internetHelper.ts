import { Ref, ref } from "vue"
const isInternetActive = ref<Boolean>(navigator.onLine)

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

    setTokenIfOffline(navigator.onLine)
    
    setInterval(() => {
      isInternetActive.value = navigator.onLine
      console.log(navigator.onLine)
      setTokenIfOffline(navigator.onLine)
    }, 5000);
  }

  return {
    checkIfInternetActive,
    isInternetActive,
  }
}