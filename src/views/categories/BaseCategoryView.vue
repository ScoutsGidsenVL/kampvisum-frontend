<template>
  <div v-if="visum"  class="flex w-100 -mt-3">
    <div class="w-100">
      <div>
        <page-header :title="route.meta.title" :subTitle="getSectionsTitle(visum.camp)" />
      </div>

      <div v-if="visum" class="w-100 flex pt-3">
          <div class="w-100">
            <div v-for="(subCategory) in category.subCategories" :key="subCategory" >
              <base-subcategory-card @rl="rl($event)" :visum="visum" class="mb-3" :subCategory="subCategory" titleTextfield="Opmerkingen" :checks="subCategory.checks" @openSidebar="openSidebar()" />
            </div>
          </div>
          <information-side-bar :sidebar="sidebar" :isOverflowHidden="true" v-on:closeSidebar="closeSidebar()" v-on:openSidebar="openSidebar()" />
      </div>
    </div>
  </div>

  <div class="h-screen -m-16 grid content-center" v-if="isFetchingVisum">
    <div class="text-center">
      <loader color="lightGreen" size="20" :isLoading="isFetchingVisum" />
    </div>
  </div>
</template>

<script lang="ts">
import { Sidebar, SidebarState, useInfoBarHelper } from '@/helpers/infoBarHelper'
import BaseSubcategoryCard from '../../components/cards/BaseSubcategoryCard.vue'
import InformationSideBar from '@/components/sideBars/InformationSideBar.vue'
import PageHeader from '../../components/semantics/PageHeader.vue'
import { useSectionsHelper } from '../../helpers/sectionsHelper'
import { useCampHelper } from '../../helpers/campHelper'
import { usePhoneHelper } from '@/helpers/phoneHelper'
import { Category } from '@/serializer/Category'
import { Loader } from 'vue-3-component-library'
import { Visum } from '../../serializer/Visum'
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useNavigation } from '@/router/navigation'

export default defineComponent({
  name: 'BaseCategoryView',
  components: {
    BaseSubcategoryCard,
    PageHeader,
    InformationSideBar,
    Loader
  },
  setup() {
    const route = useRoute()
    const visum = ref<Visum>()
    const category = ref<Category>()
    const { getCampByRouteParam } = useCampHelper()
    const { getSectionsTitle } = useSectionsHelper()
    const { setCategoryInfo } = useInfoBarHelper()
    const { checkIfIsMobileSize } = usePhoneHelper()
    const isFetchingVisum = ref<boolean>(true)
    const { jumpToId } = useNavigation()
    const { setBreadcrumbs } = useNavigation()
  
    const fetchVisum = () => {
      getCampByRouteParam().then((v: Visum) => {
        visum.value = v
        //NEEDS TO BE REFACTORED AND ONLY RETRIEVE A CATEGORY BASED ON THE SELECTED ID
        category.value = visum.value.categorySet.categories.find((c: Category) => c.id === route.params.id)
        isFetchingVisum.value = false

        if (category.value) {
          setCategoryInfo(category.value.categoryParent.description)
          setBreadcrumbs([{title: v.camp.name,name: 'kamp', uuid: v.id}, { title: category.value.categoryParent.label ,name: category.value.categoryParent.name, uuid: category.value.id}])
        }

        if (route.params.sectionId) {
          setTimeout(() => {
            jumpToId(route.params.sectionId)
          },200)
        }
      })
    }
        
    const sidebar = ref<Sidebar>({state: checkIfIsMobileSize() ? SidebarState.CLOSED : SidebarState.OPEN })

    const closeSidebar = () => {
      sidebar.value.state = SidebarState.CLOSED
    }

    const openSidebar = () => {
      sidebar.value.state = SidebarState.OPEN
    }

    const rl = () => {
      fetchVisum()
    }

    fetchVisum()

    return {
      getSectionsTitle,
      isFetchingVisum,
      closeSidebar,
      openSidebar,
      category,
      sidebar,
      route,
      visum,
      rl
    }
  },
})
</script>
