import { CheckDeserializer } from "./Check"
import { DeadlineCategory, DeadlineCategoryDeserializer } from "./DeadlineCategory"
import { SubCategoryParent, SubCategoryParentDeserializer } from "./SubCategoryParent"
export interface SubCategory {
  checks?: []
  id?: string
  subCategoryParent?: SubCategoryParent
  state: string,
  category?: DeadlineCategory
}

export const SubCategoryDeserializer = (input: any): SubCategory => {
  const single: SubCategory = {
    checks: input.checks ? input.checks.map((c: any) => CheckDeserializer(c)) : undefined,
    id: input.id,
    subCategoryParent: input.parent ? SubCategoryParentDeserializer(input.parent) : undefined,
    state: input.state ? input.state : 'UNCHECKED',
    category: input.category ? DeadlineCategoryDeserializer(input.category) : undefined
  }
  return single
}

export const SubCategorySerializer = (input: any): any => {
  const single: any = {
    name: input.name,
  }
  return single
}
