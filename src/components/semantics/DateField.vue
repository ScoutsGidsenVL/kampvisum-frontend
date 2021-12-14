<template>
  <div class="custom-pad max-w-sm">
    <strong>{{title}}</strong>
    <div v-if="isWithRange">
      <litepie-datepicker
        as-single
        use-range
        v-model="dateValues"
        :formatter="formatter"
        separator=" - "
        placeholder=" "
      ></litepie-datepicker>
    </div>
    <div v-else>
      <litepie-datepicker
        as-single
        v-model="dateValue"
        :formatter="formatter"
        placeholder=" "
      ></litepie-datepicker>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
const LitepieDatepicker = require('litepie-datepicker')

export default defineComponent({
  name: 'HeaderSubcategoryCard',
  props: {
    title: String,
    isWithRange: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  components: {
    'litepie-datepicker': LitepieDatepicker
  },
  setup () {
    const dateValues = ref([])
    const dateValue = ref('')
    const formatter = ref({
      date: 'DD MMM YYYY',
      month: 'MMM'
    })
    return {
      dateValues,
      dateValue,
      formatter
    }
  }
})
</script>