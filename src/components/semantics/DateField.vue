<template>
  <div class="custom-pad max-w-sm">
    <strong>{{check.checkParent.label}}</strong>
    <div v-if="isWithRange">
      <litepie-datepicker
        i18n="nl-be"
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
        i18n="nl-be"
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
import { useNotification } from '@/composable/useNotification'
import { defineComponent, ref, watch, PropType } from 'vue'
import { Check } from '@/serializer/Check'
const { DateTime } = require("luxon");
import { useI18n } from 'vue-i18n'
import useGroupAndYears from '@/composable/useGroupAndYears'

export default defineComponent({
  name: 'DateField',
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
    const { selectedGroup } = useGroupAndYears()
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })
    const dateValues = ref<Array<string>>([])
    const dateValue = ref('')

    const { triggerNotification } = useNotification()

    const initializeDateValues = () => {
      if (props.check?.value.startDate) {
        dateValues.value.push(DateTime.fromFormat(props.check.value.startDate,'yyyy-MM-dd').setLocale('nl').toFormat('dd MMM yyyy').toLowerCase())
        dateValues.value.push(DateTime.fromFormat(props.check.value.endDate,'yyyy-MM-dd').setLocale('nl').toFormat('dd MMM yyyy').toLowerCase())
      }
    }
    initializeDateValues()

    const formatter = ref({
      date: 'DD MMM YYYY',
      month: 'MMM'
    })

    const patchDurationDateCheck = async (dates: Array<string>) => {
      const tmpDates: any = []
      
      dates.forEach((date) => {
        tmpDates.push(DateTime.fromFormat(date, 'dd MMM yyyy', { locale: 'nl' }).toFormat('yyyy-MM-dd'))
      })

      await RepositoryFactory.get(DurationDateCheckRepository)
        .update(selectedGroup.value.groupAdminId, props.check.endpoint, tmpDates)
        .then((p: any) => {
          triggerNotification(t('checks.notification-updated'))
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