export interface CommentCheck {
  value: any
}

export const CommentCheckDeserializer = (input: any): CommentCheck => {
  const single: CommentCheck = {
    value: input.value ? input.value : undefined
  }
  return single
}

export const CommentCheckSerializer = (comment: string): any => {
  const single: any = {
    value: comment
  }
  return single
}
