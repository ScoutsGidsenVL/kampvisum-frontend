const { DateTime } = require("luxon");

export interface Value {
  startDate: string
  endDate: string
}

export const ValueDeserializer = (input: any): Value => {
  const single: Value = {
    startDate: input.start_date ? input.start_date : '',
    endDate: input.end_date ? input.end_date : ''
  }
  return single
}

export interface DurationDateCheck {
  id?: string
  value?: Value
  endpoint: string
  dates?: Array<string>
}

export const DurationDateCheckDeserializer = (input: any): DurationDateCheck => {
  const single: DurationDateCheck = {
    id: input.id,
    value: input.value ? ValueDeserializer(input.value) : undefined,
    endpoint: input.endpoint ? input.endpoint : undefined
  }
  return single
}

export const DurationDateCheckSerializer = (dates: Array<string>): any => {
  const single: any = {
    start_date: DateTime.fromFormat(dates[0],'dd MMM yyyy').toFormat('yyyy-MM-dd'),
    end_date: DateTime.fromFormat(dates[1],'dd MMM yyyy').toFormat('yyyy-MM-dd')
  }
  return single
}

