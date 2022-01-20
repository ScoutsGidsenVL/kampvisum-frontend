import { ref, Ref } from 'vue'

const isDisplayingNotification = ref<boolean>(false)

export const useNotification = (): {
  isDisplayingNotification: Ref<boolean>
  triggerNotification: () => void
} => {

  const triggerNotification = () => {
    isDisplayingNotification.value = true
    setTimeout(() => {
      isDisplayingNotification.value = false
    }, 4000)
  }

  return {
    isDisplayingNotification,
    triggerNotification
  }
}
