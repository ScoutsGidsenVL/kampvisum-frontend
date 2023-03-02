export interface FileItem {
  readonly id: string
  contentType?: string
  url?: string
  name?: string
  directory_path?: string
  size?: string
  createdOn?: string
  isChecked?: boolean
}

export const FileDeserializer = (input: any): FileItem => {
  const single: FileItem = {
    id: input.id ? input.id.toString() : undefined,
    contentType: input.content_type ? input.content_type : undefined,
    url: input.url ? input.url : undefined,
    name: input.name ? input.name : input.filename ? input.filename : undefined,
    size: input.size ? input.size : undefined,
    directory_path: input.directory_path ? input.directory_path : undefined,
    createdOn: input.created_on ? input.created_on : undefined,
  }

  return single
}

export const FileSerializer = (input: any): any => {
  const single: any = {
    id: input.id ? input.id.toString() : undefined,
    content_type: input.contentType ? input.contentType : undefined,
    url: input.url ? input.url : undefined,
    name: input.name ? input.name : undefined,
    size: input.size ? input.size : undefined,
  }

  return single
}
