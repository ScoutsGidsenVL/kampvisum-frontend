<template>
  <div class="pb-0">
    <div class="flex gap-1 items-center">
      <message class="p-2" :title="check.checkParent.label" :color="{ state: ColorState.GRAY }" />
      <div v-if="check.checkParent.explanation">
        <i-info :info="check.checkParent.explanation" />
      </div>
    </div>

    <div v-for="file in check.value" :key="file">
      <file-item :file="file" :check="check" @actionSuccess="actionSuccess($event)" />
    </div>

    <div class="text-left mt-3 pl-3" v-if="check.value.length === 0">
      <p class="italic">{{t('checks.document-check.no-document')}}</p>
    </div>

    <div class="pl-3 pb-3">
      <div class="mt-2">
        <custom-button @click="openCreateSidebar()" class="mt-4" :text="t('checks.document-check.add-documents')" />
      </div>
    </div>
  </div>
  <documents-create-sidebar :visum="visum" :check="check" :title="t('checks.document-check.title')" v-model:sideBarState="createSidebar" @actionSuccess="actionSuccess($event)" />
</template>

<script lang="ts">
import DocumentsCreateSidebar from '../sideBars/DocumentsCreateSidebar.vue'
import { useNotification } from '@/composable/useNotification'
import Message, { ColorState } from '../semantics/message.vue'
import { CustomButtonSmall } from 'vue-3-component-library'
import { defineComponent, ref, PropType } from 'vue'
import { Check } from '@/serializer/Check'
import { Visum } from '@/serializer/Visum'
import FileItem from './FileItem.vue'
import { useI18n } from 'vue-i18n'
import IInfo from '../icons/IInfo.vue'

export default defineComponent({
  name: 'OverviewFiles',
  components: {
    'file-item': FileItem,
    'custom-button': CustomButtonSmall,
    DocumentsCreateSidebar,
    Message,
    IInfo
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
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    const openCreateSidebar = (): void => {
      createSidebar.value = { state: 'new' }
    }

    const actionSuccess = (action: string) => {
      if (action === 'PATCH') {
        triggerNotification(t('checks.document-check.notification-patched'))
      }
      if (action === 'DELETE') {
        triggerNotification(t('checks.document-check.notification-deleted'))
      }
      emit('rl', true)
    }

    return {
      openCreateSidebar,
      createSidebar,
      actionSuccess,
      ColorState,
      t
    }
  },
})
</script>
