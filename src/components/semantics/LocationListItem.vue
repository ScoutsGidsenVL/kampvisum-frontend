<template>
  <div @click="openInGoogleMaps(subLocation)" class="border-b-2 hover:text-green cursor-pointer bg-white" v-for="(subLocation) in location.locations" :key="subLocation">
    <div class="p-2.5 flex items-center gap-3">
      <i-marker /> ({{location.name}}) {{ subLocation.name ? `${subLocation.name}, ` : '' }}{{ subLocation.address }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import IMarker from '../icons/IMarker.vue'


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
      openInGoogleMaps
    }
  }
})
</script>
