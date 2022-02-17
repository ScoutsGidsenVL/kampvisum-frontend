<template>
  <div v-if="true" class="border-l-4 border-red p-2 flex items-center gap-3">
    <i-important />
    <div>
      <h1 class="text-md font-light m-0 text-red font-aglet">Belangerijk</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IImportant from '../icons/IImportant.vue'

export default defineComponent({
  name: 'Message',
  components: {
    IImportant,
  },
})
</script>
