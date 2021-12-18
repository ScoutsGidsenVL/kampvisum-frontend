<template>
  <div>
    <h1 class="text-lg">{{ location.title }}</h1>
    <h4 class="text-sm text-green">{{ location.type }}</h4>
    <div class="py-3">
      <a class="text-sm" target="_blank" :href="'https://www.google.com/maps?q=' + location.address">{{ location.address }}</a>  
    </div>    
    <div class="bg-lighterGreen py-2 px-1 border-l-2 border-green flex flex-col gap-2">
      <div class="flex gap-3 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
        </svg>
        <span>{{ location.contactPerson.name }}</span>
      </div>

      <div class="flex gap-2 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
        <a target="_blank" :href="'tel:' + location.contactPerson.phoneNumber">{{ location.contactPerson.phoneNumber }}</a>
      </div>
    </div>

    <div class="flex justify-between">
      <div class="flex items-center gap-2 justify-center cursor-pointer text-green hover:text-lightGreen">
        <p class="underline">Bewerk</p>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
      </div>

      <div class="flex items-center gap-2 justify-center cursor-pointer text-red hover:text-lightRed">
        <p class="underline">Verwijder</p>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'CustomPopup',
  props: {
    location: {
      type: Object as PropType<Location>,
      required: false
    }
  }
})
</script>
