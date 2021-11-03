<template>
  <div v-if="camp" class="p-3">
    <h1>{{ camp.name }}</h1>

    <h4 class="text-green inline">
      {{ getSectionsTitle(camp) }}
    </h4>
    
    <hr />

    <div class="w-100 flex">
      <div class="w-100 grid md:grid-cols-2 sm:grid-cols-1 gap-4">
        <div v-for="category in camp.categories" :key="category">
            <category-info-card :camp="camp" :category="category" />
        </div>
      </div>
      <deadlines-sidebar :sidebar="sidebar" :isOverflowHidden="true" v-on:closeSidebar="closeSidebar()" v-on:openSidebar="openSidebar()" />
    </div>
  </div>
</template>

<script lang="ts">
import CategoryInfoCard from '../components/cards/CategoryInfoCard.vue'
import { useSectionsHelper } from '../helpers/sectionsHelper'
import { useCampHelper } from '../helpers/campHelper'
import { defineComponent, ref } from 'vue'
import { Camp } from '../serializer/Camp'
import { Sidebar, SidebarState } from '@/components/sideBars/InformationSideBar.vue'
import DeadlinesSideBar from '@/components/sideBars/DeadlinesSidebar.vue'
import InformationSidebar from '@/components/sideBars/InformationSideBar.vue'

export default defineComponent({
  name: 'CampOverview',
  components: {
    'category-info-card': CategoryInfoCard,
    'deadlines-sidebar': DeadlinesSideBar,
    'information-sidebar': InformationSidebar
  },
  setup() {
    const camp = ref<Camp>()
    const { getCampByRouteParam } = useCampHelper()
    const { getSectionsTitle } = useSectionsHelper()

    getCampByRouteParam().then((c: Camp) => {
      camp.value = c
    })

    const sidebar = ref<Sidebar>({state: SidebarState.CLOSED})

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
      camp
    }
  },
})
</script>
