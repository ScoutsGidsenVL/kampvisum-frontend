<template>
  <div @click="arrowClick()" class="cursor-pointer bg-white shadow-md">
    <deadline-important-alert v-if="deadline.deadlineParent.isImportant" />
    <div class="flex justify-between p-3">
      <div class="flex items-center">
        <!-- CHECK ICON -->
        <div class="mr-2.5">
          <i-checked v-if="deadline.state === 'CHECKED'" />
          <i-empty-check v-if="deadline.state === 'UNCHECKED'" :gray="true" />
        </div>
        <div>
          <strong class="font-museo text-md font-semibold">
            {{ deadline.deadlineParent.label }}
          </strong>
          <p class="font-museo text-sm font-normal">
            <!-- {{deadline.deadlineParent.dueDate.calculatedDate}} -->
            {{ deadline.deadlineParent.dueDate.dateDay }}/{{ deadline.deadlineParent.dueDate.dateMonth }}/{{ deadline.deadlineParent.dueDate.dateYear }}
          </p>
        </div>
      </div>
      <!-- ARROW ICON -->
      <div class="flex items-center">
        <i-right-Arrow />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import DeadlineImportantAlert from '../semantics/DeadlineImportantAlert.vue'
import IRightArrow from '../icons/IRightArrow.vue'
import IEmptyCheck from '../icons/IEmptyCheck.vue'
import { Deadline } from '@/serializer/Deadline'
import IImportant from '../icons/IImportant.vue'
import { defineComponent, PropType } from 'vue'
import IChecked from '../icons/IChecked.vue'

export default defineComponent({
  name: 'DeadlineInfoCard',
  components: {
    DeadlineImportantAlert,
    IRightArrow,
    IImportant,
    IEmptyCheck,
    IChecked,
  },
  props: {
    isImportant: Boolean,
    deadline: {
      type: Object as PropType<Deadline>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const arrowClick = () => {
      emit('openDeadline', props.deadline)
    }

    return {
      arrowClick,
    }
  },
})
</script>
