export interface CheckType {
  id?: string
  checkType: string
}

export const CheckTypeDeserializer = (input: any): CheckType => {
  const single: CheckType = {
    id: input.id,
    checkType: input.check_type
  }

  return single
}

