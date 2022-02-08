<template>
  <!-- <div v-if="checkType === 'Message'">
    <message title="Feedback DC" text="Materiaal niet verzekerd" :color="{ state: ColorState.DANGER }" />
  </div> -->

  <div v-if="checkType === CheckTypes.SimpleCheck">
    <!-- {{check}} -->
    <check-component :check="check" />

  </div>

  <div v-if="checkType === CheckTypes.DurationCheck">
      <date-field class="my-2" :key="section" :check="check" />
  </div>

  <div v-if="checkType === CheckTypes.CommentCheck">
    <comment-check :check="check" />
  </div>

  <div v-if="checkType === CheckTypes.CampLocationCheck">
    <div class="pb-5">
      <location-component :check="check" @rl="rl($event)" />
    </div>
  </div>

  <div v-if="checkType === CheckTypes.LocationCheck">
    <div class="pb-5">
      <location-component :check="check" @rl="rl($event)" />
    </div>
  </div>

  <div v-if="checkType === CheckTypes.FileUploadCheck">
    <overview-files :visum="visum" :check="check" @rl="rl($event)" />
  </div>

  <div class="my-4" v-if="checkType === CheckTypes.MemberCheck">
    <participant-overview :visum="visum" :check="check" @rl="rl($event)" />
  </div>

  <div class="my-4" v-if="checkType === CheckTypes.ParticipantCheck">
    <participant-overview :visum="visum" :check="check" @rl="rl($event)" />
  </div>
</template>

<script lang="ts">
import ParticipantOverview from '../semantics/ParticipantOverview.vue'
import LocationComponent from '../semantics/LocationComponent.vue'
import { InputTypes, CustomInput } from 'vue-3-component-library'
import OverviewFiles from '@/components/upload/overviewFiles.vue'
import Message, { ColorState } from '../semantics/message.vue'
import DateField from '@/components/semantics/DateField.vue'
import { Check, CheckTypes } from '../../serializer/Check'
import CommentCheck from '../semantics/CommentCheck.vue'
import { defineComponent, PropType } from 'vue'
import CheckComponent from './checks/check.vue'
import VSwitch from '@lmiller1990/v-switch'
import { Visum } from '@/serializer/Visum'
import { Camp } from '@/serializer/Camp'

export default defineComponent({
  name: 'ConcernSwitch',
  components: {
    ParticipantOverview,
    LocationComponent,
    CheckComponent,
    OverviewFiles,
    CommentCheck,
    CustomInput,
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
      CheckTypes,
      ColorState,
      InputTypes,
      rl
    }
  }
})
</script>
