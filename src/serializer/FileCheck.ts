import { FileItem } from "./FileItem"

export interface FileCheck {
  id?: string
  value?: string
  endpoint: string
}

export const FileCheckDeserializer = (input: any): FileCheck => {
  const single: FileCheck = {
    id: input.id,
    value: input.value ? input.value : undefined,
    endpoint: input.endpoint ? input.endpoint : undefined
  }
  return single
}

export const FileCheckSerializer = (input: FileItem[]): any => {
  let filesToPost: {'id': string}[] = []

  input.forEach((file: FileItem) => {
    if (file.isChecked && file.id) {
      filesToPost.push({id: file.id})
    }
  })

  const array: any = {
    value: filesToPost
  }
  
  return array
}

