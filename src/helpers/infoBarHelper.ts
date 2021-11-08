import { ref, Ref } from 'vue'

const categoryInfo =  ref<string>('')
const info = ref<string>('')

export const useInfoBarHelper = (): {
  setInfo: (text?: string) => void,
  setCategoryInfo: (text: string) => void,
  info: Ref<string>
} => {

  const setCategoryInfo = (text: string): void => {
    categoryInfo.value = text
    setInfo()
  }

  const setInfo = (text?: string): void => {
    if (text) {
      info.value = text
    } else {
      info.value = categoryInfo.value
    }
  }

  return {
    setCategoryInfo,
    setInfo,
    info
  }
}