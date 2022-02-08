<template>
  <div class="bg-white shadow-md">
    <div v-if="isImportant" class="border-l-4 border-red p-2 flex items-center gap-3">
      <i-important />
      <div>
        <h1 class="text-lg m-0">Belangerijk</h1>
      </div>
    </div>
    <div class="flex justify-between p-3">
      <div class="flex items-center">
        <!-- CHECK ICON -->
        <div class="mr-2.5">
          <svg v-if="true" class="mt-1 fill-current text-green" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.393 7.5l-5.643 5.784-2.644-2.506-1.856 1.858 4.5 4.364 7.5-7.643-1.857-1.857z"/></svg>
          <!-- <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M 12 2 c 5.514 0 10 4.486 10 10 s -4.486 10 -10 10 s -10 -4.486 -10 -10 s 4.486 -10 10 -10 z m 0 -2 c -6.627 0 -12 5.373 -12 12 s 5.373 12 12 12 s 12 -5.373 12 -12 s -5.373 -12 -12 -12 z z"/></svg> -->
        </div>

        <div>
          <strong class="xs:text-sm">
            {{deadline.label}}
          </strong>
          <p>
            {{deadline.dueDate.dateDay}}/{{deadline.dueDate.dateMonth}}/{{deadline.dueDate.dateYear}}
          </p>
        </div>
      </div>
      <!-- ARROW ICON -->
      <div @click="arrowClick()" class="flex items-center cursor-pointer">
        <i-right-Arrow />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Deadline } from '@/serializer/Deadline'
import { defineComponent, PropType } from 'vue'
import IImportant from '../icons/IImportant.vue'
import IRightArrow from '../icons/IRightArrow.vue'

export default defineComponent({
  name: 'DeadlineInfoCard',
  components: {
    IRightArrow,
    IImportant
  },
  props: {
    isImportant: Boolean,
    deadline: {
      type: Object as PropType<Deadline>,
      required: true
    }
  },
  setup (props, { emit }) {

    const arrowClick = () => {
      emit('openDeadline', props.deadline)
    }

    return {
      arrowClick
    }
  }
})
</script>
