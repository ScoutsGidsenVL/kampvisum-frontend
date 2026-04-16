export interface SelectCheck {
  value: any
}

export const SelectCheckDeserializer = (input: any): SelectCheck => {
  const single: SelectCheck = {
    value: input.value ? input.value : undefined
  }
  return single
}

export const SelectCheckSerializer = (value: string): any => {
  const single: any = {
    value: value
  }
  return single
}
