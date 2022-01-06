<template>
  <div>
      <span class="bg-red">{{concernType}}</span>

      <div v-if="concernType === 'Message'">
        <message title="Feedback DC" text="Materiaal niet verzekerd" :color="{state: ColorState.DANGER}" />
      </div>

      <div v-if="concernType === 'SimpleCheck'">
        <check-component :text="check.checkParent.label" />
      </div>

      <div v-if="concernType === 'DateCheck'">
          <date-field class="my-2" :key="section" :title="check.checkParent.label" />
      </div>

      <div v-if="concernType === 'LocationCheck'">
        <div class="pb-5">
          <location-component />
        </div>
      </div>

      <div v-if="concernType === 'ContactCheck'">
        <custom-input v-model="textField" textAreaWidth="w-100 w-100" :type="InputTypes.TEXT_AREA" :name="titleTextfield" :label="check.checkParent.label" />
      </div>

      <div v-if="concernType === 'FileUploadCheck'">
        <overview-files />
      </div>

      <div v-if="concernType === 'InputCheck'">
        <custom-input v-model="textField" textAreaWidth="w-100 w-100" :type="InputTypes.TEXT_AREA" :name="titleTextfield" :label="check.checkParent.label" />
      </div>

      <div v-if="concernType === 'InformationCheck'">
        <custom-input v-model="textField" textAreaWidth="w-100 w-100" :type="InputTypes.TEXT_AREA" :name="titleTextfield" :label="check.checkParent.label" />
      </div>

      <div v-if="concernType === 'LeadersCheck'">
        <leaders-overview />
      </div>

      <div v-if="concernType === 'FourageCheck'">
        <fourage-overview />
      </div>

      <div v-if="concernType === 'MembersCheck'">
        <members-overview />
      </div>
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

export enum ConcernType {
  INFORMATION_CHECK = 'InformationCheck',
  FILE_UPLOAD_CHECK = 'FileUploadCheck',
  LOCATION_CHECK = 'LocationCheck',
  CONTACT_CHECK = 'ContactCheck',
  SIMPLE_CHECK = 'SimpleCheck',
  INPUT_CHECK = 'InputCheck',
  DATE_CHECK = 'DateCheck',
}

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
    LeadersOverview
  },
  props: {
    concernType: String,
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
