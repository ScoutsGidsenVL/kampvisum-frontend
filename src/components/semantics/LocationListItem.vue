<template>
  <div @click="openInGoogleMaps(subLocation)" class="flex justify-between border-b-2 hover:text-green cursor-pointer bg-white" v-for="(subLocation) in location.locations" :key="subLocation">
    <div class="p-2.5 flex items-center gap-3">
      <i-marker /> ({{location.name}}) {{ subLocation.name ? `${subLocation.name}, ` : '' }}{{ subLocation.address }}
    </div>
    <div v-if="location.startDate && location.endDate" class="p-2.5 items-center">
      {{ dateFromLocalisedString(location.startDate) }} - {{ dateFromLocalisedString(location.endDate) }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import IMarker from '../icons/IMarker.vue'
import { useDateHelper } from '@/helpers/dateHelper'

export default defineComponent({
  name: 'LocationListItem',
  components: {
    IMarker
  },
  props: {
    location: {
      type: Object as PropType<any>
    }
  },
  setup () {
    const { dateFromLocalisedString } = useDateHelper()
    const openInGoogleMaps = (l: any) => {
      window.open(`http://maps.google.com/?q=${l.latitude},${l.longitude}`);
    }

    return {
      openInGoogleMaps,
      dateFromLocalisedString
    }
  }
})
</script>
