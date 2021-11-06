<template>
  <div class="flex w-100 -mt-3">
    <div class="w-100">
      <div>
        <page-header :title="route.name" :subTitle="getSectionsTitle(camp)" />
      </div>

      <div class="w-100 flex pt-3">

          <div class="w-100">
            <base-subcategory-card class="mb-3" title="Datum" titleTextfield="Opmerkingen" :baseState="{ hasTextFieldSection: true, hasFileSection: false, hasChecksSection: false, hasMessageSection: false }" />
            <base-subcategory-card class="mb-3" title="Activiteiten" titleTextfield="Opmerkingen" :baseState="{ hasTextFieldSection: true, hasFileSection: true, hasChecksSection: true, hasMessageSection: false }" />
            <base-subcategory-card class="mb-3" title="Menu" titleTextfield="Opmerkingen" :baseState="{ hasTextFieldSection: true, hasFileSection: true, hasChecksSection: false, hasMessageSection: false }" />
          </div>
          <information-side-bar :sidebar="sidebar" :isOverflowHidden="true" v-on:closeSidebar="closeSidebar()" v-on:openSidebar="openSidebar()" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import InformationSideBar, { Sidebar, SidebarState } from '@/components/sideBars/InformationSideBar.vue'
import BaseSubcategoryCard from '../../components/cards/BaseSubcategoryCard.vue'
import PageHeader from '../../components/semantics/PageHeader.vue'
import { useSectionsHelper } from '../../helpers/sectionsHelper'
import { useCampHelper } from '../../helpers/campHelper'
import { Camp } from '../../serializer/Camp'
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'


export default defineComponent({
  name: 'BaseCategoryView',
  components: {
    BaseSubcategoryCard,
    PageHeader,
    InformationSideBar
  },
  setup() {
    const route = useRoute()
    const camp = ref<Camp>()
    const { getCampByRouteParam } = useCampHelper()
    const { getSectionsTitle } = useSectionsHelper()

    getCampByRouteParam().then((c) => {
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
      route,
      camp,
    }
  },
})
</script>
