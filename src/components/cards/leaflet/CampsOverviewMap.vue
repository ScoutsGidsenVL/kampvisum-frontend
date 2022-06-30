<template>
  <div class="w-full" style="height: 60vh">
    <l-map :use-global-leaflet="true" ref="map" :options="options" class="z-0" :maxZoom="10"   v-model:zoom="zoom" :center="center" @ready="onLeafletReady">
      <!-- <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
      <marker-cluster
        :options="{ showCoverageOnHover: false, chunkedLoading: true }"
      >
        <l-marker :lat-lng="[47.7515953048815, 8.757179159967961]" />
        <l-marker :lat-lng="[51.42494690949777, 6.901031944520698]" />
        <l-marker :lat-lng="[51.42494690949777, 6.901031944520698]" />
      </marker-cluster> -->

      <!-- <div v-for="location in locations" :key="location">
          <l-marker :lat-lng="[location.latitude, location.longitude]">
            <l-icon>
              <svg width="30" height="30" style="margin-left: -14px; margin-top: -30px" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18.875 9.41675C18.875 16.7084 9.5 22.9584 9.5 22.9584C9.5 22.9584 0.125 16.7084 0.125 9.41675C0.125 6.93034 1.11272 4.54578 2.87087 2.78762C4.62903 1.02947 7.0136 0.041748 9.5 0.041748C11.9864 0.041748 14.371 1.02947 16.1291 2.78762C17.8873 4.54578 18.875 6.93034 18.875 9.41675Z"
                  fill="#7B8F1C"
                />
              </svg>
            </l-icon>
            <l-popup class="w-60">
              <camp-custom-popup :location="location" />
            </l-popup>
          </l-marker>
      </div> -->

      <template v-if="leafletReady">
      <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
      <marker-cluster
        :options="{ showCoverageOnHover: false, chunkedLoading: true }"
      >
        <div v-for="location in locations" :key="location">
          <l-marker :lat-lng="[location.latitude, location.longitude]">
            <l-icon>
              <svg width="30" height="30" style="margin-left: -14px; margin-top: -30px" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18.875 9.41675C18.875 16.7084 9.5 22.9584 9.5 22.9584C9.5 22.9584 0.125 16.7084 0.125 9.41675C0.125 6.93034 1.11272 4.54578 2.87087 2.78762C4.62903 1.02947 7.0136 0.041748 9.5 0.041748C11.9864 0.041748 14.371 1.02947 16.1291 2.78762C17.8873 4.54578 18.875 6.93034 18.875 9.41675Z"
                  fill="#7B8F1C"
                />
              </svg>
            </l-icon>
            <l-popup class="w-60">
              <camp-custom-popup :location="location" />
            </l-popup>
          </l-marker>
      </div>
      </marker-cluster>
      <l-control class="text-white" >
        <slot name="loader"></slot>
      </l-control>
    </template>
    </l-map>
  </div>
</template>

<script lang="ts">
import { LMap, LTileLayer, LMarker, LIcon, LPopup, LControl } from '@vue-leaflet/vue-leaflet'
import { CustomInput, CustomButtonSmall, Warning } from 'vue-3-component-library'
import { defineComponent, ref, PropType } from 'vue'
import ICenter from '@/components/icons/ICenter.vue'
import CampCustomPopup from './CampCustomPopup.vue'
import { useI18n } from 'vue-i18n'
import { latLng } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import MarkerCluster from "./MarkerCluster.vue";

export default defineComponent({
  components: {
    CampCustomPopup,
    LTileLayer,
    CustomInput,
    LControl,
    MarkerCluster,
    LMarker,
    LPopup,
    LIcon,
    LMap,
    Warning,
    CustomButtonSmall,
    ICenter,
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
  data() {
    return {
      url: "https://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 1,

      leafletReady: false,
      leafletObject: null,

      visible: false,
    };
  },
  methods: {
    async onLeafletReady() {
      await this.$nextTick();
      this.leafletObject = this.$refs.map.leafletObject;
      this.leafletReady = true;
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
      zoom,
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
