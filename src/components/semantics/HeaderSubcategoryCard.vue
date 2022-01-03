<template>
  <div class="flex justify-between items-center">
    <div class="flex items-center gap-3">
      <div>
        <h4 class="font-semibold font-sans m-0">{{title}}</h4>
      </div>
      <div v-if="hasInfo" class="cursor-pointer">
        <i-info :info="'setting the info in the information sidebar and open the information sidebar'" />
      </div>
    </div>
    <div class="mt-3 cursor-pointer flex gap-3 text-darkGray hover:text-black stroke-current text-darkGray">
      <p class="underline">Vorig jaar</p>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import IInfo from '../icons/IInfo.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HeaderSubcategoryCard',
  props: {
    title: {
      type: String,
      required: true,
    },
    hasInfo: Boolean
  },
  components: {
    IInfo
  },
  setup (props, context) {
    return {
    }
  }
})
</script>
