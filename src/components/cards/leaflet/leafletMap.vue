<template>
  <div class="h-96 w-full">
    <l-map
      v-model="zoom"
      v-model:zoom="zoom"
      :center="[51.20923, 4.43815]"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>

      <div v-for="(latLng, index) in fakeDataLatLng" :key="latLng">
        <l-marker @update:latLng="patchLatLng($event, index)" draggable :lat-lng="latLng">
          <l-popup>
            <custom-popup />
          </l-popup>
        </l-marker>
      </div>

    </l-map>
  </div>
  <div>
    <p class="text-sm">P1: {{toPatch[0]}}</p>
    <p class="text-sm">P2: {{toPatch[1]}}</p>
    <p class="text-sm">P3: {{toPatch[2]}}</p>
  </div>
</template>

<script lang="ts">
import {
  LMap,
  LTileLayer,
  LMarker,
  LIcon,
  LPopup,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import { defineComponent, ref } from 'vue'
import { latLng } from '../../../interfaces/latLng'
import CustomPopup from './CustomPopup.vue'

export default defineComponent ({
  components: {
    CustomPopup,
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    LPopup
  },
  data() {
    return {
      zoom: 18,
    };
  },
  setup () {
    // THIS APPLICATION USES VUE3-LEAFLET BUT DOCUMENTATION IS ALMOST THE SAME AS VUE2-LEAFLET
    // https://vue2-leaflet.netlify.app/quickstart/

    const fakeDataLatLng = ref<Array<Array<number>>>([
       [ 51.2092493812891, 4.4381600681856845 ],
       [ 51.20936364460192, 4.436100217379919 ],
       [ 51.20939053004611, 4.439447539227542 ]
    ])

    const toPatch = ref<Array<Array<number>>>([[],[],[]])

    const iconWidthAndHeight = [25, 40]
    const iconUrl = `https://placekitten.com/${iconWidthAndHeight[0]}/${iconWidthAndHeight[1]}`

    const patchLatLng = (latLng: latLng, id: number) => {
      toPatch.value[id] = [latLng.lat, latLng.lng]
      //PATCH NEW VALUES TO ENDPOINT...
    }

    return {
      iconUrl,
      patchLatLng,
      iconWidthAndHeight,
      fakeDataLatLng,
      toPatch
    }
  }
})
</script>