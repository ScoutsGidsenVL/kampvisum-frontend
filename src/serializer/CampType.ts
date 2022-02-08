export interface CampType {
  id?: string,
  createdOn?: string
  updatedOn?: string
  explanation?: string
  index?: string
  label?: string
  campType?: string
  isBase?: boolean
  isDefault?: boolean
  createdBy?: string
  updatedBy?: string
}

export const CampTypeDeserializer = (input: any): CampType => {
  const single: CampType = {
    id: input.id,
    createdOn: input.created_on,
    updatedOn: input.updated_on,
    explanation: input.explanation,
    index: input.index,
    label: input.label,
    campType: input.camp_type,
    isBase: input.is_base,
    isDefault: input.is_default,
    createdBy: input.created_by ? input.created_by : undefined,
    updatedBy: input.updated_by ? input.updated_by : undefined
  }

  return single
}

export const CampTypeSerializer = (input: any): any => {
  const single: any = {

  }
  return single
}
