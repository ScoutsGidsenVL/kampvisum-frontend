<template>
  <div @click="toggle(member)" :class="displayCheck ? 'cursor-pointer' : ''">
    <div class="flex justify-between">
      <div class="w-100 grid grid-cols-2">
      <div>
        <strong>{{ member.fullName }}</strong>
      </div>
        <div v-if="member.birthDate">
          {{ dateFromLocalisedString(member.birthDate) }}
        </div>
      </div>
      <div class="flex gap-2 items-center font-bold">
        <input :disabled="!displayCheck" :class="displayCheck ? 'cursor-pointer' : '' " :value="true" v-model="member.isChecked" type="checkbox" id="checked" name="checked">
      </div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Member } from '@/serializer/Member'
import { defineComponent, PropType } from 'vue'
import { useDateHelper } from '@/helpers/dateHelper'

export default defineComponent({
  name: 'MemberSidebarItem',
  props: {
    member: {
      type: Object as PropType<Member>,
      required: true
    },
    displayCheck: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const { dateFromLocalisedString } = useDateHelper()
    const toggle = (member: Member) => {
      if (props.displayCheck) {
        member.isChecked = !member.isChecked
      }
    }

    return {
      dateFromLocalisedString,
      toggle
    }
  },
})
</script>
