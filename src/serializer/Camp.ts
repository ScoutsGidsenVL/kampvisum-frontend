import { Category, CategoryDeserializer } from "./Category"
import { Section, SectionDeserializer } from "./Section"

export interface Camp {
  id?: string
  uuid: string
  name?: string
  endDate?: string
  startDate?: string
  sections?: Array<string> | Array<Section>
  categories?: Array<Category>
}

export const CampDeserializer = (input: any): Camp => {
  const single: Camp = {
    id: input.id,
    uuid: input.uuid,
    name: input.name,
    startDate: input.start_date,
    endDate: input.end_date,
    sections: input.sections.map((section: any) => SectionDeserializer(section)),
    categories: input.categories.map((category: any) => CategoryDeserializer(category))
  }

  return single
}

export const CampSerializer = (input: any): any => {
  const single: any = {
    name: input.name,
    start_date: input.startDate,
    end_date: input.startDate,
    sections: input.sections
  }
  return single
}

