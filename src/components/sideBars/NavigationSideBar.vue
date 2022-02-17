<template>
  <div class=" w-auto h-screen z-30">
    <div class="d-flex h-screen" :class="{ 'md:w-98 xs:w-100': sidebar.state === SidebarState.OPEN, 'w-0': sidebar.state === SidebarState.CLOSED }">
      <div class="fixed d-flex" :class="{ 'md:w-98 xs:w-100': sidebar.state === SidebarState.OPEN, 'w-0': sidebar.state === SidebarState.CLOSED }">
        <div class="w-100 border-r-2 border-lightGray flex-column bg-gray h-screen px-4" :class="{ 'd-none': sidebar.state === SidebarState.CLOSED, 'd-flex': sidebar.state === SidebarState.OPEN }">
          
          <div @click="home()" class="mt-4 d-flex justify-between mb-3 items-center cursor-pointer">
            <i-logo />
            <h1 class="text-2xl mt-1.5">{{t('title')}}</h1>
          </div>

          <div class="my-3">
            <multi-select
              v-if="myGroups[0]"
              id="group"
              :object="true"
              @addSelection="setSelectedGroup($event)"
              track-by="fullName"
              value-prop="groupAdminId"
              :options="myGroups"
              :value="myGroups[0]"
              :canClear="false"
              :canDeselect="false"
            />
          </div>

          <div class="top-44 w-auto">
            
            <div v-if="campsByGroup && campsByGroup.length > 0">
              <div v-for="(visum) in campsByGroup" :key="visum">
                <navigation-item :text="`${visum.camp.name} - ${getSectionsTitle(visum.camp)}`">
                  <div v-for="(category) in visum.categorySet.categories" :key="category">
                    <a @click="navigateTowardsCategory(category.categoryParent.name, visum, category.id)" class="xs:text-sm md:text-md block cursor-pointer py-1">
                      {{category.categoryParent.label}}
                    </a>
                  </div>
                </navigation-item>
              </div>
            </div>

            <navigation-item link="/instellingen" :text="t('page-titles.settings')"/>
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
import { Sidebar, SidebarState } from '@/helpers/infoBarHelper'
import { useCampHelper } from '../../helpers/campHelper'
import { useNavigation } from '../../router/navigation'
import { usePhoneHelper } from '@/helpers/phoneHelper'
import NavigationItem from './NavigationItem.vue'
import { defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import store from '../../store/store'
import ILogo from '../icons/ILogo.vue'
import router from '@/router'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  components: { 
    NavigationItem, 
    'multi-select': MultiSelect,
    ILogo
  },
  name: 'NavigationSideBar',
  setup() {
    const route = useRoute()
    const { campsByGroup } = useCampHelper()
    const { checkIfIsMobileSize } = usePhoneHelper()
    const { getSectionsTitle } = useSectionsHelper()
    const { navigateTowardsCategory, setSelectedGroup } = useNavigation()
    const sidebar = ref<Sidebar>({ state: checkIfIsMobileSize() ? SidebarState.CLOSED : SidebarState.OPEN })
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })
    const toggleSideBar: () => void = () => {
      if (sidebar.value.state === SidebarState.OPEN) {
        sidebar.value.state = SidebarState.CLOSED
        return;
      }
      if (sidebar.value.state === SidebarState.CLOSED) {
        sidebar.value.state = SidebarState.OPEN
        return;
      }
    }

    const myGroups = ref<any>([])  

    const home = () => {
      router.push('/kampvisum-home/')
    }

    watch(() => store.getters.user.scoutsGroups, () => {
      myGroups.value = store.getters.user.scoutsGroups
      setSelectedGroup(myGroups.value[0])
    })

    return {
      navigateTowardsCategory,
      getSectionsTitle,
      setSelectedGroup,
      toggleSideBar,
      SidebarState,
      campsByGroup,
      myGroups,
      sidebar,
      route,
      home,
      t
    }
  }
})
</script>
