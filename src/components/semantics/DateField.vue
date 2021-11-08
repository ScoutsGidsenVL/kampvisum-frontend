<template>
  <div class="custom-pad max-w-xs">
    <strong>{{title}}</strong>
    <litepie-datepicker
      as-single
      use-range
      v-model="dateValue"
      :formatter="formatter"
      separator=" - "
      placeholder=" "
    ></litepie-datepicker>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
const LitepieDatepicker = require('litepie-datepicker').default

export default defineComponent({
  name: 'HeaderSubcategoryCard',
  props: {
    title: String
  },
  components: {
    'litepie-datepicker': LitepieDatepicker
  },
  setup () {
    const dateValue = ref([])
    const formatter = ref({
      date: 'DD MMM YYYY',
      month: 'MMM'
    })
    return {
      dateValue,
      formatter
    }
  }
})
</script>

<style lang="scss">
.custom-pad {
  .pr-12 {
    padding-right: 1rem !important;
  }
}
</style>