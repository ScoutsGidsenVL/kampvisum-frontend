<template>
  <div class="home">
    <warning v-if="campToBeDeleted.name" :title="campToBeDeleted.name" :isLoading="isDeletingCamp" :isDisplayed="isWarningDisplayed" text="Ben je zeker het kamp te willen verwijderen?" leftButton="annuleren" rightButton="verwijder" @leftButtonClicked="hideWarning()" @rightButtonClicked="deleteCamp()" />
    
    <div>
      <camp-side-bar v-if="selectedGroup" :title="t('sidebars.kampvisum-sidebar.title')" v-model:sideBarState="campSideBarState" @actionSuccess="actionSuccess($event)" :selectedGroupId="selectedGroup.uuid"/>
    </div>

    <div class="pb-3 grid grid-cols-2 gap-3" style="margin-top: -2em">
      <multi-select
        v-if="myGroups[0]"
        id="group"
        :object="true"
        placeholder="Kies een groep"
        @addSelection="selectGroup($event)"
        track-by="fullInfo"
        value-prop="id"
        :options="myGroups"
        :value="myGroups[0]"
        :canClear="false"
        :canDeselect="false"
      />
      <multi-select
        id="year"
        placeholder="Kies een jaar"
        value-prop="id"
        :options="['2019', '2020', 2021]"
      />
    </div>

    <custom-button @click="openCampSideBar()" :isSubmitting="false" :text="t('pages.kampvisum-overview.create-camp-button')">
      <template v-slot:icon>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline ml-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
        </svg>
      </template>
    </custom-button>

    <div>
      <success-toast v-show="toastState.visible" :label="toastState.label" @hideToast="hideToast()" />
    </div>
    
    <div class="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
      <div v-for="camp in camps" :key="camp.id">
        <camp-info-card class="mt-5" :camp="camp" >
          <template v-slot:buttons>
            <svg @click.stop="editCamp(camp)" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 hover:text-lightGreen cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>

            <svg @click.stop="displayWarning(camp)" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 hover:text-red cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
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
import CampInfoCard from '@/components/cards/CampInfoCard.vue'
import { CampRepository } from '@/repositories/campRepository'
import { GroupRepository } from '@/repositories/groupRepository'
import MultiSelect from '../components/inputs/MultiSelect.vue'
import {ArrayResult} from '../interfaces/ArrayResult'
import { defineComponent, ref } from 'vue'
import { Camp } from '../serializer/Camp'
import { Group } from '../serializer/Group'
import { useI18n } from 'vue-i18n'

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
    const isWarningDisplayed = ref<Boolean>(false)
    const isDeletingCamp = ref<Boolean>(false)
    const campToBeDeleted = ref<Camp>({})
    const selectedGroup = ref<Group>()
    const myGroups = ref<any>([])  
    const camps = ref<any>([])

    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    const getCamps = async () => {
      await RepositoryFactory.get(CampRepository)
        .getArray('/insurances/?page=1&page_size=10')
        .then((c: ArrayResult) => {
          camps.value = c
        })
    }

    const setSelectedGroup = (group: Group) => {
      selectedGroup.value = group
    }

    const getUserGroups = async () => {
      await RepositoryFactory.get(GroupRepository)
        .getArray()
        .then((c: ArrayResult) => {
          myGroups.value = c
          setSelectedGroup(myGroups.value[0])
        })
    }

    const editCamp = (camp: Camp) => {
      campSideBarState.value = {
        state: 'edit',
        entity: camp,
      }
    }

    const deleteCamp = () => {
      if (campToBeDeleted.value.uuid) {
        isDeletingCamp.value = true
        RepositoryFactory.get(CampRepository)
        .removeById(campToBeDeleted.value.uuid)
        .then(() => {
          getCamps().then(() => {
            isDeletingCamp.value = false
            isWarningDisplayed.value = false
            toastState.value.visible = true
            toastState.value.label = "Kamp is succesvol verwijderd"
          })
        })
      }
    }

    const displayWarning = (camp: Camp) => {
      isWarningDisplayed.value = true
      campToBeDeleted.value = camp
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
      if (action === 'POST') {
        toastState.value.label = 'Kamp is succesvol aangemaakt'
      }
      if (action === 'UPDATE') {
        toastState.value.label = 'Kamp is succesvol bewerkt'
      }
      toastState.value.visible = true
      getCamps()
    }


    const selectGroup = (event: any) => {
      setSelectedGroup(event)
    }

    getCamps()
    getUserGroups()

    return { t,myGroups, selectGroup, selectedGroup, campSideBarState, openCampSideBar, camps, editCamp, deleteCamp, displayWarning, isWarningDisplayed, hideWarning, hideToast, toastState, isDeletingCamp, campToBeDeleted, actionSuccess }
  },
})
</script>

<style>
#overlay {
  background-color: rgba(0,0,0,0);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
  z-index:1;
  transition: all 300ms ease;
}
</style>
