<template>
  <div>
    <div class="p-3 border border-lightGray shadow-sm">
      <h1>{{title}}</h1>
      <h4 v-if="subTitle" class="text-green">{{subTitle}}</h4>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      required: true,
      default: 'default title'
    },
    subTitle: String
  }
})
</script>
