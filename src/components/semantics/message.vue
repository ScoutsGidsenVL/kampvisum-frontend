<template>
  <div class="border-l-8 flex items-center justify-between px-3" :class="{'border-red bg-lightRed': color.state === ColorState.DANGER, 'border-lightGreen bg-lighterGreen': color.state === ColorState.SUCCES, 'border-orange bg-lightOrange': color.state === ColorState.WARNING }">
    <div class="py-2">
      <div>
        <h1 class="text-lg m-0" :class="{'text-red': color.state === ColorState.DANGER, 'text-lightGreen': color.state === ColorState.SUCCES, 'text-orange': color.state === ColorState.WARNING }">{{title}}</h1>
      </div>
      <div>
        <p>
          {{text}}
        </p>
      </div>
    </div>
    <div v-if="hasCheck">
      <check :isSimpleCheck="true" text="Ok" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Check from '@/components/cards/checks/check.vue'

export enum ColorState {
  SUCCES = 'SUCCES',
  DANGER = 'DANGER',
  WARNING = 'WARNING',
}

export type Color = {
  state: ColorState
}

export default defineComponent({
  name: 'Message',
  components: {
    'check': Check
  },
  props: {
    title: {
      type: String,
      required: true,
      default: 'default title'
    },
    text: String,
    color: {
      type: Object as PropType<Color>,
      required: false,
      default: () => { return {state: ColorState.SUCCES} }
    },
    hasCheck: Boolean
  },
  setup () {
    return {
      ColorState
    }
  }
})
</script>
