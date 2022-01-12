<template>
  <div v-if="visum" class="p-3">
    <h1>{{ visum.camp.name }}</h1>

    <h4 class="text-green inline">
      {{ getSectionsTitle(visum.camp) }}
    </h4>
    
    <hr />

    <div class="w-100 flex">
      <div class="w-100 grid xl:grid-cols-2 sm:grid-cols-1 gap-4">
        <div v-for="category in visum.categorySet.categories" :key="category">
            <category-info-card :visum="visum" :category="category" />
        </div>
      </div>
      <deadlines-sidebar :sidebar="sidebar" :isOverflowHidden="true" v-on:closeSidebar="closeSidebar()" v-on:openSidebar="openSidebar()" />
    </div>
  </div>
</template>

<script lang="ts">
import DeadlinesSideBar, { Sidebar, SidebarState } from '@/components/sideBars/DeadlinesSidebar.vue'
import CategoryInfoCard from '../components/cards/CategoryInfoCard.vue'
import { useSectionsHelper } from '../helpers/sectionsHelper'
import { usePhoneHelper } from '@/helpers/phoneHelper'
import { useCampHelper } from '../helpers/campHelper'
import { defineComponent, ref } from 'vue'
import { Camp } from '../serializer/Camp'
import { Visum } from '@/serializer/Visum'


export default defineComponent({
  name: 'CampOverview',
  components: {
    'category-info-card': CategoryInfoCard,
    'deadlines-sidebar': DeadlinesSideBar,
  },
  setup() {
    const visum = ref<Visum>()
    const { getCampByRouteParam } = useCampHelper()
    const { getSectionsTitle } = useSectionsHelper()
    const { checkIfIsMobileSize } = usePhoneHelper()

    getCampByRouteParam().then((v: Visum) => {
      visum.value = v
    })

    const sidebar = ref<Sidebar>({state: checkIfIsMobileSize() ? SidebarState.CLOSED : SidebarState.OPEN})

    const closeSidebar = () => {
      sidebar.value.state = SidebarState.CLOSED
    }

    const openSidebar = () => {
      sidebar.value.state = SidebarState.OPEN
    }
    
    return {
      getSectionsTitle,
      closeSidebar,
      openSidebar,
      sidebar,
      visum
    }
  },
})
</script>
