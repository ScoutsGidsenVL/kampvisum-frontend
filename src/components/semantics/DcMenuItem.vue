<template>
  <div v-show="!checkIfIsMobileSize()" class="w-full border-b py-2 grid grid-cols-5 gap-4 px-2">
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
      {{camp.state}}
    </div>
  </div>
  <div v-show="checkIfIsMobileSize()">
    <div>
      <div class="font-bold">{{ t('dc-overview.sections') }}:</div>
      <div>kabouters en welpen & jonggivers & givers</div>
    </div>

    <div class="flex gap-3">
      <div class="font-bold">{{ t('dc-overview.name') }}:</div>
      <div>Zomerkamp</div>
    </div>

    <div class="flex gap-3">
      <div class="font-bold">{{ t('dc-overview.dates') }}:</div>
      <div>08 mrt 2023 - 10 mrt 2023</div>
    </div>

    <div class="flex gap-3">
      <div class="font-bold">{{ t('dc-overview.camp-registration') }}:</div>
      <div>OP TIJD</div>
    </div>

    <div class="flex gap-3">
      <div class="font-bold">{{ t('dc-overview.camp-status') }}:</div>
      <div>IN OPBOUW</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDateHelper } from '@/helpers/dateHelper';
import { usePhoneHelper } from '@/helpers/phoneHelper'
import { useSectionsHelper } from '@/helpers/sectionsHelper';
import { PropType } from 'vue';
import { useI18n } from 'vue-i18n'
const { getSectionsTitle } = useSectionsHelper()
const { dateFromLocalisedString } = useDateHelper()

const props = defineProps({
  camp: Object as PropType<any>
})
const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local',
})
const { checkIfIsMobileSize } = usePhoneHelper()
</script>
