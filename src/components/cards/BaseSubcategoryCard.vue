<template>
  <div>
    <div class="p-3 border border-lightGray">

      <!-- CARD HEADER -->
      <div class="flex justify-between">
        <div>
          <h4 class="font-semibold font-sans">{{title}}</h4>
        </div>
        <div class="cursor-pointer flex gap-3">
          <p class="underline text-darkGray">Vorig jaar</p>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="darkGray">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      <!-- TEXTFIELD -->
      <div v-if="baseState.hasTextFieldSection">
        <custom-input v-model="textField" textAreaWidth="w-100 w-100" :type="InputTypes.TEXT_AREA" :name="'Opmerkingen'" :label="'Opmerkingen'" />
      </div>

      <!-- FILES -->
      <div v-if="baseState.hasFileSection" class="mt-5">
        <file-item />
        <file-item />
        <file-item />
        <div>
        <div class="flex justify-between bg-gray p-3">
          <custom-button text="+ voeg document toe" extraStyle="md:pl-6 md:pr-6" />
        </div>
      </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { InputTypes, CustomButton, CustomInput } from 'vue-3-component-library'
import FileItem from '../upload/FileItem.vue'

export interface SubCategoryState {
  hasTextFieldSection: boolean,
  hasFileSection: boolean
}

export default defineComponent({
  name: 'BaseSubcategoryCard',
  components: {
    CustomInput,
    'file-item': FileItem,
    'custom-button': CustomButton
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    baseState: {
      type: Object as PropType<SubCategoryState>,
      required: false,
      default: () => { return { hasTextFieldSection: false, hasFileSection: false } }
    }
  },
  setup() {
    const textField = ref<string>('')

    return {
      InputTypes,
      textField
    }
  },
})
</script>
