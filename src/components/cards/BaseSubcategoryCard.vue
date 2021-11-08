<template>
  <div>
    <div class="p-3 border border-lightGray flex gap-6 flex-col">
      <header-subcategory-card :hasInfo="true" :title="title" @openSidebar="openSidebar()" />
      <!-- LOOP TROUGH ALL CONCERNS AND DISPLAY DEPENDING ON THE GIVEN TYPE-->
      <div v-for="(concern) in concerns" :key="concern" >
        <concern-switch :camp="camp" :concernType="concern" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
const LitepieDatepicker = require('litepie-datepicker')
import ConcernSwitch from '@/components/cards/ConcernSwitch.vue'
import HeaderSubcategoryCard from '../semantics/HeaderSubcategoryCard.vue'
import { Camp } from '@/serializer/Camp'

export default defineComponent({
  name: 'BaseSubcategoryCard',
  components: {
    'concern-switch': ConcernSwitch,
    'header-subcategory-card': HeaderSubcategoryCard,
    'litepie-datepicker': LitepieDatepicker
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    titleTextfield: {
      type: String,
      required: false,
    },
    camp: {
      type: Object as PropType<Camp>,
      required: true,
    },
    concerns: Array
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
