<template>
  <div class="home p-3">
    <warning v-if="visumToBeDeleted.camp" :title="visumToBeDeleted.camp.name" :isLoading="isDeletingVisum" :isDisplayed="isWarningDisplayed" text="Ben je zeker het kamp te willen verwijderen?" leftButton="annuleren" rightButton="verwijder" @leftButtonClicked="hideWarning()" @rightButtonClicked="deleteCamp()" />
    <div>
      <camp-side-bar v-if="selectedGroup.groupAdminId" :title="t('sidebars.kampvisum-sidebar.title')" v-model:sideBarState="campSideBarState" @actionSuccess="actionSuccess($event)" :selectedGroupId="selectedGroup.groupAdminId"/>
    </div>

    <div class="pb-3 grid md:grid-cols-2 gap-3">
      <multi-select
        v-if="myGroups[0]"
        id="group"
        :object="true"
        placeholder="Kies een groep"
        @addSelection="selectFilter($event, 'group')"
        track-by="name"
        value-prop="groupAdminId"
        :options="myGroups"
        :value="myGroups[0]"
        :canClear="false"
        :canDeselect="false"
      />
      <multi-select
        id="year"
        placeholder="Kies een jaar"
        value-prop="id"
        :options="groupYears"
        @addSelection="selectFilter($event, 'year')"
      />
    </div>

    <div class="xs:w-100 md:w-80">
      <custom-button class="w-100" :extraStyle="'w-100'" @click="openCampSideBar()" :isSubmitting="false" :text="t('pages.kampvisum-overview.create-camp-button')">
        <template v-slot:icon>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
          </svg>
        </template>
      </custom-button>
    </div>
    
    <div>
      <success-toast v-show="toastState.visible" :label="toastState.label" @hideToast="hideToast()" />
    </div>
    
    <div class="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
      <div v-for="visum in visums" :key="visum.id">
        <camp-info-card class="mt-5" :visum="visum" >
          <template v-slot:buttons>
            <svg @click.stop="editCamp(visum.camp)" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 hover:text-lightGreen cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>

            <svg @click.stop="displayWarning(visum)" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 hover:text-red cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
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
</template>

<script lang="ts">
import { CustomButton, sideBarState, Warning, SuccessToast } from 'vue-3-component-library'
import CampSidebar from '../components/sideBars/CampSideBar.vue'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { GroupRepository } from '@/repositories/groupRepository'
import CampInfoCard from '@/components/cards/CampInfoCard.vue'
import { CampRepository } from '@/repositories/campRepository'
import MultiSelect from '../components/inputs/MultiSelect.vue'
import {ArrayResult} from '../interfaces/ArrayResult'
import { useCampHelper } from '../helpers/campHelper'
import { Group } from '../serializer/Group'
import { defineComponent, ref } from 'vue'
import { Camp } from '../serializer/Camp'
import { useI18n } from 'vue-i18n'
import { Visum } from '@/serializer/Visum'
import store from '../store/store'

export interface ToastState {
  visible: boolean,
  label: string
}

export default defineComponent({
  name: 'KampvisumHome',
  components: {
    'camp-info-card': CampInfoCard,
    'custom-button': CustomButton,
    'success-toast': SuccessToast,
    'camp-side-bar': CampSidebar,
    'multi-select': MultiSelect,
    'warning': Warning,
  },
  setup() {
    const campSideBarState = ref<any>({ state: 'hide', entity: {} })
    const { setCampsByGroup, campsByGroup } = useCampHelper()
    const isWarningDisplayed = ref<Boolean>(false)
    const visumToBeDeleted = ref<Camp>({ id: ''})
    const selectedGroup = ref<Group>({ groupAdminId: ''})
    const isDeletingVisum = ref<Boolean>(false)
    const selectedYear = ref<string>('')
    const groupYears = ref<string[]>([])
    const myGroups = ref<any>([])  
    const visums = ref<any>([])
    console.log('USER: ', )
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    const getVisums = async (groupId: string, year: string) => {
      await RepositoryFactory.get(CampRepository)
        .getArray('?page=1&page_size=100&group=' + groupId + ((year !== '') ? '&year=' + year : ''))
        .then((c: ArrayResult) => {
          visums.value = c
          setCampsByGroup(visums.value)
        })
    }

    const setSelectedGroup = (group: Group) => {
      selectedGroup.value = group
    }

    const getUserGroups = async () => {
      myGroups.value = store.getters.user.scoutsGroups
      setSelectedGroup(myGroups.value[0])
    }

    const getGroupYears = async (groupId: string) => {
      await RepositoryFactory.get(CampRepository)
        .getGroupYears(groupId)
        .then((years: Array<string>) => {
          groupYears.value = years
        })
    }

    const editCamp = (camp: Camp) => {
      campSideBarState.value = {
        state: 'edit',
        entity: camp,
      }
    }

    const deleteCamp = () => {
        isDeletingVisum.value = true
        RepositoryFactory.get(CampRepository)
        .removeById(visumToBeDeleted.value.id)
        .then(() => {
          getVisums(selectedGroup.value.groupAdminId, selectedYear.value).then(() => {
            isDeletingVisum.value = false
            isWarningDisplayed.value = false
            toastState.value.visible = true
            toastState.value.label = "Kamp is succesvol verwijderd"
          })
        })
    }

    const displayWarning = (visum: Visum) => {
      isWarningDisplayed.value = true
      visumToBeDeleted.value = visum
    }

    const openCampSideBar = () => {
      campSideBarState.value = { state: 'new' }
    }

    const hideWarning = () => {
      isWarningDisplayed.value = false
    }

    const toastState = ref<ToastState>(
      {
        visible: false,
        label: 'hidden'
      }
    )

    const hideToast = () => {
      toastState.value.visible = false
    }


    const actionSuccess = (action: string) => {
      console.log('FEEDBACK: ', action)
      if (action === 'POST') {
        toastState.value.label = 'Kamp is succesvol aangemaakt'
      }
      if (action === 'UPDATE') {
        toastState.value.label = 'Kamp is succesvol bewerkt'
      }
      toastState.value.visible = true
      getVisums(selectedGroup.value.groupAdminId, selectedYear.value)
    }

    const setSelectedYear = (year: string) => {
      selectedYear.value = year
    }

    const selectFilter = (event: any, filter: string) => {
      filter === 'group' ? setSelectedGroup(event) : event !== null ? setSelectedYear(event) : setSelectedYear('')
      getVisums(selectedGroup.value.groupAdminId, selectedYear.value)
    }

    getUserGroups().then(() => getGroupYears(selectedGroup.value.groupAdminId))
    .then(() => getVisums(selectedGroup.value.groupAdminId, selectedYear.value))

    return { 
      isWarningDisplayed, 
      campSideBarState, 
      openCampSideBar, 
      visumToBeDeleted, 
      displayWarning, 
      isDeletingVisum, 
      selectedGroup, 
      actionSuccess, 
      selectFilter, 
      hideWarning, 
      groupYears, 
      deleteCamp, 
      toastState, 
      campsByGroup,
      hideToast, 
      myGroups, 
      editCamp, 
      visums, 
      t,
    }
  },
})

function useStore() {
  throw new Error('Function not implemented.')
}
</script>