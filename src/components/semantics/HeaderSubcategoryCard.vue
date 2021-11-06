<template>
  <div class="flex justify-between">
    <div class="flex items-center gap-3">
      <div>
        <h4 class="font-semibold font-sans m-0">{{title}}</h4>
      </div>
      <div v-if="hasInfo" @click="openInfo()" class="cursor-pointer">
        <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.8066 2.69995C9.87942 -0.230768 5.13073 -0.233682 2.19997 2.69341C-0.73076 5.62057 -0.73371 10.3693 2.19345 13.3001C5.12055 16.2308 9.86932 16.2337 12.8001 13.3066C15.7308 10.3795 15.7337 5.63068 12.8066 2.69995ZM8.5472 12.7591C8.5472 12.8748 8.45342 12.9685 8.33776 12.9685H6.66228C6.54663 12.9685 6.45285 12.8748 6.45285 12.7591V6.53932C6.45285 6.4236 6.54663 6.32989 6.66228 6.32989H8.33776C8.45342 6.32989 8.5472 6.42356 8.5472 6.53932V12.7591ZM7.50002 5.46071C6.83028 5.46071 6.28536 4.91586 6.28536 4.24608C6.28536 3.57637 6.83024 3.03141 7.50002 3.03141C8.1698 3.03141 8.71469 3.57633 8.71469 4.24608C8.71469 4.91586 8.16973 5.46071 7.50002 5.46071Z" fill="black"/>
        </svg>
      </div>
    </div>
    <div class="cursor-pointer flex gap-3 text-darkGray hover:text-black stroke-current text-darkGray">
      <p class="underline">Vorig jaar</p>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export interface SubCategoryState {
  hasTextFieldSection: boolean,
  hasFileSection: boolean,
  hasChecks: boolean
}

export default defineComponent({
  name: 'HeaderSubcategoryCard',
  props: {
    title: {
      type: String,
      required: true,
    },
    hasInfo: Boolean
  },
  setup () {
    const openInfo = () => {
      console.log('set the info in the information sidebar and open the information sidebar')
    }

    return {
      openInfo
    }
  }
})
</script>
