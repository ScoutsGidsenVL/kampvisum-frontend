import { ref, Ref, watch } from 'vue'
type ModalState = 'show' | 'hide' | 'loading'

const callBacks = ref<Array<() => void>>([])

export type progressType = {
  status: 'hasError' | 'success' | 'new' | 'inProgress'
  progress: number
  successFiles: number
  errorFiles: number
}

export const newProgress: progressType = {
  status: 'new',
  progress: 0,
  successFiles: 0,
  errorFiles: 0,
}

export const useUpload = (): {
  progress: Ref<progressType>
  modalState: Ref<ModalState>
  addCallback: (func: () => void) => Ref<Array<() => void>>
  uploadIsComplete: () => void
} => {
  const progress = ref<progressType>(newProgress)
  const modalState = ref<ModalState>('hide')

  watch(progress, () => {
    modalState.value = 'hide'
  })

  const addCallback = (func: () => void) => {
    callBacks.value.push(func)
    return callBacks
  }

  const uploadIsComplete = () => {
    callBacks.value.forEach((func: () => void) => func())
  }

  return {
    progress,
    modalState,
    addCallback,
    uploadIsComplete,
  }
}
