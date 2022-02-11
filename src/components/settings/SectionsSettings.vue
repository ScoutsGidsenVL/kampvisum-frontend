<template>
  <div>
    <div class="italic font-bold py-2">
      Takken voor {{selectedGroup.groupAdminId}}
    </div>

    <div class="bg-white shadow-md">

      <div v-if="groupSections">
        <section-item v-for="groupSection in groupSections" :key="groupSection" :groupSection="groupSection" @removeSection="removeSection($event)" @editSection="editSection($event)"/>
      </div>

      <div v-else class="text-center py-5">
        <loader color="lightGreen" size="10" :isLoading="true" />
      </div>

      <div>
        <section-sidebar :title="'Section'" v-model:sideBarState="sectionSideBarState" @actionSuccess="actionSuccess($event)" :selectedGroupId="selectedGroup.groupAdminId"/>
      </div>
    </div>

    <div class="mt-3 xs:w-100 md:w-80">
      <custom-button class="w-100" :extraStyle="'w-100'" @click="openSectionSideBar()" :text="'Maak nieuw tak aan'">
        <template v-slot:icon>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
          </svg>
        </template>
      </custom-button>
    </div>
  </div>
</template>

<script lang="ts">
import { GroupRepository } from '@/repositories/groupRepository'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { useNotification } from '@/composable/useNotification'
import SectionSidebar from '../sideBars/SectionSideBar.vue'
import { defineComponent, watchEffect, ref } from 'vue'
import { CustomButton, Loader } from 'vue-3-component-library'
import { useNavigation } from '@/router/navigation'
import { Section } from '@/serializer/Section'
import SectionItem from '../semantics/SectionItem.vue'

export default defineComponent({
  components: {  
    SectionSidebar,
    CustomButton,
    SectionItem,
    Loader
  },
  name: 'SectionSettings',
  setup () {
    const sectionSideBarState = ref<any>({ state: 'hide', entity: {} })
    const { triggerNotification } = useNotification()
    const { selectedGroup } = useNavigation()
    const groupSections = ref<Section[]>()
1
    const editSection = (section: Section) => {
      sectionSideBarState.value = {
        state: 'edit',
        entity: section,
      }
    }

    const removeSection = (section: Section) => {
      console.log('remove section: ', section)
    }
    const openSectionSideBar = () => {
      sectionSideBarState.value = { state: 'new' }
    }

    const getGroupSections = async (groupId: string) => {
      await RepositoryFactory.get(GroupRepository)
        .getGroupSections(groupId)
        .then((results: Section[]) => {
          groupSections.value = results
        })
    }

    const actionSuccess = (action: string) => {
      if (action === 'POST') {
        triggerNotification('Kamp is succesvol aangemaakt')
      }
      if (action === 'UPDATE') {
        triggerNotification('Kamp is succesvol bewerkt')
      }
      getGroupSections(selectedGroup.value.groupAdminId)
    }

    watchEffect(() => getGroupSections(selectedGroup.value.groupAdminId))

    return {
      sectionSideBarState,
      openSectionSideBar,
      selectedGroup,
      groupSections,
      actionSuccess,
      editSection,
      removeSection
    }
  }
})
</script>
