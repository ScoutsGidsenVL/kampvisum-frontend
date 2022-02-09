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
  campType?: CampType
}

export const CampDeserializer = (input: any): Camp => {
  const single: Camp = {
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
    camp_type: { id: input.campType.id }
  }
  
  return {camp: single}
}

