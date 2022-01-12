import { ref, Ref } from 'vue'

export enum SidebarState {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED'
}

export type Sidebar = {
  state: SidebarState
}

const categoryInfo =  ref<string>('')
const info = ref<string>('')
const sidebar = ref<Sidebar>({ state: SidebarState.OPEN})

export const useInfoBarHelper = (): {
  setInfo: (text?: string) => void,
  setCategoryInfo: (text: string) => void,
  info: Ref<string>,
  sidebar: Ref<Sidebar>
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
    sidebar,
    setInfo,
    info
  }
}