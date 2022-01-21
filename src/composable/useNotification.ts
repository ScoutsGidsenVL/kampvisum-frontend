import { ref, Ref } from 'vue'

const isDisplayingNotification = ref<boolean>(false)
const message = ref<string>('Aanpassingen aan het kamp zijn succesvol opgeslagen!')

export const useNotification = (): {
  isDisplayingNotification: Ref<boolean>
  message: Ref<string>
  triggerNotification: (m?: string) => void
  setMessage: (m: string) => void
} => {

  const triggerNotification = (m?: string) => {
    if (m) {
      message.value = m
    }
    
    isDisplayingNotification.value = true
    setTimeout(() => {
      isDisplayingNotification.value = false
    }, 4000)
  }

  const setMessage = (m: string) => {
    message.value = m
  }

  return {
    isDisplayingNotification,
    message,
    setMessage,
    triggerNotification
  }
}
