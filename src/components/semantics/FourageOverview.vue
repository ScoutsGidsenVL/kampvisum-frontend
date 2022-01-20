<template>
  <div>
    <message class="p-2" title="3 Fourage" :color="{state: ColorState.SUCCES}" />
    <div>
      <fourage-item :fourage="{name: 'Alejandro Acosta Torres', fullAddress: 'Nieuwstraat 77 Bus 1, 2910 Essen', birthDate: '1997-12-23'}" />
    </div>
    <custom-button @click="openMemberSidebar()" class="mt-4" text="+ voeg fourage toe" />
    <fourage-sidebar title="Fourage" v-model:sideBarState="sidebar" :existingList=[] @actionSuccess="actionSuccess($event)" />
  </div>
</template>

<script lang="ts">
import FourageSidebar from '../sideBars/FourageSideBar.vue'
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
    FourageSidebar
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
