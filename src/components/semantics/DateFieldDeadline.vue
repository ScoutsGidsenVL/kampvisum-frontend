<template>
  <div class="custom-pad">
    <label class="font-bold" for="">Deadline</label>
    <div>
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
const LitepieDatepicker = require('litepie-datepicker').default
import { defineComponent, ref} from 'vue'

export default defineComponent({
  name: 'DateFieldDeadline',
  components: {
    'litepie-datepicker': LitepieDatepicker
  },
  setup () {
    const dateValue = ref('')

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