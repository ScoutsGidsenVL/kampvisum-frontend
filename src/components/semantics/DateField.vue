<template>
  <div class="custom-pad max-w-sm">
    <strong>{{check.checkParent.label}}</strong>
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
import { DurationDateCheckRepository } from '@/repositories/DurationDateCheckRepository'
import RepositoryFactory from '@/repositories/repositoryFactory'
const LitepieDatepicker = require('litepie-datepicker').default
import { defineComponent, ref, PropType, watch } from 'vue'
import { Check } from '@/serializer/Check'
import { DurationDateCheck, DurationDateCheckDeserializer } from '@/serializer/DurationDateCheck'
const { DateTime } = require("luxon");

export default defineComponent({
  name: 'HeaderSubcategoryCard',
  props: {
    check: {
      type: Object as PropType<Check>,
      required: true
    },
    isWithRange: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  components: {
    'litepie-datepicker': LitepieDatepicker
  },
  setup (props) {
    const dateValues = ref<Array<string>>([])
    const dateValue = ref('')


    const initializeDateValues = () => {
      if (props.check?.value.startDate) {
        dateValues.value.push(DateTime.fromFormat(props.check.value.startDate,'yyyy-MM-dd').toFormat('dd MMM yyyy'))
        dateValues.value.push(DateTime.fromFormat(props.check.value.endDate,'yyyy-MM-dd').toFormat('dd MMM yyyy'))
      }
    }
    initializeDateValues()

    const formatter = ref({
      date: 'DD MMM YYYY',
      month: 'MMM'
    })

    const patchDurationDateCheck = async (dates: Array<string>) => {
      await RepositoryFactory.get(DurationDateCheckRepository)
        .update(props.check.endpoint, dates)
        .then((p: any) => {
          console.log('PATCH RESPONSE: ', p)
        })
    }

    watch(
      () => dateValues.value,
      () => {
        patchDurationDateCheck(dateValues.value)
      }
    )

    return {
      dateValues,
      dateValue,
      formatter
    }
  }
})
</script>