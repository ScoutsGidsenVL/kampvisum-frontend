import { SubCategory, SubCategoryDeserializer } from "./SubCategory"
import { Check, CheckDeserializer } from "./Check"
import { Flag, FlagDeserializer } from "./Flag"


// 
export interface DeadlineItemParent {
  id?: string
  deadlineItemType?: string
  index?: number
  itemSubCategory?: SubCategory
  itemCheck?: Check
  itemFlag?: Flag
}

export const DeadlineItemParentDeserializer = (input: any): DeadlineItemParent => {
  const single: DeadlineItemParent = {
    id: input.id ? input.id : undefined,
    deadlineItemType: input.deadline_item_type ? input.deadline_item_type : undefined,
    index: input.index ? input.index : 0,
    itemSubCategory: input.item_sub_category ? SubCategoryDeserializer(input.item_sub_category) : undefined,
    itemCheck: input.item_check ? CheckDeserializer(input.item_check) : undefined,
    itemFlag: input.item_flag ? FlagDeserializer(input.item_flag) : undefined,
  }

  return single
}

export const DeadlineItemParentSerializer = (input: DeadlineItemParent): any => {
  const single: any = {
    // visum: input.visum,
    // name: input.name,
    // label: input.label,
    // description: input.description,
    // explanation: input.explanation,
    // important: input.important,
    // due_date: DueDateSerializer(input.dueDate),
    // deadline_check: { id: input.deadlineCheck.id }
  }
  return single
}
