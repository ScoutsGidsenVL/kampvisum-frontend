<template>
  <div>
    <div class="italic font-bold py-2">{{ t('pages.settings.sections.sections-for') }} {{ selectedGroup.groupAdminId }}</div>

    <warning
      v-if="isWarningDisplayed"
      :title="sectionToBeDeleted.name.name"
      :isLoading="isDeletingVisum"
      :isDisplayed="isWarningDisplayed"
      :text="t('pages.settings.sections.delete-warning')"
      :leftButton="t('pages.settings.sections.delete-warning-button-left')"
      :rightButton="t('pages.settings.sections.delete-warning-button-right')"
      @leftButtonClicked="hideWarning()"
      @rightButtonClicked="removeSection()"
    />

    <div class="bg-white shadow-md">
      <div v-if="groupSections">
        <section-item v-for="groupSection in groupSections" :key="groupSection" :groupSection="groupSection" @removeSection="displayWarning($event)" @editSection="editSection($event)" />
      </div>

      <div v-else class="text-center py-5">
        <loader color="lightGreen" size="10" :isLoading="true" />
      </div>

      <div>
        <section-sidebar
          :title="t('pages.settings.sections.sidebar.title')"
          v-model:sideBarState="sectionSideBarState"
          @actionSuccess="actionSuccess($event)"
          :selectedGroupId="selectedGroup.groupAdminId"
        />
      </div>
    </div>

    <div class="mt-3 xs:w-100 md:w-80">
      <custom-button-small class="w-100" :extraStyle="'w-100'" @click="openSectionSideBar()" :text="t('pages.settings.sections.create-section')">
        <template v-slot:icon>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
          </svg>
        </template>
      </custom-button-small>
    </div>
  </div>
</template>

<script lang="ts">
import { CustomButtonSmall, Loader, Warning } from 'vue-3-component-library'
import { SectionsRepository } from '@/repositories/SectionsRepository'
import { GroupRepository } from '@/repositories/groupRepository'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { useNotification } from '@/composable/useNotification'
import SectionSidebar from '../sideBars/SectionSideBar.vue'
import { defineComponent, watchEffect, ref } from 'vue'
import SectionItem from '../semantics/SectionItem.vue'
import { Section } from '@/serializer/Section'
import { useI18n } from 'vue-i18n'
import useGroupAndYears from '@/composable/useGroupAndYears'

export default defineComponent({
  components: {
    SectionSidebar,
    CustomButtonSmall,
    SectionItem,
    Loader,
    warning: Warning,
  },
  name: 'SectionSettings',
  setup() {
    const sectionSideBarState = ref<any>({ state: 'hide', entity: {} })
    const { triggerNotification } = useNotification()
    const { selectedGroup } = useGroupAndYears()
    const groupSections = ref<Section[]>()
    const isWarningDisplayed = ref<Boolean>(false)
    const sectionToBeDeleted = ref<Section>()
    const editSection = (section: Section) => {
      sectionSideBarState.value = {
        state: 'edit',
        entity: section,
      }
    }

    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    const displayWarning = (section: Section) => {
      isWarningDisplayed.value = true
      sectionToBeDeleted.value = section
    }

    const hideWarning = () => {
      isWarningDisplayed.value = false
    }

    const removeSection = async () => {
      if (sectionToBeDeleted.value && sectionToBeDeleted.value.id) {
        await RepositoryFactory.get(SectionsRepository)
          .removeById(sectionToBeDeleted.value.id)
          .then(() => {
            getGroupSections(selectedGroup.value.groupAdminId)
            isWarningDisplayed.value = false
            triggerNotification(t('pages.settings.sections.notification-deleted'))
          })
      }
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
        triggerNotification(t('pages.settings.sections.notification-posted'))
        getGroupSections(selectedGroup.value.groupAdminId)
      }
      if (action === 'UPDATE') {
        triggerNotification(t('pages.settings.sections.notification-updated'))
        getGroupSections(selectedGroup.value.groupAdminId)
      }
      getGroupSections(selectedGroup.value.groupAdminId)
    }

    watchEffect(() => getGroupSections(selectedGroup.value.groupAdminId))

    return {
      sectionSideBarState,
      openSectionSideBar,
      isWarningDisplayed,
      sectionToBeDeleted,
      displayWarning,
      selectedGroup,
      groupSections,
      actionSuccess,
      removeSection,
      editSection,
      hideWarning,
      t,
    }
  },
})
</script>
