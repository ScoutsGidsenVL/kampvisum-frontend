<template>
  <div :id="subCategory.id">
    <div class="pt-3 border border-lightGray flex gap-0 flex-col">
      <header-subcategory-card :subCategory="subCategory" @openSidebar="openSidebar()" />
        <message
        v-if="(subCategory.approval === StatusFeedbackState.APPROVED && subCategory.feedback)
        || subCategory.approval === StatusFeedbackState.APPROVED_FEEDBACK 
        || subCategory.approval === StatusFeedbackState.DISAPPROVED"
        class="my-3" 
        :title="t('engagement.feedback-dc')" 
        :text="subCategory.feedback" 
        :color="
        (subCategory.approval === StatusFeedbackState.APPROVED) ? {state: ColorState.SUCCES} : 
        subCategory.approval === StatusFeedbackState.APPROVED_FEEDBACK ? {state: ColorState.WARNING} : 
        subCategory.approval === StatusFeedbackState.DISAPPROVED ? {state: ColorState.DANGER} : {state: ColorState.SUCCES}"
        :hasCheck="true"
        :subCategory="subCategory" 
        @rl="rl($event)"
        />
      <check-switch @rl="rl($event)" v-for="check in checks" :key="check" :visum="visum" :camp="visum.camp" :check="check" :checkType="check.checkParent.checkType.checkType" />
      <feedback @rl="rl($event)" v-if="selectedGroup.isDistrictCommissioner && visum.engagement.leaders && visum.engagement.groupLeaders" :subCategory="subCategory" :visum="visum" />
    </div>
  </div>
</template>

<script lang="ts">
import HeaderSubcategoryCard from '../semantics/HeaderSubcategoryCard.vue'
import CheckSwitch from '@/components/cards/CheckSwitch.vue'
const LitepieDatepicker = require('litepie-datepicker')
import { SubCategory } from '@/serializer/SubCategory'
import { defineComponent, PropType } from 'vue'
import { Check } from '@/serializer/Check'
import { Visum, VisumStates } from '@/serializer/Visum'
import Feedback, {StatusFeedbackState} from '../semantics/Feedback.vue'
import Message, {ColorState} from '../semantics/message.vue'
import useGroupAndYears from '@/composable/useGroupAndYears'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'BaseSubcategoryCard',
  components: {
    'check-switch': CheckSwitch,
    'header-subcategory-card': HeaderSubcategoryCard,
    'litepie-datepicker': LitepieDatepicker,
    Feedback,
    Message
  },
  props: {
    subCategory: {
      type: Object as PropType<SubCategory>,
      required: true,
    },
    visum: {
      type: Object as PropType<Visum>,
      required: true,
    },
    checks: Array as PropType<Check[]>,
  },
  setup(props, { emit }) {
    const { selectedGroup } = useGroupAndYears()

    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    const openSidebar = () => {
      emit('openSidebar')
    }

    const rl = () => {
      emit('rl', true)
    }

    return {
      StatusFeedbackState,
      selectedGroup,
      openSidebar,
      VisumStates,
      ColorState,
      rl,
      t,
    }
  },
})
</script>
