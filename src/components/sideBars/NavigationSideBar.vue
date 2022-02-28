<template>
  <div class="w-auto h-screen z-30">
    <div class="d-flex h-screen" :class="{ 'md:w-98 xs:w-100': sidebar.state === SidebarState.OPEN, 'w-0': sidebar.state === SidebarState.CLOSED }">
      <div class="fixed d-flex" :class="{ 'md:w-98 xs:w-100': sidebar.state === SidebarState.OPEN, 'w-0': sidebar.state === SidebarState.CLOSED }">
        <div class="w-100 border-r-2 border-lightGray flex-column bg-gray h-screen px-4" :class="{ 'd-none': sidebar.state === SidebarState.CLOSED, 'd-flex': sidebar.state === SidebarState.OPEN }">
          <div @click="home()" class="mt-4 d-flex justify-between mb-3 items-center cursor-pointer">
            <i-logo />
            <h1 class="text-2xl mt-1.5">{{ t('title') }}</h1>
          </div>

          <div class="my-3">
            <multi-select
              v-if="getAvailableGroups()"
              id="groupSelector"
              :object="true"
              @addSelection="changeSelectedGroup($event)"
              track-by="fullName"
              value-prop="groupAdminId"
              :options="getAvailableGroups()"
              :value="getAvailableGroups()[0]"
              :canClear="false"
              :canDeselect="false"
            />
          </div>

          <div class="top-44 w-auto">
            <div>
              <div class="text-center">
                <loader color="lightGreen" size="10" :isLoading="isFetchingVisums" />
              </div>
              <!-- {{route.params}} -->
              <div v-for="visum in visums" :key="visum">
                <navigation-item :visum="visum" :text="`${visum.camp.name} - ${getSectionsTitle(visum.camp)}`">
                  <div v-for="category in visum.categorySet.categories" :key="category">
                    <a @click="navigateTowardsCategory(category.categoryParent.name, visum, category.id)" class="xs:text-sm md:text-md block cursor-pointer my-1 px-2" style="width: fit-content" :class="(category.id === route.params.id) ? 'text-white bg-green rounded-full' : ''">
                      {{ category.categoryParent.label }}
                    </a>
                  </div>
                </navigation-item>
              </div>
            </div>

            <navigation-item :highlight="(route.path === '/instellingen') ? true : false" link="/instellingen" :text="t('page-titles.settings')" />
            <!-- <navigation-item link="/documenten" text="Documenten"/> -->
            <!-- <navigation-item link="/locaties" text="Locaties"/> -->
            <!-- <navigation-item link="/niet-leden" text="Niet-leden"/> -->
          </div>
        </div>

        <!-- SMALL TOGGLE BAR -->
        <div @click="toggleSideBar()" class="w-6 bg-lightGray h-screen flex flex-wrap justify-center content-center cursor-pointer">
          <svg v-if="sidebar.state === SidebarState.CLOSED" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-current text-black" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-current text-black" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import MultiSelect from '../../components/inputs/MultiSelect.vue'
import { useSectionsHelper } from '../../helpers/sectionsHelper'
import { Sidebar, SidebarState } from '@/helpers/infoBarHelper'
import { useNavigation } from '../../composable/useNavigation'
import useGroupAndYears from '@/composable/useGroupAndYears'
import { usePhoneHelper } from '@/helpers/phoneHelper'
import NavigationItem from './NavigationItem.vue'
import { Loader } from 'vue-3-component-library'
import useVisum from '../../composable/useVisum'
import { defineComponent, ref } from 'vue'
import { Group } from '@/serializer/Group'
import ILogo from '../icons/ILogo.vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: {
    NavigationItem,
    'multi-select': MultiSelect,
    ILogo,
    Loader,
  },
  name: 'NavigationSideBar',
  setup() {
    const route = useRoute()
    const { isFetchingVisums, visums } = useVisum()
    const { getSectionsTitle } = useSectionsHelper()
    const { navigateTowardsCategory, sidebar } = useNavigation()
    const { setSelectedGroup, getAvailableGroups } = useGroupAndYears()
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    const toggleSideBar: () => void = () => {
      if (sidebar.value.state === SidebarState.OPEN) {
        sidebar.value.state = SidebarState.CLOSED
        return
      }
      if (sidebar.value.state === SidebarState.CLOSED) {
        sidebar.value.state = SidebarState.OPEN
        return
      }
    }

    const home = () => {
      router.push('/kampvisum-home/')
    }

    const changeSelectedGroup = (group: Group) => {
      setSelectedGroup(group)
    }

    return {
      navigateTowardsCategory,
      changeSelectedGroup,
      getAvailableGroups,
      getSectionsTitle,
      isFetchingVisums,
      toggleSideBar,
      SidebarState,
      sidebar,
      route,
      visums,
      home,
      t,
    }
  },
})
</script>
