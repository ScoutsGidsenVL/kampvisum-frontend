<template>
  <div class="bg-lighterGreen flex p-3 justify-between">
    <div class="flex items-center">
      <!-- INFO ICON -->
      <div class="mr-2.5">
        <svg class="mt-0.5" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.0754 2.93327C13.1726 -0.974358 6.84097 -0.978243 2.93329 2.92454C-0.974347 6.82743 -0.97828 13.1591 2.92461 17.0667C6.8274 20.9744 13.1591 20.9783 17.0668 17.0754C20.9744 13.1726 20.9783 6.8409 17.0754 2.93327ZM11.3963 16.3455C11.3963 16.4998 11.2712 16.6247 11.117 16.6247H8.88304C8.72884 16.6247 8.60379 16.4998 8.60379 16.3455V8.05243C8.60379 7.89813 8.72884 7.77318 8.88304 7.77318H11.117C11.2712 7.77318 11.3963 7.89808 11.3963 8.05243V16.3455ZM10 6.61427C9.10703 6.61427 8.38047 5.88781 8.38047 4.99477C8.38047 4.10182 9.10699 3.37521 10 3.37521C10.8931 3.37521 11.6196 4.10177 11.6196 4.99477C11.6196 5.88781 10.893 6.61427 10 6.61427Z" fill="#7B8F1C"/>
        </svg>
      </div>

      <div>
        <strong class="xs:text-sm">
          Wat zijn deadlines
        </strong>
      </div>
    </div>
    <!-- ARROW ICON -->
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DeadlineInfoCard',
})
</script>
