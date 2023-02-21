import { ref, Ref } from 'vue'

const isDisplayingNotification = ref<boolean>(false)
const message = ref<string>('Aanpassingen aan het kamp zijn succesvol opgeslagen!')
const isForbidden = ref<boolean>(false)
const color = ref<string>('#7b8f1c')

export const useNotification = (): {
  isDisplayingNotification: Ref<boolean>
  message: Ref<string>
  triggerNotification: (m?: string, c?: string) => void
  setMessage: (m: string) => void
  isForbidden: Ref<boolean>
  color: Ref<string>
} => {

  const triggerNotification = (m?: string, c?: string) => {
    if (c) {
      color.value = c
    }
    if (m) {
      message.value = m
    }
    
    isDisplayingNotification.value = true
    setTimeout(() => {
      isDisplayingNotification.value = false
      color.value = '#7b8f1c'
    }, 4000)
  }

  const setMessage = (m: string) => {
    message.value = m
  }

  return {
    isDisplayingNotification,
    message,
    setMessage,
    triggerNotification,
    isForbidden,
    color
  }
}
