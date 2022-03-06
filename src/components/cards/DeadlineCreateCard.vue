<template>
  <div class="bg-gray p-3">
    <custom-input :isSubmitting="isSubmitting" :type="InputTypes.TEXT" rules="required" :name="'category' + index" label="Categorie" />
    <custom-input :isSubmitting="isSubmitting" :type="InputTypes.TEXT" rules="required" :name="'lable' + index" label="Label" />

    <div class="mt-3 flex items-center gap-3 hover:text-red cursor-pointer">
      <span @click="removeItemFromArray()" class="underline">verwijder</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 stroke-current" fill="none" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CustomInput, InputTypes } from 'vue-3-component-library'

export default defineComponent({
  name: 'DeadlineCreateCard',
  components: {
    CustomInput,
  },
  props: {
    index: String,
  },
  setup(props, context) {
    const removeItemFromArray = () => {
      context.emit('removeItemFromArray', props.index)
    }
    return {
      InputTypes,
      removeItemFromArray,
    }
  },
})
</script>
