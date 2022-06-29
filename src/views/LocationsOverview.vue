<template>
  <div class="p-3">
    <location-filter-component @changedFilters="changedFilters($event)" />
  </div>

  <div class="p-3">
    <camps-overview-map :locations="[]" />
  </div>
</template>

<script lang="ts">
import CampsOverviewMap from '@/components/cards/leaflet/CampsOverviewMap.vue'
import { LocationFilter } from '@/serializer/Filter'
import { defineComponent, ref } from 'vue'
import LocationFilterComponent from '../components/semantics/LocationFilter.vue'

export default defineComponent({
  name: 'LocationsOverview',
  components: {
    LocationFilterComponent,
    CampsOverviewMap
  },
  setup () {
    window.scrollTo({ top: 0, behavior: 'auto' })
    const filters = ref<LocationFilter>({ year: '', startDate: '', endDate: '', groupName: '', groupNumber: '', country: '' })
    const changedFilters = (f: LocationFilter) => {
      filters.value = f
    }

    return {
      changedFilters,
      filters
    }
  }
})
</script>
