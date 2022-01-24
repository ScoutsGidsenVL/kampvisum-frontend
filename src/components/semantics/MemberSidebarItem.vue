<template>
  <div>
    <div>
      <strong>{{ member.fullName }}</strong>
    </div>

    <div v-if="member.email">
      {{ member.email }}
    </div>

    <div v-if="member.phoneNumber">
      {{ member.phoneNumber }}
    </div>

    <div v-if="member.fullAddress">
      {{ member.fullAddress }}
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
