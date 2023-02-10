export interface CampType {
  id?: string,
  explanation?: string
  index?: string
  label?: string
  campType?: string
  isBase?: boolean
  isDefault?: boolean
  createdBy?: string
  createdOn?: string
  updatedBy?: string
  updatedOn?: string
}

export const CampTypeDeserializer = (input: any): CampType => {
  const single: CampType = {
    id: input.id,
    explanation: input.explanation,
    index: input.index,
    label: input.label,
    campType: input.camp_type,
    isBase: input.is_base,
    isDefault: input.is_default,
    createdBy: input.created_by ? input.created_by : undefined,
    createdOn: input.created_on,
    updatedBy: input.updated_by ? input.updated_by : undefined,
    updatedOn: input.updated_on
  }

  return single
}

export const CampTypeSerializer = (input: any): any => {
  const single: any = {

  }
  return single
}
