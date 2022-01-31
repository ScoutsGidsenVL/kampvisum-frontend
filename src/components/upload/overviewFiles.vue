<template>
  <div class="p-2 bg-white shadow-md border-2 border-gray">
    <div v-for="(file) in check.value" :key="file">
      <file-item :file="file" :check="check" @actionSuccess="actionSuccess($event)" />
    </div>

    <div class="text-center mt-3" v-if="check.value.length === 0">
      <p class="italic">Niets om te weergeven</p>
    </div>

    <div>
      <div class="mt-2 text-center">
        <custom-button @click="openLocationCreateSidebar()" class="mt-4" text="+ voeg document(en) toe" />
      </div>
    </div>
  </div>
  <documents-create-sidebar :check="check" title="Documenten" v-model:sideBarState="createSidebar" @actionSuccess="actionSuccess($event)" />
</template>

<script lang="ts">
import DocumentsCreateSidebar from '../sideBars/DocumentsCreateSidebar.vue'
import { useNotification } from '@/composable/useNotification'
import { CustomButton } from 'vue-3-component-library'
import { defineComponent, ref, PropType } from 'vue'
import { Check } from '@/serializer/Check'
import FileItem from './FileItem.vue'

export default defineComponent({
  name: 'OverviewFiles',
  components: {
    'file-item': FileItem,
    'custom-button': CustomButton,
    DocumentsCreateSidebar
  },
  props: {
    check: {
      type: Object as PropType<Check>,
      required: true
    },
  },
  setup (props, { emit }) {
    const { triggerNotification } = useNotification()
    const createSidebar = ref<any>({state: 'hide'})

    const openLocationCreateSidebar = (): void => {
      createSidebar.value = {state: 'new'}
    }

    const actionSuccess = (action: string) => {
      if (action === 'UPDATE') {
        triggerNotification('Bestand(en) succesvol toegevoegd')
      }
      if (action === 'DELETE') {
        triggerNotification('Bestand succesvol verwijderd uit de lijst')
      }
      emit('rl', true)
    }

    return {
      openLocationCreateSidebar,
      createSidebar,
      actionSuccess
    }
  }
})
</script>
