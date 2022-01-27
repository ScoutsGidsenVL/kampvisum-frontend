<template>
  <div class="p-2 bg-white shadow-md">
    <message class="p-2" :title="check.checkParent.label" :color="{state: ColorState.SUCCES}" />
    <div>
      <member-item v-for="(member) in check.value" :key="member" :member="member" />
    </div>

    <div class="text-center mt-3" v-if="check.value.length === 0">
      <p class="italic">Niets om te weergeven</p>
    </div>

    <div class="flex justify-center">
      <div class="xs:w-100 md:w-40">
        <custom-button @click="openMemberSidebar()" class="w-100 mt-4" :extraStyle="'w-100'" text="+ voeg toe" />
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
import { CustomButton } from 'vue-3-component-library'
import { defineComponent, ref, PropType } from 'vue'
import Message, { ColorState } from './message.vue'
import { Check } from '@/serializer/Check'
import { Visum } from '@/serializer/Visum'
import MemberItem from './MemberItem.vue'

export default defineComponent({
  name: 'MembersOverview',
  components: {
    Message,
    MemberItem,
    CustomButton,
    ParticipantSidebar,
    MemberSidebar
  },
  props: {
    check: {
      type: Object as PropType<Check>,
      required: true
    },
    visum: {
      type: Object as PropType<Visum>,
      required: true,
    },
  },
  setup (props, { emit }) {
    const { triggerNotification } = useNotification()
    const sidebar = ref<any>({state: 'hide'})

    const openMemberSidebar = (): void => {
      sidebar.value = {state: 'search'}
    }

    const actionSuccess = (action: string) => {
      if (action === 'PATCH') {
        triggerNotification('Lid/leden succesvol toegevoegd')
        emit('rl', true)
      }
      if (action === 'DELETE') {
        triggerNotification('Lid succesvol verwijderd uit de lijst')
        emit('rl', true)
      }
    }

    return {
      openMemberSidebar,
      actionSuccess,
      ColorState,
      sidebar
    }
  }
})
</script>
