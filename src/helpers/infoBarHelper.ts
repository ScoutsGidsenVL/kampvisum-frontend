import { ref, Ref } from 'vue'
import { usePhoneHelper } from './phoneHelper'

export enum SidebarState {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED'
}

export type Sidebar = {
  state: SidebarState
}

const { checkIfIsMobileSize } = usePhoneHelper()


const categoryInfo =  ref<string>('')
const info = ref<string>('')
const sidebar = ref<Sidebar>({ state: checkIfIsMobileSize() ? SidebarState.CLOSED : SidebarState.OPEN })
const defaultInfo = ref<string>('Geen info beschikbaar')


export const useInfoBarHelper = (): {
  setInfo: (text?: string) => void,
  setCategoryInfo: (text: string) => void,
  info: Ref<string>,
  sidebar: Ref<Sidebar>,
  defaultInfo: Ref<string>
} => {


  const setCategoryInfo = (text: string): void => {
    categoryInfo.value = text
    setInfo()
  }

  const setInfo = (text?: string): void => {
    if (text) {
      info.value = text
    } else {
      info.value = categoryInfo.value ? categoryInfo.value : defaultInfo.value
    }
  }

  return {
    setCategoryInfo,
    sidebar,
    setInfo,
    info,
    defaultInfo
  }
}