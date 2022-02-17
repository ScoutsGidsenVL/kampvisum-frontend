<template>
  <div class="pb-0">
    <message class="p-2" :title="check.checkParent.label" :color="{ state: ColorState.GRAY }" />
    <div v-for="file in check.value" :key="file">
      <file-item :file="file" :check="check" @actionSuccess="actionSuccess($event)" />
    </div>

    <div class="text-left mt-3 pl-3" v-if="check.value.length === 0">
      <p class="italic">Geen document</p>
    </div>

    <div class="pl-3 pb-3">
      <div class="mt-2">
        <custom-button @click="openCreateSidebar()" class="mt-4" text="+ voeg document(en) toe" />
      </div>
    </div>
  </div>
  <documents-create-sidebar :visum="visum" :check="check" title="Documenten" v-model:sideBarState="createSidebar" @actionSuccess="actionSuccess($event)" />
</template>

<script lang="ts">
import DocumentsCreateSidebar from '../sideBars/DocumentsCreateSidebar.vue'
import { useNotification } from '@/composable/useNotification'
import { CustomButton } from 'vue-3-component-library'
import { defineComponent, ref, PropType } from 'vue'
import { Check } from '@/serializer/Check'
import FileItem from './FileItem.vue'
import { Visum } from '@/serializer/Visum'
import Message, { ColorState } from '../semantics/message.vue'

export default defineComponent({
  name: 'OverviewFiles',
  components: {
    'file-item': FileItem,
    'custom-button': CustomButton,
    DocumentsCreateSidebar,
    Message,
  },
  props: {
    check: {
      type: Object as PropType<Check>,
      required: true,
    },
    visum: {
      type: Object as PropType<Visum>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { triggerNotification } = useNotification()
    const createSidebar = ref<any>({ state: 'hide' })

    const openCreateSidebar = (): void => {
      createSidebar.value = { state: 'new' }
    }

    const actionSuccess = (action: string) => {
      if (action === 'PATCH') {
        triggerNotification('Bestand(en) succesvol toegevoegd')
      }
      if (action === 'DELETE') {
        triggerNotification('Bestand succesvol verwijderd uit de lijst')
      }
      emit('rl', true)
    }

    return {
      openCreateSidebar,
      createSidebar,
      actionSuccess,
      ColorState,
    }
  },
})
</script>
