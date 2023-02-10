<template>
  <div>
    <div class="flex gap-2 items-center">
      <h1 v-if="location.name" class="text-lg mt-1">{{ location.name }}</h1>
    </div>

    <div>
      {{ DateTime.fromFormat(location.start_date,'yyyy-MM-dd').toFormat('dd MMM yyyy') }} - {{ DateTime.fromFormat(location.end_date,'yyyy-MM-dd').toFormat('dd MMM yyyy') }}
    </div>

    <div>
      {{location.group.full_name}}
    </div>
    
    <div>
      {{location.name}}
    </div>

    <div class="mt-3 hover:underline text-green cursor-pointer" @click="navigateTowardsVisum({ id: location.visum_id})">
      {{$t('location-overview.check-camp')}}
    </div>
  </div>
</template>

<script lang="ts">
import { SearchedLocation } from '@/serializer/SearchedLocation'
import IPersonGreen from '@/components/icons/IPersonGreen.vue'
import IPhoneGreen from '@/components/icons/IPhoneGreen.vue'
import IMailGreen from '@/components/icons/IMailGreen.vue'
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import useVisum from '@/composable/useVisum'
const { DateTime } = require("luxon");

export default defineComponent({
  components: { IPersonGreen, IPhoneGreen, IMailGreen, },
  name: 'CampCustomPopup',
  props: {
    location: {
      type: Object as PropType<SearchedLocation>,
      required: false
    }
  },
  setup (props, { emit }) {
    const { navigateTowardsVisum } = useVisum()
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })
    return  {
      t,
      navigateTowardsVisum,
      DateTime
    }
  }
})
</script>
