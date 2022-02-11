<template>
  <!-- TABS -->
  <div class="flex -ml-8 -mr-8 bg-white border-gray border border-5">
    <div @click="setTabState('sections')" class="text-center w-full cursor-pointer" :class="tabState === 'sections' ? 'text-white bg-green' : ''">
      <h3 class="font-museo-sans font-semibold mt-2">
        takken
      </h3>
    </div>
    <div @click="setTabState('deadlines')" class="text-center w-full cursor-pointer" :class="tabState === 'deadlines' ? 'text-white bg-green' : ''">
      <h3 class="font-museo-sans font-semibold mt-2">
        deadlines
      </h3>
    </div>
  </div>

  <!-- TO DISPLAY -->
  <div class="p-3">
    <sections-settings v-if="tabState === 'sections'" />
    <deadline-settings v-if="tabState === 'deadlines'" />
  </div>
</template>

<script lang="ts">
import SectionsSettings from '@/components/settings/SectionsSettings.vue'
import DeadlineSettings from '@/components/settings/DeadlineSettings.vue'
import { defineComponent, ref } from 'vue'
import { useNavigation } from '@/router/navigation'

export default defineComponent({
  components: { SectionsSettings, DeadlineSettings },
  name: 'SettingsOverview',
  setup() {
    const { setBreadcrumbs } = useNavigation()
    const tabState = ref<string>('sections')
    const setTabState = (state: string) => {
      tabState.value = state
    }

    setBreadcrumbs([{ title: 'instellingen', name: 'instellingen', uuid: '' }])

    return {
      tabState,
      setTabState
    }
  }
})
</script>
