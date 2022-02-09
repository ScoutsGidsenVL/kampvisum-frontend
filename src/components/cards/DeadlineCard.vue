<template>
  <div class="bg-white shadow-md">
    <deadline-important-alert v-if="deadline.isImportant" />
    <div class="flex justify-between p-3">
      <div class="flex items-center">
        <!-- CHECK ICON -->
        <!-- <pre>
          {{deadline}}
        </pre> -->
        <div class="mr-2.5">
          <i-checked />
          <i-empty-check />
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
import DeadlineImportantAlert from '../semantics/DeadlineImportantAlert.vue'
import IRightArrow from '../icons/IRightArrow.vue'
import { Deadline } from '@/serializer/Deadline'
import IImportant from '../icons/IImportant.vue'
import { defineComponent, PropType } from 'vue'
import IChecked from '../icons/IChecked.vue'
import IEmptyCheck from '../icons/IEmptyCheck.vue'

export default defineComponent({
  name: 'DeadlineInfoCard',
  components: {
    IRightArrow,
    IImportant,
    DeadlineImportantAlert,
    IChecked,
    IEmptyCheck
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
