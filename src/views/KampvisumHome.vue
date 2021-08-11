<template>
  <div class="home">
    <custom-button @click="openCampSideBar()" :isSubmitting="false" :text="t('pages.kampvisum-overview.create-camp-button')">
      <template v-slot:icon>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline ml-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
        </svg>
      </template>
    </custom-button>

    <camp-side-bar :title="t('sidebars.kampvisum-sidebar.title')" v-model:sideBarState="campSideBarState"/>

  </div>
</template>

<script lang="ts">
import { CustomButton, sideBarState } from 'vue-3-component-library'
import CampSidebar from '../components/sideBars/CampSideBar.vue'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'KampvisumHome',
  components: {
    'custom-button': CustomButton,
    'camp-side-bar': CampSidebar,
  },
  setup() {
    const campSideBarState = ref<sideBarState<any>>({ state: 'hide' })
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    const openCampSideBar = () => {
      campSideBarState.value = { state: 'new' }
    }

    return { t, campSideBarState, openCampSideBar }
  },
})
</script>
