<template>
  <div v-if="visum && (selectedGroup.isSectionLeader || selectedGroup.isGroupLeader || selectedGroup.isDistrictCommissioner)" class="p-3">
    <h1>{{ visum.camp.name }}</h1>

    <h4 class="inline text-green font-aglet font-light">
      {{ getSectionsTitle(visum.camp) }}
    </h4>
    <hr />
    <div class="w-100 flex">
      <div class="w-100 grid xl:grid-cols-2 gap-4" style="height: fit-content !important">
        <div v-for="category in visum.categorySet.categories" :key="category">
          <category-info-card :visum="visum" :category="category" />
        </div>
      </div>
      <deadlines-sidebar :visum="visum" :sidebar="sidebar" :isOverflowHidden="true" v-on:closeSidebar="closeSidebar()" v-on:openSidebar="openSidebar()" />
    </div>
    <engagement v-if="visum" :visum="visum" />
  </div>

  <forbidden />

  <div class="h-screen -m-16 grid content-center" v-if="isFetchingVisum && (selectedGroup.isSectionLeader || selectedGroup.isGroupLeader || selectedGroup.isDistrictCommissioner)">
    <div class="text-center">
      <loader color="lightGreen" size="20" :isLoading="isFetchingVisum" />
    </div>
  </div>
</template>

<script lang="ts">
import DeadlinesSideBar, { Sidebar, SidebarState } from '@/components/sideBars/DeadlinesSidebar.vue'
import CategoryInfoCard from '../components/cards/CategoryInfoCard.vue'
import Engagement from '../components/semantics/Engagement.vue'
import { useSectionsHelper } from '../helpers/sectionsHelper'
import useGroupAndYears from '@/composable/useGroupAndYears'
import Forbidden from '@/components/semantics/Forbidden.vue'
import { useNavigation } from '@/composable/useNavigation'
import { usePhoneHelper } from '@/helpers/phoneHelper'
import { useCampHelper } from '../helpers/campHelper'
import { Loader } from 'vue-3-component-library'
import { defineComponent, ref } from 'vue'
import { Visum } from '@/serializer/Visum'

export default defineComponent({
  name: 'CampOverview',
  components: {
    'category-info-card': CategoryInfoCard,
    'deadlines-sidebar': DeadlinesSideBar,
    Loader,
    Engagement,
    Forbidden
  },
  setup() {
    const { getSectionsTitle } = useSectionsHelper()
    const { checkIfIsMobileSize } = usePhoneHelper()
    const { getCampByRouteParam } = useCampHelper()
    const { setBreadcrumbs } = useNavigation()
    window.scrollTo({ top: 0, behavior: 'auto' })
    const visum = ref<Visum>()
    const isFetchingVisum = ref<boolean>(true)
    const { selectedGroup } = useGroupAndYears()


    getCampByRouteParam().then((v: Visum) => {
      visum.value = v
      isFetchingVisum.value = false
      setBreadcrumbs([{ title: v.camp.name, name: 'kamp', uuid: v.id }])
    })

    const sidebar = ref<Sidebar>({ state: checkIfIsMobileSize() ? SidebarState.CLOSED : SidebarState.OPEN })

    const closeSidebar = () => {
      sidebar.value.state = SidebarState.CLOSED
    }

    const openSidebar = () => {
      sidebar.value.state = SidebarState.OPEN
    }

    return {
      getSectionsTitle,
      isFetchingVisum,
      closeSidebar,
      openSidebar,
      sidebar,
      visum,
      selectedGroup
    }
  },
})
</script>
