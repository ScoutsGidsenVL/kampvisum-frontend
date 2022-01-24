<template>
  <div>
    <message class="p-2" title="3 Fourage" :color="{state: ColorState.SUCCES}" />
    <div class="mt-3">
      <fourage-item :fourage="{name: 'Alejandro Acosta Torres', fullAddress: 'Nieuwstraat 77 Bus 1, 2910 Essen', birthDate: '1997-12-23'}" />
    </div>

    <div class="xs:w-100 md:w-56">
      <custom-button @click="openMemberSidebar()" class="w-100 mt-4" :extraStyle="'w-100'" text="+ voeg fourage toe" />
    </div>
    
    <fourage-sidebar :check="check" title="Fourage" v-model:sideBarState="sidebar" :existingList="[]" @actionSuccess="actionSuccess($event)" />
  </div>
</template>

<script lang="ts">
import Message, { ColorState } from '../semantics/message.vue'
import FourageSidebar from '../sideBars/FourageSideBar.vue'
import { CustomButton } from 'vue-3-component-library'
import FourageItem from '../semantics/FourageItem.vue'
import { defineComponent, ref, PropType } from 'vue'
import { Check } from '@/serializer/Check'

export default defineComponent({
  name: 'MembersOverview',
  components: {
    Message,
    FourageItem,
    CustomButton,
    FourageSidebar
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
