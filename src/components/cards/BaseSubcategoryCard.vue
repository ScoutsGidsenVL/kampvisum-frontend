<template>
  <div>
    <div class="p-3 border border-lightGray flex gap-6 flex-col">
      <header-subcategory-card :subCategory="subCategory" @openSidebar="openSidebar()" />

      <!-- LOOP TROUGH ALL CONCERNS AND DISPLAY DEPENDING ON THE GIVEN TYPE-->
      <div v-for="(check) in checks" :key="check" >
        <concern-switch :camp="visum.camp" :check="check" :checkType="check.checkParent.checkType.checkType" />
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
const LitepieDatepicker = require('litepie-datepicker')
import ConcernSwitch from '@/components/cards/CheckSwitch.vue'
import HeaderSubcategoryCard from '../semantics/HeaderSubcategoryCard.vue'
import { Camp } from '@/serializer/Camp'
import { Check } from '@/serializer/Check'
import { Visum } from '@/serializer/Visum'
import { SubCategory } from '@/serializer/SubCategory'

export default defineComponent({
  name: 'BaseSubcategoryCard',
  components: {
    'concern-switch': ConcernSwitch,
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
