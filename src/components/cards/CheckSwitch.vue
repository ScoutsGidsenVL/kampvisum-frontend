<template>
      <div v-if="checkType === 'Message'">
        <message title="Feedback DC" text="Materiaal niet verzekerd" :color="{ state: ColorState.DANGER }" />
      </div>

      <div v-if="checkType === 'SimpleCheck'">
        <check-component :check="check" />
      </div>

      <div v-if="checkType === 'DurationCheck'">
          <date-field class="my-2" :key="section" :check="check" />
      </div>

      <div v-if="checkType === 'CommentCheck'">
        <comment-check :check="check" />
      </div>

      <div v-if="checkType === 'CampLocationCheck'">
        <div class="pb-5">
          <location-component :check="check" />
        </div>
      </div>

      <div v-if="checkType === 'LocationCheck'">
        <div class="pb-5">
          <location-component :check="check" />
        </div>
      </div>

      <div v-if="checkType === 'FileUploadCheck'">
        <overview-files :check="check" />
      </div>

      <div class="my-4" v-if="checkType === 'MemberCheck'">
        <members-overview @rl="rl($event)" :visum="visum" :check="check" />
      </div>

      <div class="my-4" v-if="checkType === 'ParticipantCheck'">
        <fourage-overview :visum="visum" :check="check" />
      </div>
</template>

<script lang="ts">
import LocationComponent from '../semantics/LocationComponent.vue'
import { InputTypes, CustomInput } from 'vue-3-component-library'
import OverviewFiles from '@/components/upload/overviewFiles.vue'
import Message, { ColorState } from '../semantics/message.vue'
import MembersOverview from '../semantics/MembersOverview.vue'
import FourageOverview from '../semantics/FourageOverview.vue'
import DateField from '@/components/semantics/DateField.vue'
import CommentCheck from '../semantics/CommentCheck.vue'
import { defineComponent, PropType } from 'vue'
import CheckComponent from './checks/check.vue'
import { Check } from '../../serializer/Check'
import VSwitch from '@lmiller1990/v-switch'
import { Camp } from '@/serializer/Camp'
import { Visum } from '@/serializer/Visum'

export default defineComponent({
  name: 'ConcernSwitch',
  components: {
    LocationComponent,
    MembersOverview,
    FourageOverview,
    CheckComponent,
    OverviewFiles,
    CustomInput,
    CommentCheck,
    InputTypes,
    DateField,
    VSwitch,
    Message,
  },
  props: {
    checkType: String,
    visum: {
      type: Object as PropType<Visum>,
      required: true,
    },
    camp: {
      type: Object as PropType<Camp>,
      required: true,
    },
    check: {
      type: Object as PropType<Check>,
      required: true
    }
  },
  setup (props, { emit }) {

    const rl = () => {
      emit('rl', true)
    }

    return {
      ColorState,
      InputTypes,
      rl
    }
  }
})
</script>
