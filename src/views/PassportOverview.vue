<template>
  <div v-if="visum" class="p-3">
    <h1>{{ visum.camp.name }}</h1>

    <h4 class="inline text-green font-aglet font-light">
      {{ getSectionsTitle(visum.camp) }}
    </h4>

    <div class="border border-lightGray p-3 flex items-center gap-2 my-3">
      <i-time /> <div v-if="remainingDays">Nog {{remainingDays}} dagen kamp</div> <div v-else>{{t('passport.no-end-date')}}</div>
    </div>

    <passport-overview-item :title="t('passport.documents')" :navText="'Alle documenten'" :navUrl="'documenten'" :visum="visum" />
    <passport-overview-item :title="t('passport.locations')" :navText="'Alle locaties'" :navUrl="'locaties'" :visum="visum" />
    <passport-overview-item :title="t('passport.members')" :navText="'Alle leden'" :navUrl="'leden'" :visum="visum" />

    <div class="border border-lightGray p-3 flex gap-2 items-center mt-3">
      <i-phone-green />
      <a href="tel: +3232311620">+32 3 231 16 20</a>
    </div>
  </div>
</template>

<script lang="ts">
import PassportOverviewItem from '@/components/semantics/PassportOverviewItem.vue'
import { useSectionsHelper } from '@/helpers/sectionsHelper'
import { useCampHelper } from '@/helpers/campHelper'
import { Visum } from '@/serializer/Visum'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import IPhoneGreen from '@/components/icons/IPhoneGreen.vue'
import ITime from '@/components/icons/ITime.vue'
const { DateTime } = require("luxon");

export default defineComponent({
  components: {PassportOverviewItem, IPhoneGreen, ITime},
  name: 'PassportOverview',
  setup() {
    const { getSectionsTitle } = useSectionsHelper()
    const { getCampByRouteParam } = useCampHelper()
    const visum = ref<any>()
    const remainingDays = ref<string>('0')

    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    window.scrollTo({ top: 0, behavior: 'auto' })

    getCampByRouteParam().then((v: Visum) => {
      visum.value = v
      daysRemaining()
    })

    function daysRemaining() {
      var endDate = visum.value.categorySet.categories[0].subCategories[0].checks[0].value.endDate
      if (endDate) {
        var eventdate = DateTime.fromISO(endDate);
        var todaysdate = DateTime.now();
        remainingDays.value = Math.ceil(eventdate.diff(todaysdate, 'days').values.days).toString();
      } else {
        remainingDays.value = ''
      }
    }

    return {
      t,
      visum,
      getSectionsTitle,
      remainingDays,
      
    }
  },
})
</script>
