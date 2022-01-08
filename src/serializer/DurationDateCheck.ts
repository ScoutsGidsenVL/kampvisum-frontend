import { CheckParent, CheckParentDeserializer } from "./CheckParent"
const { DateTime } = require("luxon");

export interface DurationDateCheck {
  id?: string
  value?: string
  endpoint: string
  dates?: Array<string>
}

export const DurationDateCheckDeserializer = (input: any): DurationDateCheck => {
  const single: DurationDateCheck = {
    id: input.id,
    value: input.value ? input.value : undefined,
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

// const formatDatesToString = (dates: Array<string>) => {
// const data = { "start_date": DateTime.fromFormat(dates[0],'dd MMM yyyy').toFormat('yyyy-MM-dd'), "end_date": DateTime.fromFormat(dates[1],'dd MMM yyyy').toFormat('yyyy-MM-dd') }
// console.log('DURATION DATA TO SEND: ', data)
// return JSON.stringify(data)
// }

const formatDatesToString = (dates: Array<string>) => {
  const start_date =  DateTime.fromFormat(dates[0],'dd MMM yyyy').toFormat('yyyy-MM-dd')
  const end_date = DateTime.fromFormat(dates[1],'dd MMM yyyy').toFormat('yyyy-MM-dd')
  const data = `{ "start_date": "${start_date}", "end_date": "${end_date}" }`
  return data
}

