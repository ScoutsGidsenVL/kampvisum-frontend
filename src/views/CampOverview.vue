<template>
  <div v-if="visum" class="p-3">
    <h1>{{ visum.camp.name }}</h1>

    <h4 class="text-green inline">
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
  </div>
  <div class="h-screen -m-16 grid content-center" v-if="isFetchingVisum">
    <div class="text-center">
      <loader color="lightGreen" size="20" :isLoading="isFetchingVisum" />
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
import { Visum } from '@/serializer/Visum'
import { Loader } from 'vue-3-component-library'
import { useNavigation } from '@/composable/useNavigation'

export default defineComponent({
  name: 'CampOverview',
  components: {
    'category-info-card': CategoryInfoCard,
    'deadlines-sidebar': DeadlinesSideBar,
    Loader,
  },
  setup() {
    const { getSectionsTitle } = useSectionsHelper()
    const { checkIfIsMobileSize } = usePhoneHelper()
    const { getCampByRouteParam } = useCampHelper()
    const { setBreadcrumbs } = useNavigation()
    window.scrollTo({ top: 0, behavior: 'auto' })
    const visum = ref<Visum>()
    const isFetchingVisum = ref<boolean>(true)

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
    }
  },
})
</script>
