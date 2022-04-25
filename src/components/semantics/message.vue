<template>
  <div
    class="flex items-center justify-between px-3"
    :class="{
      'border-l-8 border-red bg-lightRed': color.state === ColorState.DANGER,
      'border-l-8 border-lightGreen bg-lighterGreen': color.state === ColorState.SUCCES,
      'border-l-8 border-orange bg-lightOrange': color.state === ColorState.WARNING,
      'border-black bg-gray': color.state === ColorState.GRAY,
    }"
  >
    <div class="py-2">
      <div>
        <h1
          class="text-lg m-0"
          :class="{
            'text-red': color.state === ColorState.DANGER,
            'text-lightGreen': color.state === ColorState.SUCCES,
            'text-orange': color.state === ColorState.WARNING,
            'text-black': color.state === ColorState.GRAY,
          }"
        >
          {{ title }}
        </h1>
      </div>
      <div>
        <p>
          {{ text }}
        </p>
      </div>
    </div>
    <div v-if="hasCheck">
      <div class="flex gap-3 cursor-pointer">
        <i-empty-check @click="agree()" v-if="!isChecked" />
        <i-checked v-if="isChecked" />
        <div>
          {{t('engagement.ok')}}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import IChecked from '../icons/IChecked.vue'
import IEmptyCheck from '../icons/IEmptyCheck.vue'
import { useI18n } from 'vue-i18n'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { CampRepository } from '@/repositories/campRepository'
import { SubCategory } from '@/serializer/SubCategory'
import { useNotification } from '@/composable/useNotification'

export enum ColorState {
  SUCCES = 'SUCCES',
  DANGER = 'DANGER',
  WARNING = 'WARNING',
  GRAY = 'GRAY',
}

export type Color = {
  state: ColorState
}

export default defineComponent({
  components: { IEmptyCheck, IChecked },
  name: 'Message',
  props: {
    title: {
      type: String,
      required: true,
      default: 'default title',
    },
    text: String,
    color: {
      type: Object as PropType<Color>,
      required: false,
      default: () => {
        return { state: ColorState.SUCCES }
      },
    },
    hasCheck: Boolean,
    subCategory: {
      type: Object as PropType<SubCategory>,
      required: true,
    }
  },
  setup(props, {emit}) {
    const isChecked = ref<boolean>(false)
    const { triggerNotification } = useNotification()

    const agree = () => {
      isChecked.value = true
      if (props.subCategory.id) {
        RepositoryFactory.get(CampRepository)
        .patchVisumHandleFeedback(props.subCategory.id)
        .then(() => {
          triggerNotification(t('engagement.feedback-ackknowledged'))
          rl()
        })
      }
    }

    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    const rl = () => {
      emit('rl', true)
    }
    
    return {
      ColorState,
      isChecked,
      agree,
      t
    }
  },
})
</script>
