<template>
  <div>
    <message class="p-2" title="3 Leden" :color="{state: ColorState.SUCCES}" />
    <div>
      <member-item :member="{name: 'Ricardo Acosta Torres', hasPaid: false}" />
    </div>
    <custom-button @click="openMemberSidebar()" class="mt-4" text="+ voeg leden toe" />
    <member-sidebar :check="check" title="Lid" v-model:sideBarState="sidebar" :existingList=[] @actionSuccess="actionSuccess($event)" />
  </div>
</template>

<script lang="ts">
import Message, { ColorState } from '../semantics/message.vue'
import MemberSidebar from '../sideBars/MemberSidebar.vue'
import { CustomButton } from 'vue-3-component-library'
import MemberItem from '../semantics/MemberItem.vue'
import { defineComponent, ref, PropType } from 'vue'
import { Check } from '@/serializer/Check'

export default defineComponent({
  name: 'MembersOverview',
  components: {
    Message,
    MemberItem,
    CustomButton,
    MemberSidebar
  },
  props: {
    check: {
      type: Object as PropType<Check>,
      required: true
    }
  },
  setup () {

    const sidebar = ref<any>({state: 'hide'})

    const openMemberSidebar = (): void => {
      sidebar.value = {state: 'new'}
    }

    return {
      ColorState,
      openMemberSidebar,
      sidebar
    }
  }
})
</script>
