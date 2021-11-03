<template>
  <div class="bg-white shadow-md">
    <div v-if="isImportant" class="border-l-4 border-red p-2 flex items-center gap-3">
      <svg class="ml-1.5" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.99984 18.3332C14.6022 18.3332 18.3332 14.6022 18.3332 9.99984C18.3332 5.39746 14.6022 1.6665 9.99984 1.6665C5.39746 1.6665 1.6665 5.39746 1.6665 9.99984C1.6665 14.6022 5.39746 18.3332 9.99984 18.3332Z" stroke="#C63024" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10 6.6665V9.99984" stroke="#C63024" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10 13.3335H10.0083" stroke="#C63024" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <div>
        <h1 class="text-lg m-0">test</h1>
      </div>
    </div>
    <div class="flex justify-between p-3">
      <div class="flex items-center">
        <!-- CHECK ICON -->
        <div class="mr-2.5">
          <svg v-if="true" class="mt-1 fill-current text-green" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.393 7.5l-5.643 5.784-2.644-2.506-1.856 1.858 4.5 4.364 7.5-7.643-1.857-1.857z"/></svg>
          <!-- <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M 12 2 c 5.514 0 10 4.486 10 10 s -4.486 10 -10 10 s -10 -4.486 -10 -10 s 4.486 -10 10 -10 z m 0 -2 c -6.627 0 -12 5.373 -12 12 s 5.373 12 12 12 s 12 -5.373 12 -12 s -5.373 -12 -12 -12 z z"/></svg> -->
        </div>

        <div>
          <strong class="xs:text-sm">
            Kampplaats
          </strong>
          <p>
            september
          </p>
        </div>
      </div>
      <!-- ARROW ICON -->
      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DeadlineInfoCard',
  props: {
    isImportant: Boolean
  }
})
</script>
