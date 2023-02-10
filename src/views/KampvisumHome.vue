<template>
  <div class="home p-3">
    <warning
      v-if="visumToBeDeleted"
      :title="visumToBeDeleted.name"
      :isLoading="isDeletingVisum"
      :isDisplayed="isWarningDisplayed"
      :text="t('pages.kampvisum-overview.delete-warning')"
      :leftButton="t('pages.kampvisum-overview.delete-warning-button-left')"
      :rightButton="t('pages.kampvisum-overview.delete-warning-button-right')"
      @leftButtonClicked="hideWarning()"
      @rightButtonClicked="deleteCamp()"
    />
    <div>
      <camp-side-bar
        v-if="selectedGroup"
        :title="campSideBarState.state === 'edit' ? t('sidebars.kampvisum-sidebar.title') : t('sidebars.kampvisum-sidebar.create') + selectedYear "
        v-model:sideBarState="campSideBarState"
        @actionSuccess="actionSuccess($event)"
        @navigateTowardsVisumOverview="navigateTowardsVisum($event)"
        :selectedGroupId="selectedGroup.groupAdminId"
      />
    </div>

    <div v-if="sidebar.state === SidebarState.CLOSED" @click="shineSelector()" class="underline text-green mb-3 cursor-pointer" style="width: fit-content">
      {{t('pages.kampvisum-overview.change-group')}}
    </div>

    <div v-if="!isForbidden && !isFetchingVisums" class="pb-3 grid md:grid-cols-2 gap-3">
      <multi-select style="max-width: 261px" v-if="years[0]" id="year" @addSelection="selectNewYear" value-prop="id" :options="years" :value="selectedYear" :canClear="false" :canDeselect="false" />
    </div>

    <div class="xs:w-100 md:w-80">
      <custom-button v-if="can(permissions.CREATE_VISUM) && !isForbidden && !isFetchingVisums && isInternetActive && years[0] && years[0] === selectedYear" class="w-100" :extraStyle="'w-100'" @click="openCampSideBar()" :isSubmitting="false" :text="t('pages.kampvisum-overview.create-camp-button')">
        <template v-slot:icon>
          <svg xmlns="http://www.w3.org/2000/svg" style="margin-top: -3px" class="h-5 w-5 inline ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
          </svg>
        </template>
      </custom-button>
    </div>

    <forbidden />

    <div class="h-screen -m-56 grid content-center" v-if="isFetchingVisums">
      <div class="text-center">
        <loader color="lightGreen" size="20" :isLoading="isFetchingVisums" />
      </div>
    </div>

    <div v-if="!isFetchingVisums">
      <camp-call-to-action v-if="!isForbidden" :visums="visums" />
      <div v-if="can(permissions.LIST_VISUM)" class="grid md:grid-cols-2 xs:grid-cols-1 gap-4">
        <div  v-for="visum in visums" :key="visum.id">
          <camp-info-card class="mt-5" :visum="visum">
            <template v-if="isInternetActive" v-slot:buttons>
              <svg v-if="can(permissions.UPDATE_VISUM)" @click.stop="editVisum(visum)" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 hover:text-lightGreen cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>

              <svg v-if="can(permissions.DELETE_VISUM)" @click.stop="displayWarning(visum)" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 hover:text-red cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </template>
          </camp-info-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { CustomButtonSmall, Warning, Loader } from 'vue-3-component-library'
import CampCallToAction from '@/components/semantics/campCallToAction.vue'
import CampSidebar from '../components/sideBars/CampSideBar.vue'
import RepositoryFactory from '@/repositories/repositoryFactory'
import CampInfoCard from '@/components/cards/CampInfoCard.vue'
import { CampVisumRepository } from '@/repositories/CampVisumRepository'
import MultiSelect from '../components/inputs/MultiSelect.vue'
import { useNotification } from '@/composable/useNotification'
import useGroupAndYears from '@/composable/useGroupAndYears'
import Forbidden from '@/components/semantics/Forbidden.vue'
import { useNavigation } from '@/composable/useNavigation'
import { SidebarState } from '@/helpers/infoBarHelper'
import useVisum from '@/composable/useVisum'
import { defineComponent, ref } from 'vue'
import { Visum } from '@/serializer/Visum'
import { useI18n } from 'vue-i18n'
import { useInternetHelper } from '@/helpers/internetHelper'
import { usePermission, permissions } from '@/composable/usePermission'

export default defineComponent({
  name: 'KampvisumHome',
  components: {
    'camp-info-card': CampInfoCard,
    'custom-button': CustomButtonSmall,
    'camp-side-bar': CampSidebar,
    'multi-select': MultiSelect,
    warning: Warning,
    Loader,
    CampCallToAction,
    Forbidden,
  },
  setup() {
    const { isInternetActive } = useInternetHelper()
    const campSideBarState = ref<any>({ state: 'hide', entity: {} })
    const isWarningDisplayed = ref<Boolean>(false)
    const visumToBeDeleted = ref<Visum>()
    const isDeletingVisum = ref<Boolean>(false)
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })
    const { setBreadcrumbs, sidebar } = useNavigation()
    const { selectedGroup, selectedYear, years, setSelectedYear, getYearsForGroup, isInBetweenStartAndEnd } = useGroupAndYears()
    const { visums, isFetchingVisums, getVisums, navigateTowardsVisum } = useVisum()
    const { triggerNotification, isForbidden } = useNotification()
    const { can } = usePermission()

    setBreadcrumbs([])

    const editVisum = (visum: Visum) => {
      campSideBarState.value = {
        state: 'edit',
        entity: visum,
      }
    }

    const deleteCamp = () => {
      isDeletingVisum.value = true
      if (visumToBeDeleted.value) {
        RepositoryFactory.get(CampVisumRepository)
          .removeById(selectedGroup.value.groupAdminId, visumToBeDeleted.value.id)
          .then(() => {
              getVisums(selectedGroup.value, selectedYear.value).then(() => {
                isDeletingVisum.value = false
                isWarningDisplayed.value = false
                triggerNotification(t('pages.kampvisum-overview.notification-deleted'))
              })
          })
      }
    }

    const openCampSideBar = () => {
      campSideBarState.value = { state: 'new' }
    }

    const displayWarning = (visum: Visum) => {
      isWarningDisplayed.value = true
      visumToBeDeleted.value = visum
    }

    const hideWarning = () => {
      isWarningDisplayed.value = false
    }

    const actionSuccess = async (action: string) => {
      if (action === 'POST') {
        triggerNotification(t('pages.kampvisum-overview.notification-posted'))
      }
      if (action === 'UPDATE') {
        triggerNotification(t('pages.kampvisum-overview.notification-updated'))
      }
      // OPNIEUW FETCHEN
      if (!selectedYear.value) {
        await getYearsForGroup(selectedGroup.value.groupAdminId)
      }
      getVisums(selectedGroup.value, selectedYear.value)
    }

    const selectNewYear = (year: string) => {
      setSelectedYear(year)
    }

    const shineSelector = () => {
      // @ts-ignore
      document.getElementById('groupSelector').style.border = '2px solid #7b8f1c'
      sidebar.value.state = SidebarState.OPEN
    }

    return {
      navigateTowardsVisum,
      isWarningDisplayed,
      isInternetActive,
      isFetchingVisums,
      campSideBarState,
      visumToBeDeleted,
      openCampSideBar,
      isDeletingVisum,
      displayWarning,
      selectedGroup,
      actionSuccess,
      selectNewYear,
      shineSelector,
      SidebarState,
      hideWarning,
      deleteCamp,
      isForbidden,
      editVisum,
      sidebar,
      visums,
      years,
      t,
      selectedYear,
      isInBetweenStartAndEnd,
      can,
      permissions
    }
  },
})
</script>
