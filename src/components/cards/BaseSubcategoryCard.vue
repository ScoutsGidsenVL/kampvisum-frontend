<template>
  <div>
    <div class="p-3 border border-lightGray flex gap-6 flex-col">
      <header-subcategory-card :title="title" />
      <!-- LOOP TROUGH ALL CONCERNS AND DISPLAY DEPENDING ON THE GIVEN TYPE-->
      <div v-for="(concern) in concerns" :key="concern" >
        <concern-switch :concernType="concern" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import OverviewFiles from '../upload/overviewFiles.vue'
import ConcernSwitch from '@/components/cards/ConcernSwitch.vue'
import HeaderSubcategoryCard from '../semantics/HeaderSubcategoryCard.vue'

export interface SubCategoryState {
  hasTextFieldSection: boolean,
  hasFileSection: boolean,
  hasChecksSection: boolean,
  hasMessageSection: boolean,
}

export default defineComponent({
  name: 'BaseSubcategoryCard',
  components: {
    'overview-files': OverviewFiles,
    'concern-switch': ConcernSwitch,
    'header-subcategory-card': HeaderSubcategoryCard,
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
    baseState: {
      type: Object as PropType<SubCategoryState>,
      required: false,
      default: () => { return { hasTextFieldSection: false, hasFileSection: false } }
    }
  },
  setup() {
    const textField = ref<string>('')
    const concerns = ref<any>(['Message', 'SimpleCheck', 'InputCheck', 'FileUploadCheck'])

    return {
      concerns,
      textField
    }
  },
})
</script>
