<template>
  <div class="flex w-100 -mt-3">
    <div class="w-100">
      <div>
        <page-header :title="route.name" :subTitle="getSectionsTitle(camp)" />
      </div>

      <div class="pt-3 md:pr-3">
          <div>
            <base-subcategory-card title="Date" :baseState="{ hasTextFieldSection: true, hasFileSection: true }" />
            <base-subcategory-card class="mt-2" title="Date" :baseState="{ hasTextFieldSection: true, hasFileSection: true }" />
            <base-subcategory-card class="mt-2" title="Date" :baseState="{ hasTextFieldSection: true, hasFileSection: true }" />
            <base-subcategory-card class="mt-2" title="Date" :baseState="{ hasTextFieldSection: true, hasFileSection: true }" />
            <base-subcategory-card class="mt-2" title="Date" :baseState="{ hasTextFieldSection: true, hasFileSection: true }" />
            <base-subcategory-card class="mt-2" title="Date" :baseState="{ hasTextFieldSection: true, hasFileSection: true }" />
          </div>
      </div>
    </div>
    <information-side-bar :sidebar="sidebar" :isOverflowHidden="true" v-on:closeSidebar="closeSidebar()" v-on:openSidebar="openSidebar()" />
  </div>
</template>

<script lang="ts">
import BaseSubcategoryCard from '../../components/cards/BaseSubcategoryCard.vue'
import PageHeader from '../../components/semantics/PageHeader.vue'
import { useSectionsHelper } from '../../helpers/sectionsHelper'
import { useCampHelper } from '../../helpers/campHelper'
import { Camp } from '../../serializer/Camp'
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import InformationSideBar, { Sidebar, SidebarState } from '@/components/sideBars/InformationSideBar.vue'


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
      route,
      camp,
      sidebar,
      closeSidebar,
      openSidebar
    }
  },
})
</script>
