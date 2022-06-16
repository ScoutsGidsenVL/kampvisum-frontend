import { Ref, ref } from "vue"
const isInternetActive = ref<Boolean>(false)

export const useInternetHelper = (): {
  checkIfInternetActive: () => void,
  isInternetActive:  Ref<Boolean>
} => {

  const checkIfInternetActive = async () => {
    const isOnline = require('is-online')

    // FIRST TIME
   await isOnline().then((x: any) => {
      isInternetActive.value = x
      console.log('INTERNET IS', isInternetActive.value ? ' ONLINE' : ' OFFLINE')
    })
    
    // LOOP
    setInterval(() => {
      isOnline().then((x: any) => {
        isInternetActive.value = x
        console.log('INTERNET IS', isInternetActive.value ? ' ONLINE' : ' OFFLINE')
      })
    }, 90000);
  }

  return {
    checkIfInternetActive,
    isInternetActive,
  }
}