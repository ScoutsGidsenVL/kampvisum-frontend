export interface NumberCheck {
  value: any
}

export const NumberCheckDeserializer = (input: any): NumberCheck => {
  const single: NumberCheck = {
    value: input.value ? input.value : undefined
  }
  return single
}

export const NumberCheckSerializer = (number: string): any => {
  const single: any = {
    value: number
  }
  return single
}
