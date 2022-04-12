<template>
  <div class="p-3">
    <strong>{{t('engagement.feedback')}}</strong>
    <div>
      <custom-input @changedTextArea="changedTextArea($event)" textAreaWidth="w-100 w-100" :type="InputTypes.TEXT_AREA" :name="'feedback'" />
    </div>
    <div class="flex gap-4 mt-2">
      <div class="flex gap-2 cursor-pointer" @click="select(StatusFeedbackState.OK)" >
        <i-checked v-if="selection === StatusFeedbackState.OK" />
        <i-empty-check v-else />
        {{t('engagement.feedback-ok')}}
      </div>

      <div class="flex gap-2 cursor-pointer" @click="select(StatusFeedbackState.NOT_OK)">
        <i-checked v-if="selection === StatusFeedbackState.NOT_OK" />
        <i-empty-check v-else />
        {{t('engagement.feedback-not-ok')}}
      </div>

      <div class="flex gap-2 cursor-pointer" @click="select(StatusFeedbackState.DECLINED)">
        <i-checked v-if="selection === StatusFeedbackState.DECLINED" />
        <i-empty-check v-else />
        {{t('engagement.feedback-declined')}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { InputTypes, CustomInput } from 'vue-3-component-library'
import { useNotification } from '@/composable/useNotification'
import { defineComponent, PropType, watch, ref } from 'vue'
import { SubCategory } from '@/serializer/SubCategory'
import IEmptyCheck from '../icons/IEmptyCheck.vue'
import IChecked from '../icons/IChecked.vue'
import { Visum } from '@/serializer/Visum'
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'

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
  setup (props) {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    const { triggerNotification } = useNotification()
    let debounce: any

    const { values } = useForm({
      initialValues: { feedback: props.subCategory.feedback ? props.subCategory.feedback : '' },
    })

    const patchFeedbackCheck = async (feedback: string) => {
      triggerNotification(t('engagement.feedback-notification'))
    }

    enum StatusFeedbackState {
      OK = 'OK',
      NOT_OK = 'NOT_OK',
      DECLINED = 'DECLINED',
    }

    const selection = ref<string>('')

    const select = (v: StatusFeedbackState) => {
      selection.value = v
      triggerNotification(t('engagement.feedback-notification'))
    }

    watch(
      () => values.feedback,
      () => {
        clearTimeout(debounce)
        debounce = setTimeout(() => {
          patchFeedbackCheck(values.feedback)
        }, 1000)
      }
    )

    return {
      StatusFeedbackState,
      InputTypes,
      selection,
      values,
      select,
      t
    }
  }
})
</script>