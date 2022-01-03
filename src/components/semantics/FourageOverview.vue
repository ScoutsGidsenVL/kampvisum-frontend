<template>
  <div>
    <message class="p-2" title="3 Fourage" :color="{state: ColorState.SUCCES}" />
    <div>
      <fourage-item :fourage="{name: 'Alejandro Acosta Torres'}" />
    </div>
    <custom-button @click="openMemberSidebar()" class="mt-4" text="+ voeg fourage toe" />
    <member-sidebar title="Lid" v-model:sideBarState="sidebar" :existingList=[] @actionSuccess="actionSuccess($event)" />
  </div>
</template>

<script lang="ts">
import MemberSidebar from '../sideBars/MemberSidebar.vue'
import Message, { ColorState } from '../semantics/message.vue'
import { CustomButton } from 'vue-3-component-library'
import FourageItem from '../semantics/FourageItem.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MembersOverview',
  components: {
    Message,
    FourageItem,
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
