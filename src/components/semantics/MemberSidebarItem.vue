<template>
  <div>
    <div class="flex justify-between">
      <strong>{{ member.fullName }}</strong>
      <div class="flex gap-2 items-center font-bold">
        <input class="cursor-pointer" :value="true" v-model="member.isChecked" type="checkbox" id="checked" name="checked">
      </div>
    </div>

    <div v-if="member.email">
      {{ member.email }}
    </div>

    <div v-if="member.phoneNumber">
      {{ member.phoneNumber }}
    </div>

    <div v-if="member.birthDate">
      {{ member.birthDate }}
    </div>

    <div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Member } from '@/serializer/Member'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'MemberSidebarItem',
  props: {
    member: {
      type: Object as PropType<Member>,
      required: true
    }
  },
  setup() {
    return {
    }
  },
})
</script>
