<template>
  <div class="w-full" style="height: 60vh">
    <l-map ref="myMap" :options="options" class="z-0"  v-model:zoom="zoom" :center="center">
      <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
      <div v-for="location in locations" :key="location">
      </div>
    </l-map>
  </div>
</template>

<script lang="ts">
import { LMap, LTileLayer, LMarker, LIcon, LPopup, LControl } from '@vue-leaflet/vue-leaflet'
import { CustomInput, CustomButtonSmall, Warning } from 'vue-3-component-library'
import { defineComponent, ref, PropType } from 'vue'
import ICenter from '@/components/icons/ICenter.vue'
import CustomPopup from './CustomPopup.vue'
import { useI18n } from 'vue-i18n'
import { latLng } from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default defineComponent({
  components: {
    CustomPopup,
    LTileLayer,
    CustomInput,
    LControl,
    LMarker,
    LPopup,
    LIcon,
    LMap,
    Warning,
    CustomButtonSmall,
    ICenter
  },
  props: {
    locations: {
      type: Object as PropType<Array<any>>,
      required: false,
      default: () => {
        return []
      },
    },
  },
  setup(props, { emit }) {
    const myMap = ref<any>(null)
    const options = ref<any>({scrollWheelZoom: false})
    const center = ref<any>(latLng(50.5039,4.4699))
    const zoom = ref<Number>(5)
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })
   
    return {
      t,
      myMap,
      options,
      center,
      zoom
    }
  },
})
</script>

<style>
.leaflet-popup-content-wrapper {
  border-radius: 0px !important;
}

.leaflet-container button a {
    color: white;
}
</style>
