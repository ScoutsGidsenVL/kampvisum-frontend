<template>
  <div>
    <!-- LOCATIONS PAGE -->
    <location-filter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LocationFilter from '../components/semantics/LocationFilter.vue'

export default defineComponent({
  name: 'LocationsOverview',
  components: {
    LocationFilter
  }
})
</script>
