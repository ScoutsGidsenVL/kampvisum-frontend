<template>
  <div class="p-3 bg-lighterGreen border-l-4 border-lightGreen">
    <strong>{{t('engagement.feedback')}}</strong>
    
    <div>
      <custom-input @changedTextArea="changedTextArea($event)" textAreaWidth="w-100 w-100" :type="InputTypes.TEXT_AREA" :name="'feedback'" />
    </div>
    <div class="flex gap-4 mt-2">
      <div class="flex gap-2 cursor-pointer" @click="select(StatusFeedbackState.APPROVED)" >
        <i-checked v-if="(selection === StatusFeedbackState.APPROVED)" />
        <i-empty-check v-else />
        {{t('engagement.feedback-ok')}}
      </div>

      <div class="flex gap-2 cursor-pointer" @click="select(StatusFeedbackState.APPROVED_FEEDBACK)">
        <i-check-warning v-if="(selection === StatusFeedbackState.APPROVED_FEEDBACK) || (selection === StatusFeedbackState.FEEDBACK_READ)" />
        <i-empty-check v-else />
        {{t('engagement.feedback-not-ok')}}
      </div>

      <div class="flex gap-2 cursor-pointer" @click="select(StatusFeedbackState.DISAPPROVED)">
        <i-check-cross v-if="(selection === StatusFeedbackState.DISAPPROVED) || (selection === StatusFeedbackState.FEEDBACK_RESOLVED)" />
        <i-empty-check v-else />
        {{t('engagement.feedback-declined')}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { InputTypes, CustomInput } from 'vue-3-component-library'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { useNotification } from '@/composable/useNotification'
import { CampVisumRepository } from '@/repositories/CampVisumRepository'
import { defineComponent, PropType, watch, ref } from 'vue'
import { Visum, VisumStates } from '@/serializer/Visum'
import { SubCategory } from '@/serializer/SubCategory'
import ICheckWarning from '../icons/ICheckWarning.vue'
import ICheckCross from '../icons/ICheckedCross.vue'
import IEmptyCheck from '../icons/IEmptyCheck.vue'
import IChecked from '../icons/IChecked.vue'
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import useGroupAndYears from '@/composable/useGroupAndYears'

export enum StatusFeedbackState {
      FEEDBACK_RESOLVED = 'F',
      APPROVED_FEEDBACK ='N',
      FEEDBACK_READ = 'R',
      DISAPPROVED = 'D',
      UNDECIDED = 'U',
      APPROVED = 'A',
    }

export default defineComponent({
  name: 'Feedback',
  components: {
    CustomInput,
    IEmptyCheck,
    IChecked,
    ICheckWarning,
    ICheckCross
  },
  props: {
    subCategory: {
      type: Object as PropType<SubCategory>,
      required: true,
    },
    visum: {
      type: Object as PropType<Visum>,
      required: true,
    },
  },
  setup (props, {emit}) {
    const { selectedGroup } = useGroupAndYears()
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    const { triggerNotification } = useNotification()
    let debounce: any

    const { values } = useForm({
      initialValues: { feedback: props.subCategory.feedback ? props.subCategory.feedback : '' },
    })

    const selection = ref<string>(props.subCategory.approval ? props.subCategory.approval : StatusFeedbackState.UNDECIDED)

    const select = (v: StatusFeedbackState) => {
      selection.value = v
      if (props.subCategory.id) {
        RepositoryFactory.get(CampVisumRepository)
        .patchCategoryApproval(selectedGroup.value.groupAdminId, props.subCategory.id, selection.value)
        .then(() => {
          triggerNotification(t('engagement.feedback-notification'))
          rl()
        })
      }
    }

    watch(
      () => values.feedback,
      () => {
        clearTimeout(debounce)
        debounce = setTimeout(() => {
          if (props.subCategory.id) {
          RepositoryFactory.get(CampVisumRepository)
          .patchCategoryFeedback(selectedGroup.value.groupAdminId, props.subCategory.id, values.feedback)
          .then(() => {
            triggerNotification(t('engagement.feedback-notification'))
            // rl()
          })
          }
        }, 1000)
      }
    )

    const rl = () => {
      emit('rl', true)
    }

    return {
      StatusFeedbackState,
      InputTypes,
      selection,
      VisumStates,
      values,
      select,
      t
    }
  }
})
</script>