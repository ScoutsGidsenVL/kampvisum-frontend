<template>
  <div class="p-3">
    <location-filter-component @changedFilters="changedFilters($event)" />
  </div>
  <div class="p-3">
    <camps-overview-map :locations="campLocations">
      <template v-slot:loader>
        <div v-if="isFetchingCampLocations" class="p-3 bg-white rounded">
          <loader color="lightGreen" size="8" :isLoading="isFetchingCampLocations" />
        </div>
      </template>
    </camps-overview-map>
  </div>
</template>

<script lang="ts">
import CampsOverviewMap from '@/components/cards/leaflet/CampsOverviewMap.vue'
import { LocationRepository } from '@/repositories/LocationRepository'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { LocationFilter } from '@/serializer/Filter'
import { Loader } from 'vue-3-component-library'
import { defineComponent, ref } from 'vue'
import LocationFilterComponent from '../components/semantics/LocationFilter.vue'

export default defineComponent({
  name: 'LocationsOverview',
  components: {
    LocationFilterComponent,
    CampsOverviewMap,
    Loader
  },
  setup () {
    window.scrollTo({ top: 0, behavior: 'auto' })
    const filters = ref<LocationFilter>({ year: '', startDate: '', endDate: '', groupName: '', groupNumber: '', country: '' })
    const campLocations = ref<any>([])
    const isFetchingCampLocations = ref<boolean>(false)

    const changedFilters = (f: LocationFilter) => {
      filters.value = f
    }

    const fetchCampLocations = () => {
      isFetchingCampLocations.value = true
      RepositoryFactory.get(LocationRepository)
      .getCampLocations(filters.value)
      .then((results: any) => {
        campLocations.value = results
      isFetchingCampLocations.value = false
      })
    }

    fetchCampLocations()

    return {
      changedFilters,
      filters,
      campLocations,
      isFetchingCampLocations
    }
  }
})
</script>
