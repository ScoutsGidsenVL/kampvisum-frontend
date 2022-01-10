<template>
  <div>
      <span class="bg-red">{{checkType}}</span>

      <div v-if="checkType === 'Message'">
        <message title="Feedback DC" text="Materiaal niet verzekerd" :color="{state: ColorState.DANGER}" />
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

      <div v-if="checkType === 'LocationCheck'">
        <div class="pb-5">
          <location-component />
        </div>
      </div>

      <div v-if="checkType === 'FileUploadCheck'">
        <overview-files />
      </div>

      <div v-if="checkType === 'LeadersCheck'">
        <leaders-overview />
      </div>

      <div v-if="checkType === 'FourageCheck'">
        <fourage-overview />
      </div>

      <div v-if="checkType === 'MembersCheck'">
        <members-overview />
      </div>

      <!-- <div v-if="checkType === 'InformationCheck'">
        <custom-input v-model="textField" textAreaWidth="w-100 w-100" :type="InputTypes.TEXT_AREA" :name="titleTextfield" :label="check.checkParent.label" />
      </div> -->

      <!-- <div v-if="checkType === 'ContactCheck'">
        <custom-input v-model="textField" textAreaWidth="w-100 w-100" :type="InputTypes.TEXT_AREA" :name="titleTextfield" :label="check.checkParent.label" />
      </div> -->
  </div>
</template>

<script lang="ts">
import LocationComponent from '../semantics/LocationComponent.vue'
import { InputTypes, CustomInput } from 'vue-3-component-library'
import OverviewFiles from '@/components/upload/overviewFiles.vue'
import Message, { ColorState } from '../semantics/message.vue'
import MembersOverview from '../semantics/MembersOverview.vue'
import FourageOverview from '../semantics/FourageOverview.vue'
import LeadersOverview from '../semantics/LeadersOverview.vue'
import DateField from '@/components/semantics/DateField.vue'
import { defineComponent, PropType, ref } from 'vue'
import VSwitch from '@lmiller1990/v-switch'
import { Camp } from '@/serializer/Camp'
import CheckComponent from './checks/check.vue'
import { Check } from '../../serializer/Check'
import CommentCheck from '../semantics/CommentCheck.vue'

export default defineComponent({
  name: 'ConcernSwitch',
  components: {
    CheckComponent,
    VSwitch,
    Message,
    DateField,
    InputTypes,
    CustomInput,
    OverviewFiles,
    LocationComponent,
    MembersOverview,
    FourageOverview,
    LeadersOverview,
    CommentCheck
  },
  props: {
    checkType: String,
    camp: {
      type: Object as PropType<Camp>,
      required: true,
    },
    check: {
      type: Object as PropType<Check>,
      required: true
    }
  },
  setup () {
    return {
      ColorState,
      InputTypes,
    }
  }
})
</script>
