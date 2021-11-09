<template>
    <div>
      <!-- <l-map
      v-model="zoom"
      v-model:zoom="zoom"
      :center="[47.41322, -1.219482]"
      @move="log('move')">
      </l-map> -->
    </div>
</template>

<script lang="ts">
import "leaflet/dist/leaflet.css"
import { defineComponent, PropType, ref } from 'vue'
// import { LMap } from "@vue-leaflet/vue-leaflet"

export default defineComponent({
  name: 'CampInfoCard',
  components: {
    // LMap,
  },
  props: {
    
  },
  setup () {
    const zoom = ref<number>(2)
    return {
      zoom
    }
  }
})
</script>
