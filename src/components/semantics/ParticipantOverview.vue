<template>
  <div class="pb-3">
    <message class="p-2" :title="check.checkParent.label" :color="{ state: ColorState.GRAY }" />
    <div class="">
      <member-item
        v-for="participant in check.value.participants"
        :key="participant"
        :check="check"
        :participant="participant"
        @actionSuccess="actionSuccess($event)"
        @openSidebarToEdit="openSidebarToEdit($event)"
      />
    </div>

    <div class="text-left pl-3 mt-3" v-if="check.value.length === 0">
      <p class="italic">{{ !check.checkParent.isMultiple ? t('checks.participant-check.no-member') : t('checks.participant-check.no-members') }}</p>
    </div>

    <div class="flex pl-3">
      <div class="xs:w-100 md:w-40">
        <custom-button-small
          @click="openMemberSidebar()"
          class="w-100 mt-4"
          :extraStyle="'w-100'"
          :text="check.value.length > 0 ? (check.checkParent.isMultiple ? t('checks.participant-check.add') : t('checks.participant-check.change')) : t('checks.participant-check.add')"
        />
      </div>
    </div>

    <member-sidebar v-if="check.checkParent.isMember" :visum="visum" :check="check" v-model:sideBarState="sidebar" @actionSuccess="actionSuccess($event)" />
    <participant-sidebar v-if="!check.checkParent.isMember" :visum="visum" :check="check" v-model:sideBarState="sidebar" @actionSuccess="actionSuccess($event)" />
  </div>
</template>

<script lang="ts">
import ParticipantSidebar from '../sideBars/ParticipantSideBar.vue'
import { useNotification } from '@/composable/useNotification'
import MemberSidebar from '../sideBars/MemberSidebar.vue'
import { CustomButtonSmall } from 'vue-3-component-library'
import { defineComponent, ref, PropType } from 'vue'
import Message, { ColorState } from './message.vue'
import { Check } from '@/serializer/Check'
import { Visum } from '@/serializer/Visum'
import MemberItem from './MemberItem.vue'
import { Member } from '@/serializer/Member'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'MembersOverview',
  components: {
    Message,
    MemberItem,
    CustomButtonSmall,
    ParticipantSidebar,
    MemberSidebar,
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
    const sidebar = ref<any>({ state: 'hide' })

    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    const openMemberSidebar = (): void => {
      sidebar.value = { state: 'search' }
    }

    const actionSuccess = (action: string) => {
      if (action === 'PATCH') {
        triggerNotification(t('checks.participant-check.notification-patched'))
      }
      if (action === 'DELETE') {
        triggerNotification(t('checks.participant-check.notification-deleted'))
      }
      emit('rl', true)
    }

    const openSidebarToEdit = (m: Member) => {
      sidebar.value = { state: 'edit', entity: m }
    }

    return {
      openSidebarToEdit,
      openMemberSidebar,
      actionSuccess,
      ColorState,
      sidebar,
      t
    }
  },
})
</script>
