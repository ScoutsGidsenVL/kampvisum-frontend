
export interface Year {
  readonly createdBy: string
  readonly createdOn: string
  readonly endDate: string
  readonly id?: string
  readonly startDate?: string
  readonly updatedBy?: string
  readonly updatedOn?: string
  readonly year?: string
}

export const YearDeserializer = (input: any): Year => {
  const single: Year = {
    createdBy: input.created_by ? input.input.created_by : undefined,
    createdOn: input.created_on ? input.created_on : undefined,
    endDate: input.end_date ? input.end_date : undefined,
    id: input.id ? input.id : undefined,
    startDate: input.start_date ? input.start_date : undefined,
    updatedBy: input.updated_by ? input.updated_by : undefined,
    updatedOn: input.updated_on ? input.updated_on : undefined,
    year: input.year ? input.year : undefined
  }
  return single
}
