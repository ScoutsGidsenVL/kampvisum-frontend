<template>
  <div v-show="!checkIfIsMobileSize()" class="w-full border-b py-2 grid grid-cols-5 gap-4 px-2">
    <div>
      Zomerkamp
    </div>
    <div>
      08 mrt 2023 - 10 mrt 2023
    </div>
    <div>
      kapoenen & kabouters en welpen & jonggivers & givers
    </div>
    <div>
      OP TIJD
    </div>
    <div>
      IN OPBOUW
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

<script lang="ts">
import { usePhoneHelper } from '@/helpers/phoneHelper'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  components: {},
  name: 'DcMenuItem',
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    const { checkIfIsMobileSize } = usePhoneHelper()

    return {
      t,
      checkIfIsMobileSize
    }
  }
})
</script>
