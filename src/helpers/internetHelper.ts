import { Ref, ref } from "vue"
const isInternetActive = ref<Boolean>(false)

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

    // FIRST TIME
   await isOnline().then((x: any) => {
      isInternetActive.value = x
      setTokenIfOffline(x)
      // console.log('INTERNET IS', isInternetActive.value ? ' ONLINE' : ' OFFLINE')
    })
    
    // LOOP
    setInterval(() => {
      isOnline().then((x: any) => {
        isInternetActive.value = x
        setTokenIfOffline(x)
        // console.log('INTERNET IS', isInternetActive.value ? ' ONLINE' : ' OFFLINE')
      })
    }, 3000);
  }

  return {
    checkIfInternetActive,
    isInternetActive,
  }
}