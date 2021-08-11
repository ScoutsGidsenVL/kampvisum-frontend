export interface Camp {
  id?: String
  name?: String
  endDate?: String
  startDate?: String
}

export const CampDeserializer = (input: any): Camp => {
  const single: Camp = {
    id: input.uuid,
    name: input.name,
    startDate: input.start_date,
    endDate: input.end_date,
  }

  return single
}

export const CampSerializer = (input: any): any => {
  const single: any = {
    name: input.name,
    start_date: input.startDate,
    end_date: input.startDate
  }
  return single
}

