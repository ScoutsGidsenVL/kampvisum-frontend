<template>
  <div>
    <message class="p-2" title="3 Leden" :color="{state: ColorState.SUCCES}" />
    <div>
      <member-item :member="{name: 'Ricardo Acosta Torres', hasPaid: false}" />
    </div>
    <custom-button @click="openMemberSidebar()" class="mt-4" text="+ voeg leden toe" />
    <member-sidebar title="Lid" v-model:sideBarState="sidebar" :existingList=[] @actionSuccess="actionSuccess($event)" />
  </div>
</template>

<script lang="ts">
import MemberSidebar from '../sideBars/MemberSidebar.vue'
import Message, { ColorState } from '../semantics/message.vue'
import { CustomButton } from 'vue-3-component-library'
import MemberItem from '../semantics/MemberItem.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MembersOverview',
  components: {
    Message,
    MemberItem,
    CustomButton,
    MemberSidebar
  },
  props: {
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
