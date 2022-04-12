import { CheckDeserializer } from "./Check"
import { DeadlineCategory, DeadlineCategoryDeserializer } from "./DeadlineCategory"
import { SubCategoryParent, SubCategoryParentDeserializer } from "./SubCategoryParent"
export interface SubCategory {
  checks?: []
  id?: string
  subCategoryParent?: SubCategoryParent
  state: string
  category?: DeadlineCategory
  name?: string
  label?: string
  feedback?: string
}

export const SubCategoryDeserializer = (input: any): SubCategory => {
  const single: SubCategory = {
    checks: input.checks ? input.checks.filter((x: any) => x !== null).map((c: any) => CheckDeserializer(c)) : undefined,
    id: input.id,
    subCategoryParent: input.parent ? SubCategoryParentDeserializer(input.parent) : undefined,
    state: input.state ? input.state : 'UNCHECKED',
    category: input.category ? DeadlineCategoryDeserializer(input.category) : undefined,
    name: input.name ? input.name : undefined,
    label: input.label ? input.label : undefined,
    feedback: input.feedback ? input.feedback : 'Feedback op een subcategory!'
  }
  return single
}

export const SubCategorySerializer = (input: any): any => {
  const single: any = {
    name: input.name,
  }
  return single
}
