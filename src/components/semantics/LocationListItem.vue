<template>
  <div @click="openInGoogleMaps(subLocation)" class="flex justify-between border-b-2 hover:text-green cursor-pointer bg-white" v-for="(subLocation) in location.locations" :key="subLocation">
    <div class="p-2.5 flex items-center gap-3">
      <i-marker /> ({{location.name}}) {{ subLocation.name ? `${subLocation.name}, ` : '' }}{{ subLocation.address }}
    </div>
    <div v-if="location.startDate && location.endDate" class="p-2.5 items-center">
      {{ DateTime.fromFormat(location.startDate,'yyyy-MM-dd').toFormat('dd MMM. yyyy') }} - {{ DateTime.fromFormat(location.endDate,'yyyy-MM-dd').toFormat('dd MMM. yyyy') }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import IMarker from '../icons/IMarker.vue'
const { DateTime } = require("luxon");

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

    const openInGoogleMaps = (l: any) => {
      window.open(`http://maps.google.com/?q=${l.latitude},${l.longitude}`);
    }

    return {
      openInGoogleMaps,
      DateTime
    }
  }
})
</script>
