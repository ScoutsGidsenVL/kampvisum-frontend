<template>
  <div :id="subCategory.id">
    <div class="pt-3 border border-lightGray flex gap-0 flex-col">
      <header-subcategory-card :subCategory="subCategory" @openSidebar="openSidebar()" />
      <check-switch @rl="rl($event)" v-for="check in checks" :key="check" :visum="visum" :camp="visum.camp" :check="check" :checkType="check.checkParent.checkType.checkType" />
      <feedback v-if="selectedGroup.isDistrictCommissioner && visum.state === VisumStates.SIGNABLE && visum.engagement.leaders && visum.engagement.groupLeaders " :subCategory="subCategory" :visum="visum" />
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
import Feedback from '../semantics/Feedback.vue'
import useGroupAndYears from '@/composable/useGroupAndYears'

export default defineComponent({
  name: 'BaseSubcategoryCard',
  components: {
    'check-switch': CheckSwitch,
    'header-subcategory-card': HeaderSubcategoryCard,
    'litepie-datepicker': LitepieDatepicker,
    Feedback,
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


    const openSidebar = () => {
      emit('openSidebar')
    }

    const rl = () => {
      emit('rl', true)
    }

    return {
      openSidebar,
      selectedGroup,
      rl,
      VisumStates
    }
  },
})
</script>
