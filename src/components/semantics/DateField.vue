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
import { useDateHelper } from '@/helpers/dateHelper'
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
    const { dateFromString, dateFromDatePickerFormatted } = useDateHelper()

    const { triggerNotification } = useNotification()

    const initializeDateValues = () => {
      if (props.check?.value.startDate && props.check?.value.endDate) {
        dateValues.value.push(dateFromString(props.check.value.startDate)),
        dateValues.value.push(dateFromString(props.check.value.endDate))
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
        tmpDates.push(dateFromDatePickerFormatted(date))
      })

      if (
        !(props.check?.value.startDate && props.check.value.startDate === tmpDates[0] &&
        props.check?.value.endDate && props.check.value.endDate === tmpDates[1])) {
        await RepositoryFactory.get(DurationDateCheckRepository)
          .update(selectedGroup.value.groupAdminId, props.check.endpoint, tmpDates)
          .then((p: any) => {
            triggerNotification(t('checks.notification-updated'))
          })
      }
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