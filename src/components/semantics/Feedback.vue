<template>
  <div class="p-3 bg-lighterGreen border-l-4 border-lightGreen">
    <strong>{{t('engagement.feedback')}}</strong>
    
    <div>
      <custom-input @changedTextArea="changedTextArea($event)" textAreaWidth="w-100 w-100" :type="InputTypes.TEXT_AREA" :name="'feedback'" />
    </div>
    <div class="flex gap-4 mt-2" v-if="visum.state !== VisumStates.APPROVED">
      <div class="flex gap-2 cursor-pointer" @click="select(StatusFeedbackState.APPROVED)" >
        <i-checked v-if="selection === StatusFeedbackState.APPROVED || selection === StatusFeedbackState.FEEDBACK_RESOLVED" />
        <i-empty-check v-else />
        {{t('engagement.feedback-ok')}}
      </div>

      <div class="flex gap-2 cursor-pointer" @click="select(StatusFeedbackState.APPROVED_FEEDBACK)">
        <i-checked v-if="selection === StatusFeedbackState.APPROVED_FEEDBACK" />
        <i-empty-check v-else />
        {{t('engagement.feedback-not-ok')}}
      </div>

      <div class="flex gap-2 cursor-pointer" @click="select(StatusFeedbackState.DISAPPROVED)">
        <i-checked v-if="selection === StatusFeedbackState.DISAPPROVED" />
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
import { CampRepository } from '@/repositories/campRepository'
import { defineComponent, PropType, watch, ref } from 'vue'
import { SubCategory } from '@/serializer/SubCategory'
import IEmptyCheck from '../icons/IEmptyCheck.vue'
import IChecked from '../icons/IChecked.vue'
import { Visum, VisumStates } from '@/serializer/Visum'
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'

export enum StatusFeedbackState {
      UNDECIDED = 'U',
      APPROVED = 'A',
      APPROVED_FEEDBACK ='N',
      DISAPPROVED = 'D',
      FEEDBACK_RESOLVED = 'F'
    }

export default defineComponent({
  name: 'Feedback',
  components: {
    CustomInput,
    IEmptyCheck,
    IChecked
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
        RepositoryFactory.get(CampRepository)
        .patchCategoryApproval(props.subCategory.id, selection.value)
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
          RepositoryFactory.get(CampRepository)
          .patchCategoryFeedback(props.subCategory.id, values.feedback)
          .then(() => {
            triggerNotification(t('engagement.feedback-notification'))
            rl()
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