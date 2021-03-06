import { CampType } from "./CampType"
import { Category, CategoryDeserializer } from "./Category"
import { Section, SectionDeserializer } from "./Section"
import { YearDeserializer } from "./Year"

export interface Camp {
  createdBy?: string
  createdOn?: string
  endDate?: string
  id: string
  name: string
  sections: Array<string> | Array<Section>
  startDate?: string
  updatedBy?: string
  updatedOn?: string
  year?: any
  categories?: Array<Category>
  campTypes?: Array<string>
}

export const CampDeserializer = (input: any): Camp => {
  const single: Camp = {
    campTypes: input.camp_types ? input.camp_types : undefined,
    createdBy: input.created_by ? input.created_by : undefined,
    createdOn: input.created_on ? input.created_on : undefined,
    endDate: input.end_date,
    id: input.id,
    name: input.name,
    sections: input.sections ? input.sections.map((section: any) => SectionDeserializer(section)) : undefined,
    startDate: input.start_date,
    updatedBy: input.updated_by ? input.updated_by : undefined,
    updatedOn: input.updated_on ? input.updated_on : undefined,
    year: input.year ? YearDeserializer(input.year) : undefined,
    categories: input.categories ? input.categories.map((category: any) => CategoryDeserializer(category)) : undefined,
  }

  return single
}

export const CampSerializer = (input: any): any => {
  const single: any = {
    name: input.name,
    start_date: input.startDate,
    end_date: input.startDate,
    sections: input.sections,
  }
  let arr: any[] = []
  input.campTypes && input.campTypes.forEach((c: string) => {
    arr.push({ camp_type: c })
  })
  // single.camp_types = arr
  return { camp: single, camp_types: arr }
}

