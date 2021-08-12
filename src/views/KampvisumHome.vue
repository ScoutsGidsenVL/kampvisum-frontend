<template>
  <div class="home">
    <warning :isDisplayed="isWarningDisplayed" text="Ben je zeker het kamp te willen verwijderen?" leftButton="annuleren" rightButton="verwijder" @leftButtonClicked="hideWarning()" @rightButtonClicked="deleteCamp()" />

    <custom-button @click="openCampSideBar()" :isSubmitting="false" :text="t('pages.kampvisum-overview.create-camp-button')">
      <template v-slot:icon>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline ml-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
        </svg>
      </template>
    </custom-button>
    
    <div class="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
      <div v-for="camp in camps" :key="camp.id">
        <camp-info-card class="mt-5" :camp="camp" >
          <template v-slot:buttons>
            <svg @click.stop="editCamp()" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 hover:text-lightGreen cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
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
    

    <camp-side-bar :title="t('sidebars.kampvisum-sidebar.title')" v-model:sideBarState="campSideBarState"/>

  </div>
</template>

<script lang="ts">
import { CustomButton, sideBarState } from 'vue-3-component-library'
import CampSidebar from '../components/sideBars/CampSideBar.vue'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import CampInfoCard from '@/components/cards/CampInfoCard.vue'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { CampRepository } from '@/repositories/campRepository'
import {ArrayResult} from '../interfaces/ArrayResult'
import Warning from '@/components/Warning.vue'
import { Camp } from '../serializer/Camp'


export default defineComponent({
  name: 'KampvisumHome',
  components: {
    'custom-button': CustomButton,
    'camp-side-bar': CampSidebar,
    'camp-info-card': CampInfoCard,
    'warning': Warning
  },
  setup() {
    const campSideBarState = ref<sideBarState<any>>({ state: 'hide' })
    const isWarningDisplayed = ref<Boolean>(false)
    const camps = ref<any>([])
    const campToBeDeleted = ref<Camp>({})
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    const getCamps = () => {
      RepositoryFactory.get(CampRepository)
        .getArray('/insurances/?page=1&page_size=10')
        .then((c: ArrayResult) => {
          camps.value = c
        })
    }

    const editCamp = () => {
      console.log('editCamp')
    }

    const deleteCamp = () => {
      if (campToBeDeleted.value.id) {
        RepositoryFactory.get(CampRepository)
        .removeById(campToBeDeleted.value.id)
        .then((c) => {
          console.log('DELETED: ', c)
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

    getCamps()


    return { t, campSideBarState, openCampSideBar, camps, editCamp, deleteCamp, displayWarning, isWarningDisplayed, hideWarning }
  },
})
</script>
