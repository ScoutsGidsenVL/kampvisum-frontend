<template>
  <div>
    <h2 class="font">
      {{ t('pages.settings.deadlines.title') }}
    </h2>
  </div>

  <div class="mt-3">
    <custom-button @click="openDeadlineCreateSidebar()" class="w-100" extraStyle="w-100" :isSubmitting="false" text="+ nieuwe deadline maken" />
  </div>

  <deadline-create-sidebar title="create" v-model:sideBarState="createSidebar" @actionSuccess="actionSuccess($event)" />
</template>

<script lang="ts">
import DeadlineCreateSidebar from '../sideBars/DeadlineCreateSidebar.vue'
import { CustomButtonSmall } from 'vue-3-component-library'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'DeadlineSettings',
  components: {
    DeadlineCreateSidebar,
    CustomButtonSmall
  },
  setup () {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    const createSidebar = ref<any>({state: 'hide'})


    const openDeadlineCreateSidebar = (): void => {
      createSidebar.value = {state: 'new'}
    }

    const actionSuccess = (action: string) => {
      if (action === 'POST') {
        // console.log('Kamp is succesvol aangemaakt')
      }
      if (action === 'UPDATE') {
        // console.log('Kamp is succesvol bewerkt')
      }
      // get deadlines again to update the data in the sidebar
    }

    return {
      t,
      createSidebar,
      actionSuccess,
      openDeadlineCreateSidebar
    }
  }
})
</script>
