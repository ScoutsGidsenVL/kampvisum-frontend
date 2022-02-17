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
              v-if="myGroups[0]"
              id="group"
              :object="true"
              @addSelection="addSelectedGroup($event)"
              track-by="fullName"
              value-prop="groupAdminId"
              :options="myGroups"
              :value="myGroups[0]"
              :canClear="false"
              :canDeselect="false"
            />
          </div>

          <div class="top-44 w-auto">
            <div>
              <div class="text-center">
                <loader color="lightGreen" size="10" :isLoading="isFetchingVisums" />
              </div>
              <div v-for="visum in visums" :key="visum">
                <navigation-item :text="`${visum.camp.name} - ${getSectionsTitle(visum.camp)}`">
                  <div v-for="category in visum.categorySet.categories" :key="category">
                    <a @click="navigateTowardsCategory(category.categoryParent.name, visum, category.id)" class="xs:text-sm md:text-md block cursor-pointer py-1">
                      {{ category.categoryParent.label }}
                    </a>
                  </div>
                </navigation-item>
              </div>
            </div>

            <navigation-item link="/instellingen" :text="t('page-titles.settings')" />
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
import MultiSelect from '../../components/inputs/MultiSelect.vue'
import { useSectionsHelper } from '../../helpers/sectionsHelper'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { Sidebar, SidebarState } from '@/helpers/infoBarHelper'
import { CampRepository } from '@/repositories/campRepository'
import { useNavigation } from '../../router/navigation'
import { usePhoneHelper } from '@/helpers/phoneHelper'
import NavigationItem from './NavigationItem.vue'
import { defineComponent, ref, watch } from 'vue'
import { Loader } from 'vue-3-component-library'
import ILogo from '../icons/ILogo.vue'
import { useRoute } from 'vue-router'
import store from '../../store/store'
import { useI18n } from 'vue-i18n'
import router from '@/router'
import useVisum from '../../composable/useVisum'
import { Group } from '@/serializer/Group'

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
    const { checkIfIsMobileSize } = usePhoneHelper()
    const { getSectionsTitle } = useSectionsHelper()
    const { navigateTowardsCategory, setSelectedGroup, setSelectedYear, setYears, selectedGroup, selectedYear } = useNavigation()
    const { getVisums, isFetchingVisums, visums } = useVisum()
    const sidebar = ref<Sidebar>({ state: checkIfIsMobileSize() ? SidebarState.CLOSED : SidebarState.OPEN })
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

    const myGroups = ref<any>([])

    const home = () => {
      router.push('/kampvisum-home/')
    }

    const addSelectedGroup = (group: Group) => {
      setSelectedGroup(group)
      getYearsAndVisums(group)
    }

    const getYearsAndVisums = (group: Group) => {
      getGroupYears(group.groupAdminId).then(() => {
        getVisums(group.groupAdminId, selectedYear.value)
      })
    }

    const getGroupYears = async (groupId: string) => {
      await RepositoryFactory.get(CampRepository)
        .getGroupYears(groupId)
        .then((years: Array<string>) => {
          setYears(years)
          setSelectedYear(years[0])
        })
    }

    if (route) {
      watch(
        () => store.getters.user.scoutsGroups,
        (groups: Group[]) => {
          myGroups.value = groups
          setSelectedGroup(groups[0])
          getYearsAndVisums(groups[0])
        }
      )
    }

    return {
      navigateTowardsCategory,
      getSectionsTitle,
      setSelectedGroup,
      toggleSideBar,
      SidebarState,
      myGroups,
      sidebar,
      home,
      t,
      visums,
      isFetchingVisums,
      addSelectedGroup,
    }
  },
})
</script>
