<template>
  <div class="w-auto h-screen " :class="sidebar.state === SidebarState.OPEN ? 'xs:z-50 md:z-40' : 'z-40'">
    <div class="d-flex h-screen" :class="{ 'md:w-98 xs:w-full': sidebar.state === SidebarState.OPEN, 'w-0': sidebar.state === SidebarState.CLOSED }">
      <div class="fixed d-flex" :class="{ 'md:w-98 xs:w-full': sidebar.state === SidebarState.OPEN, 'w-0': sidebar.state === SidebarState.CLOSED }">
        <div class="overflow-y-auto  pb-20 w-100 border-r-2 border-lightGray flex-column bg-gray h-screen px-4" :class="{ 'd-none': sidebar.state === SidebarState.CLOSED, 'd-flex': sidebar.state === SidebarState.OPEN }">
          <div @click="home()" class="mt-4 d-flex justify-between mb-3 items-center cursor-pointer">
            <i-logo />
            <h1 class="text-2xl mt-1.5">{{ t('title') }}</h1>
          </div>

          <div v-if="selectedGroup.groupAdminId !== ''" class="my-3">
            <multi-select
              v-if="getAvailableGroups()"
              id="groupSelector"
              :object="true"
              @addSelection="changeSelectedGroup($event)"
              track-by="fullName"
              value-prop="groupAdminId"
              :options="getAvailableGroups()"
              :value="selectedGroup"
              :canClear="false"
              :canDeselect="false"
              :searchable="true"
            />
          </div>

          <div v-if="!isForbidden" class="top-44 w-auto">
            <div>
              <div class="text-center">
                <loader color="lightGreen" size="10" :isLoading="isFetchingVisums" />
              </div>
              <!-- {{route.params}} -->
              <div  v-if="visumsAlphabetically.length > 0">
                <div v-for="visum in visumsAlphabetically" :key="visum">
                  <navigation-item :visum="visum" :text="`${visum.name} - ${getSectionsTitle(visum)}`">
                    <div v-for="category in visum.categorySet.categories" :key="category">
                      <a @click="navigateTowardsCategory(category.categoryParent.name, visum, category.id);closeSidebar()" class="xs:text-sm md:text-md block cursor-pointer my-1 px-2" style="width: fit-content" :class="(category.id === route.params.id) ? 'text-green font-bold' : 'text-black'">
                        {{ category.categoryParent.label }}
                      </a>
                    </div>
                  </navigation-item>
                </div>
              </div>
              <div class="ml-2 italic text-sm py-3" v-if="visumsAlphabetically.length === 0 && !isFetchingVisums">
                {{t('no-camps')}}
              </div>
            </div>

            <navigation-item v-if="!isForbidden && !isFetchingVisums && isInternetActive" @click="closeSidebar()" :highlight="(route.path === '/instellingen') ? true : false" link="/instellingen" :text="t('page-titles.settings')" />
            <!-- <navigation-item link="/documenten" text="Documenten"/> -->
            <navigation-item v-if="can('visums.view_camp_locations') && isInternetActive" link="/locaties" text="Locaties"/>
            <navigation-item v-if="hasRole('role_district_commissioner') && isInternetActive" link="/overzicht-dc" text="Overzicht DC"/>
            <!-- <navigation-item v-if="isInternetActive" link="/locaties" text="Locaties"/> -->
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
import MultiSelect from '../../components/inputs/MultiSelect.vue'
import { useSectionsHelper } from '../../helpers/sectionsHelper'
import { useNavigation } from '../../composable/useNavigation'
import { useNotification } from '@/composable/useNotification'
import useGroupAndYears from '@/composable/useGroupAndYears'
import { SidebarState } from '@/helpers/infoBarHelper'
import NavigationItem from './NavigationItem.vue'
import { Loader } from 'vue-3-component-library'
import useVisum from '../../composable/useVisum'
import { Group } from '@/serializer/Group'
import ILogo from '../icons/ILogo.vue'
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import router from '@/router'
import { useInternetHelper } from '@/helpers/internetHelper'
import { usePermission } from '@/composable/usePermission'

export default defineComponent({
  components: {
    NavigationItem,
    'multi-select': MultiSelect,
    ILogo,
    Loader,
  },
  name: 'NavigationSideBar',
  setup() {
    const { isInternetActive } = useInternetHelper()
    const { can, hasRole } = usePermission()
    const route = useRoute()
    const { isFetchingVisums, visums, visumsAlphabetically } = useVisum()
    const { getSectionsTitle } = useSectionsHelper()
    const { navigateTowardsCategory, sidebar } = useNavigation()
    const { setSelectedGroup, getAvailableGroups, selectedGroup } = useGroupAndYears()
    const { isForbidden } = useNotification()
    
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

    const closeSidebar = () => {
      sidebar.value.state = SidebarState.CLOSED
    }

    const home = () => {
      router.push('/kampvisum-home/')
    }

    const changeSelectedGroup = (group: Group) => {
      setSelectedGroup(group)
      if (!window.location.pathname.includes('kampvisum-home')) {
        home()
      }
    }

    return {
      navigateTowardsCategory,
      visumsAlphabetically,
      changeSelectedGroup,
      getAvailableGroups,
      getSectionsTitle,
      isInternetActive,
      isFetchingVisums,
      selectedGroup,
      toggleSideBar,
      SidebarState,
      closeSidebar,
      isForbidden,
      sidebar,
      visums,
      route,
      home,
      t,
      can,
      hasRole
    }
  },
})
</script>
