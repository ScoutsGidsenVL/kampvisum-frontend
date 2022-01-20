<template>
  <div class=" flex flex-col md:flex-row gap-3 md:gap-0 justify-between p-2.5">
    <div class="flex gap-3 items-center">
      <i-person />
      <div>
        {{ fourage.name }}
      </div>
    </div>

    <div class="flex justify-between md:gap-3 items-center">
      <div class="hover:text-red underline cursor-pointer">
        verwijder
      </div>
    </div>    
  </div>
</template>

<script lang="ts">
import { FourageMember } from '../../serializer/FourageMember'
import { defineComponent, PropType } from 'vue'
import IPerson from '../icons/IPerson.vue'
import IInfo from '../icons/IInfo.vue'

export default defineComponent({
  name: 'MemberItem',
  components: {
    IPerson,
    IInfo
  },
  props: {
    fourage: {
      type: Object as PropType<FourageMember>,
      required: true,
      default: () => { return {} }
    }
  },
  setup () {
    return {
    }
  }
})
</script>
