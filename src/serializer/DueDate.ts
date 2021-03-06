export interface DueDate {
  dateDay: number
  dateMonth: number
  dateYear: number
  calculatedDate: string
}

export const DueDateDeserializer = (input: any): DueDate => {
  const single: DueDate = {
    dateDay: input.date_day ? input.date_day : 10,
    dateMonth: input.date_month ? input.date_month : 2,
    dateYear: input.date_year ? input.date_year : 2022,
    calculatedDate: input.calculated_date ? input.calculated_date : undefined,
  }
  return single
}

export const DueDateSerializer = (input: DueDate): any => {
  const single: any = {
    date_day: input.dateDay,
    date_month: input.dateMonth
  }
  return single
}
