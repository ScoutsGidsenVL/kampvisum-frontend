<template>
  <svg class="fill-current text-darkGray" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path
      d="M 12 2 c 5.514 0 10 4.486 10 10 s -4.486 10 -10 10 s -10 -4.486 -10 -10 s 4.486 -10 10 -10 z m 0 -2 c -6.627 0 -12 5.373 -12 12 s 5.373 12 12 12 s 12 -5.373 12 -12 s -5.373 -12 -12 -12 z z"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IImportant',
  props: {
    gray: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
})
</script>
