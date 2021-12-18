<template>
  <div class="flex w-100 -mt-3">
    <div class="w-100">
      <div>
        <page-header :title="route.name" :subTitle="getSectionsTitle(camp)" />
      </div>

      <div v-if="camp" class="w-100 flex pt-3">
          <div class="w-100">
            <base-subcategory-card :camp="camp" class="mb-3" title="Locatie(s)" titleTextfield="Opmerkingen" :concerns="['DateCheck', 'Message', 'SimpleCheck', 'InputCheck', 'LocationCheck', 'FileUploadCheck']" @openSidebar="openSidebar()" />
            <!-- <base-subcategory-card :camp="camp" class="mb-3" title="Datum" titleTextfield="Opmerkingen" :concerns="['InputCheck']"  @openSidebar="openSidebar()" /> -->
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
import { useInfoBarHelper } from '@/helpers/infoBarHelper'
import { useCampHelper } from '../../helpers/campHelper'
import { usePhoneHelper } from '@/helpers/phoneHelper'
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
    const { setCategoryInfo } = useInfoBarHelper()
    const { checkIfIsMobileSize } = usePhoneHelper()

    setCategoryInfo("Ga verder met de planning van je kamp. In het Kampvisum vind je alles terug dat je zeker in orde moet brengen.​<br><br>Je bent niet alleen. Kom eens buiten samen volgens de huidige maatregelen om bepaalde zaken samen verder uit te werken.<br><br>Of vraag hulp aan de districtcommissarissen bij twijfel. Tip: geef al wat meer aandacht aan spelletjes en inkleding. Als dit nu al klaar is kan je in juni meer tijd vrij maken voor praktische aanpassingen naargelang de maatregelen.")

    getCampByRouteParam().then((c) => {
      camp.value = c
    })
    const sidebar = ref<Sidebar>({state: checkIfIsMobileSize() ? SidebarState.CLOSED : SidebarState.OPEN })

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
