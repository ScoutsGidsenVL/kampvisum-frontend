<template>
  <div>
    <div class="p-3 border border-lightGray flex gap-6 flex-col">
      <header-subcategory-card :subCategory="subCategory" @openSidebar="openSidebar()" />
      <check-switch v-for="(check) in checks" :key="check" :camp="visum.camp" :check="check" :checkType="check.checkParent.checkType.checkType" />
    </div>
  </div>
</template>

<script lang="ts">
import HeaderSubcategoryCard from '../semantics/HeaderSubcategoryCard.vue'
import CheckSwitch from '@/components/cards/CheckSwitch.vue'
const LitepieDatepicker = require('litepie-datepicker')
import { SubCategory } from '@/serializer/SubCategory'
import { defineComponent, PropType, ref } from 'vue'
import { Check } from '@/serializer/Check'
import { Visum } from '@/serializer/Visum'

export default defineComponent({
  name: 'BaseSubcategoryCard',
  components: {
    'check-switch': CheckSwitch,
    'header-subcategory-card': HeaderSubcategoryCard,
    'litepie-datepicker': LitepieDatepicker
  },
  props: {
    subCategory: {
      type: Object as PropType<SubCategory>,
      required: true,
    },
    titleTextfield: {
      type: String,
      required: false,
    },
    visum: {
      type: Object as PropType<Visum>,
      required: true,
    },
    checks: Array as PropType<Check[]>
  },
  setup(props, context) {
    const textField = ref<string>('')
    const openSidebar = () => {
      context.emit('openSidebar')
    }
    return {
      textField,
      openSidebar
    }
  },
})
</script>
