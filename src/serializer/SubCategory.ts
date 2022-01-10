import { CheckDeserializer } from "./Check"
import { SubCategoryParent, SubCategoryParentDeserializer } from "./SubCategoryParent"
export interface SubCategory {
  checks?: []
  id?: string
  subCategoryParent?: SubCategoryParent
}

export const SubCategoryDeserializer = (input: any): SubCategory => {
  const single: SubCategory = {
    checks: input.checks ? input.checks.map((c: any) => CheckDeserializer(c)) : undefined,
    id: input.id,
    subCategoryParent: input.parent ? SubCategoryParentDeserializer(input.parent) : undefined
  }
  return single
}

export const SubCategorySerializer = (input: any): any => {
  const single: any = {
    name: input.name,
  }
  return single
}
