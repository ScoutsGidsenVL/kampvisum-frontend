<template>
  <div v-if="hasRole('role_administrator')">
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
import useGroupAndYears from '@/composable/useGroupAndYears'
import { usePermission } from '@/composable/usePermission'
const d = new Date()
    let year = d.getFullYear();
export default defineComponent({
  name: 'LocationsOverview',
  components: {
    LocationFilterComponent,
    CampsOverviewMap,
    Loader
  },
  setup () {
    window.scrollTo({ top: 0, behavior: 'auto' })
    const filters = ref<LocationFilter>({ year: year.toString(), startDate: '', endDate: '', groupName: '', groupNumber: '', country: '' })
    const campLocations = ref<any>([])
    const isFetchingCampLocations = ref<boolean>(false)
    const { selectedGroup } = useGroupAndYears()
    const { hasRole } = usePermission()

    const changedFilters = (f: LocationFilter) => {
      filters.value = f
      fetchCampLocations()
    }

    const fetchCampLocations = () => {
      isFetchingCampLocations.value = true
      RepositoryFactory.get(LocationRepository)
      .getCampLocations(selectedGroup.value.groupAdminId, filters.value)
      .then((results: any) => {
        campLocations.value = results
      isFetchingCampLocations.value = false
      })
    }

    // fetchCampLocations()

    return {
      changedFilters,
      filters,
      campLocations,
      isFetchingCampLocations,
      hasRole
    }
  }
})
</script>
