<template>
  <div class="p-2 bg-lightGray">
    <message class="p-2" :title="check.checkParent.label" :color="{state: ColorState.SUCCES}" />
    <div>
      <member-item v-for="(member) in check.value" :key="member" :member="member" />
    </div>

    <div class="text-center mt-3" v-if="check.value.length === 0">
      <p class="italic">Niets om te weergeven</p>
    </div>

    <div class="xs:w-100 md:w-40">
      <custom-button @click="openMemberSidebar()" class="w-100 mt-4" :extraStyle="'w-100'" :text="check.checkParent.isMultiple ? '+ voeg toe' : '+ voeg toe'" />
    </div>
    <member-sidebar :visum="visum" :check="check" title="Lid" v-model:sideBarState="sidebar" :existingList=[] @actionSuccess="actionSuccess($event)" />
  </div>
</template>

<script lang="ts">
import Message, { ColorState } from '../semantics/message.vue'
import MemberSidebar from '../sideBars/MemberSidebar.vue'
import { CustomButton } from 'vue-3-component-library'
import MemberItem from '../semantics/MemberItem.vue'
import { defineComponent, ref, PropType } from 'vue'
import { Check } from '@/serializer/Check'
import { Visum } from '@/serializer/Visum'

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
    },
    visum: {
      type: Object as PropType<Visum>,
      required: true,
    },
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
