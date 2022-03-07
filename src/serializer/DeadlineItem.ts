import { Check, CheckDeserializer } from "./Check"
import { SubCategory, SubCategoryDeserializer } from "./SubCategory"
import { DeadlineItemParent, DeadlineItemParentDeserializer } from "./DeadlineItemParent"
import { FlagDeserializer, Flag } from "./Flag"

export interface DeadlineItem {
    id?: string
    linkedCheck?: Check
    linkedSubCategory?: SubCategory
    flag?: Flag
    deadlineItemParent?: DeadlineItemParent
    items?: Array<DeadlineItem>
    state?: string
}

export const DeadlineItemDeserializer = (input: any): DeadlineItem => {
    const single: DeadlineItem = {
        id: input.id,
        linkedSubCategory: input.linked_sub_category ? SubCategoryDeserializer(input.linked_sub_category) : undefined,
        linkedCheck: input.linked_check ? CheckDeserializer(input.linked_check) : undefined,
        flag: input.flag ? FlagDeserializer(input.flag) : undefined,
        deadlineItemParent: input.parent ? DeadlineItemParentDeserializer(input.parent) : undefined,
        state: input.state ? input.state : 'UNCHECKED'
    }

    return single
}

export const DeadlineItemSerializer = (input: DeadlineItem): any => {
    const single: any = {
        id: input.id,
        // due_date: DueDateSerializer(input.dueDate),
        // deadline_check: { id: input.deadlineCheck.id }
    }
    return single
}
