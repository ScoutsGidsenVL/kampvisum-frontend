<template>
  <!-- <div v-if="checkType === 'Message'">
    <message title="Feedback DC" text="Materiaal niet verzekerd" :color="{ state: ColorState.DANGER }" />
  </div> -->
  <div :id="check.id">
    <div class="px-3" v-if="checkType === CheckTypes.SimpleCheck">
      <!-- {{check}} -->
      <check-component :check="check" />
    </div>

    <div class="px-3" v-if="checkType === CheckTypes.DurationCheck">
      <date-field class="my-2" :key="section" :check="check" />
    </div>

    <div class="px-3 mt-3" v-if="checkType === CheckTypes.CommentCheck">
      <comment-check :check="check" />
    </div>

    <div class="bg-gray my-3 border-l-4 border-lightGreen" v-if="checkType === CheckTypes.CampLocationCheck">
      <location-component :check="check" @rl="rl($event)" />
    </div>

    <div class="bg-gray my-3 border-l-4 border-lightGreen" v-if="checkType === CheckTypes.LocationCheck">
      <location-component :check="check" @rl="rl($event)" />
    </div>

    <div class="bg-gray mt-3 border-l-4 border-black" v-if="checkType === CheckTypes.FileUploadCheck">
      <overview-files :visum="visum" :check="check" @rl="rl($event)" />
    </div>

    <div class="bg-gray my-3 border-l-4 border-lightGreen" v-if="checkType === CheckTypes.MemberCheck">
      <participant-overview :visum="visum" :check="check" @rl="rl($event)" />
    </div>

    <div class="bg-gray my-3 border-l-4 border-lightGreen" v-if="checkType === CheckTypes.ParticipantCheck">
      <participant-overview :visum="visum" :check="check" @rl="rl($event)" />
    </div>

    <div class="px-3 mt-4" v-if="checkType === CheckTypes.NumberCheck">
      <number-check :check="check" @rl="rl($event)" />
    </div>
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
import NumberCheck from '../semantics/NumberCheck.vue'

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
    NumberCheck,
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
      required: true,
    },
  },
  setup(props, { emit }) {
    const rl = () => {
      emit('rl', true)
    }

    return {
      CheckTypes,
      ColorState,
      InputTypes,
      rl,
    }
  },
})
</script>
