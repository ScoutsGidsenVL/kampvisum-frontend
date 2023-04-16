<template>
  <div v-show="!checkIfIsMobileSize()" class="w-full border-b py-2 grid grid-cols-5 gap-4 px-2 hover:opacity-30 cursor-pointer" @click="nav(camp.id)">
    <div>
      {{ camp.name }}
    </div>
    <div>
      <div v-if="camp.date_start">
        {{ dateFromLocalisedString(camp.date_start) }} - {{ dateFromLocalisedString(camp.date_end) }}
      </div>
    </div>
    <div>
      {{ getSectionsTitle(camp) }}
    </div>
    <div>
      {{ camp.camp_deadline }}
    </div>
    <div>
      {{ stateLabel(camp.state) }}
    </div>
  </div>
  <div @click="nav(camp.id)" class="my-2 border-b" v-show="checkIfIsMobileSize()">
    <div class="flex gap-3">
      <div class="font-bold">{{ t('dc-overview.name') }}:</div>
      <div>{{ camp.name }}</div>
    </div>

    <div>
      <div class="font-bold">{{ t('dc-overview.sections') }}:</div>
      <div>{{ getSectionsTitle(camp) }}</div>
    </div>

    <div class="flex gap-3">
      <div class="font-bold">{{ t('dc-overview.dates') }}:</div>
      <div v-if="camp.date_start">{{ dateFromLocalisedString(camp.date_start) }} - {{
        dateFromLocalisedString(camp.date_end) }}</div>
    </div>

    <div class="flex gap-3">
      <div class="font-bold">{{ t('dc-overview.camp-registration') }}:</div>
      <div>{{ camp.camp_deadline }}</div>
    </div>

    <div class="flex gap-3">
      <div class="font-bold">{{ t('dc-overview.camp-status') }}:</div>
      <div>{{ showTextLabel(camp.state) }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { GlobalVisumState } from '@/composable/useVisum';
import { useDateHelper } from '@/helpers/dateHelper';
import { usePhoneHelper } from '@/helpers/phoneHelper'
import { useSectionsHelper } from '@/helpers/sectionsHelper';
import { PropType } from 'vue';
import { useI18n } from 'vue-i18n'
import router from '@/router'
const { getSectionsTitle } = useSectionsHelper()
const { dateFromLocalisedString } = useDateHelper()

const props = defineProps({
  camp: Object as PropType<any>
})
const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local',
})

const showTextLabel = (state: GlobalVisumState) => {
  //If translation is available or not empty show text 
  if (t(`global-camp-state.msg-${state}`) && t(`global-camp-state.msg-${state}`) !== '') {
    const test: string = t(`global-camp-state.msg-${state}`)
    return test
  }
  return undefined
}

const nav = (id: string) => {
  router.push('/kamp/' + id)
}

const stateLabel = (state: string): string => {


  if (state === 'DATA_REQUIRED') {
    return 'Kamp in opbouw'
  }
  if (state === 'SIGNABLE') {
    return 'Klaar om te tekenen'
  }
  if (state === 'NOT_SIGNABLE') {
    return 'Kamp afgekeurd'
  }
  if (state === 'REVIEWABLE') {
    return 'Klaar voor review'
  }
  if (state === 'REVIEWED_APPROVED') {
    return 'Klaar om te tekenen'
  }
  if (state === 'REVIEWED_FEEDBACK') {
    return 'Feedback bekeken'
  }
  if (state === 'REVIEWED_DISAPPROVED') {
    return 'Kamp afgekeurd'
  }
  if (state === 'FEEDBACK_HANDLED') {
    return 'Feedback verwerkt'
  }
  if (state === 'APPROVED') {
    return 'Goedgekeurd'
  }
  return 'Kamp in opbouw'
}

const { checkIfIsMobileSize } = usePhoneHelper()
</script>
