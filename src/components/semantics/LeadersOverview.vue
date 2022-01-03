<template>
  <div>
    <message class="p-2" title="3 Leiding" :color="{state: ColorState.SUCCES}" />
    <div>
      <leader-item :leader="{name: 'Pajaro Acosta Torres'}" />
    </div>
    <custom-button @click="openMemberSidebar()" class="mt-4" text="+ voeg leiding toe" />
    <member-sidebar title="Lid" v-model:sideBarState="sidebar" :existingList=[] @actionSuccess="actionSuccess($event)" />
  </div>
</template>

<script lang="ts">
import Message, { ColorState } from '../semantics/message.vue'
import MemberSidebar from '../sideBars/MemberSidebar.vue'
import { CustomButton } from 'vue-3-component-library'
import LeaderItem from '../semantics/LeaderItem.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'LeadersOverview',
  components: {
    Message,
    LeaderItem,
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
