<template>
  <div @click="navigateTowardsCategory(category.categoryParent.name, visum, category.id)" class="p-3 cursor-pointer shadow-md rounded-md hover:bg-lighterGreen" style="height: 300px">
    <div class="z-2">
      <h2 class="mb-3 mt-0 text-xl font-semibold font-museo">{{ category.categoryParent.label }}</h2>
      <div v-if="
        (selectedGroup.isDistrictCommissioner || selectedGroup.isGroupLeader || selectedGroup.isSectionLeader) 
        && visum.engagement.leaders 
        && visum.engagement.groupLeaders" class="font-bold bg-lighterGreen p-2 -m-2" style="width:fit-content">DC</div>

      <div style="width:fit-content" @click.stop="navigateTowardsSubCategory(category, subCategory)" v-for="subCategory in category.subCategories" :key="subCategory" class="d-flex gap-3 my-2.5 items-center group">
        <!-- DC CHECKS -->
        <div v-if="
        (selectedGroup.isDistrictCommissioner || selectedGroup.isGroupLeader || selectedGroup.isSectionLeader) 
        && visum.engagement.leaders 
        && visum.engagement.groupLeaders" class="bg-lighterGreen p-2 -m-2">
          <i-checked v-if="subCategory.approval === StatusFeedbackState.APPROVED" />
          <i-empty-check v-if="subCategory.approval === StatusFeedbackState.UNDECIDED" /> 
          <i-checked-cross v-if="subCategory.approval === StatusFeedbackState.DISAPPROVED || subCategory.approval === StatusFeedbackState.FEEDBACK_RESOLVED" /> 
          <i-check-warning v-if="subCategory.approval === StatusFeedbackState.APPROVED_FEEDBACK" /> 
          <i-check-warning v-if="subCategory.approval === StatusFeedbackState.FEEDBACK_READ" />
        </div>

        <!-- OTHER CHECKS-->
        <i-checked v-if="(subCategory.approval === StatusFeedbackState.APPROVED) || (subCategory.approval === StatusFeedbackState.FEEDBACK_READ)" />
        <i-checked-cross v-if="subCategory.approval === StatusFeedbackState.DISAPPROVED" />
        <i-check-warning v-if="subCategory.approval === StatusFeedbackState.APPROVED_FEEDBACK" />  
          <i-checked v-if="subCategory.approval === StatusFeedbackState.FEEDBACK_RESOLVED" />
        <div v-if="
        !(subCategory.approval === StatusFeedbackState.DISAPPROVED) 
        && !(subCategory.approval === StatusFeedbackState.APPROVED_FEEDBACK) 
        && !(subCategory.approval === StatusFeedbackState.FEEDBACK_RESOLVED) 
        && !(subCategory.approval === StatusFeedbackState.APPROVED)
        && !(subCategory.approval === StatusFeedbackState.FEEDBACK_READ)">
          <i-checked v-if="subCategory.state === 'CHECKED'" />
          <i-empty-check v-if="subCategory.state === 'UNCHECKED'" />
        </div>
        
        <h4 class="group-hover:underline mb-0 ml-0 text-md font-museo font-medium">{{ subCategory.subCategoryParent.label }}</h4>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { useNavigation } from '../../composable/useNavigation'
import { Category } from '../../serializer/Category'
import IEmptyCheck from '../icons/IEmptyCheck.vue'
import { defineComponent, PropType } from 'vue'
import IChecked from '../icons/IChecked.vue'
import { Visum, VisumStates } from '@/serializer/Visum'
import { useRoute } from 'vue-router'
import router from '@/router'
import useGroupAndYears from '@/composable/useGroupAndYears'
import {StatusFeedbackState} from '../semantics/Feedback.vue'
import ICheckedCross from '../icons/ICheckedCross.vue'
import ICheckWarning from '../icons/ICheckWarning.vue'
export default defineComponent({
  name: 'CategoryInfoCard',
  components: { IEmptyCheck, IChecked, ICheckedCross, ICheckWarning },
  props: {
    category: {
      type: Object as PropType<Category>,
      required: true,
    },
    visum: {
      type: Object as PropType<Visum>,
      required: true,
    },
  },
  setup() {
    const { navigateTowardsCategory } = useNavigation()
    const route = useRoute()
    const { selectedGroup } = useGroupAndYears()

    const navigateTowardsSubCategory = (category: Category) => {
      router.push('/kamp/' + route.params.campId.toString() + '/category/' + category.id)
    }

    return {
      navigateTowardsSubCategory,
      navigateTowardsCategory,
      route,
      VisumStates,
      selectedGroup,
      StatusFeedbackState
    }
  },
})
</script>
