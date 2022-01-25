export interface CheckType {
  id?: string
  checkType: string
  description?: string
}

export const CheckTypeDeserializer = (input: any): CheckType => {
  const single: CheckType = {
    id: input.id,
    checkType: input.check_type,
    description: input.description
  }

  return single
}

