<template>
  <div>
    <v-switch :case="concernType">
      <template #Message>
        <message title="Feedback DC" text="Materiaal niet verzekerd" :color="{state: ColorState.DANGER}" />
      </template>

      <template #SimpleCheck>
        <check text="totemisatie" />
        <check text="nachtspel" />
      </template>

      <template #DateCheck>
        DateCheck component
      </template>

      <template #LocationCheck>
        LocationCheck component
      </template>

      <template #ContactCheck>
        ContactCheck component
      </template>

      <template #FileUploadCheck>
        <overview-files />
      </template>

      <template #InputCheck>
        <custom-input v-model="textField" textAreaWidth="w-100 w-100" :type="InputTypes.TEXT_AREA" :name="titleTextfield" :label="'Opmerkingen'" />
      </template>

      <template #InformationCheck>
        InformationCheck component
      </template>
    </v-switch>
  </div>
</template>

<script lang="ts">
import Check from './checks/check.vue'
import VSwitch from '@lmiller1990/v-switch'
import { defineComponent, PropType, ref } from 'vue'
import Message, { ColorState } from '../semantics/message.vue'
import { InputTypes, CustomInput } from 'vue-3-component-library'

export enum ConcernType {
  SIMPLE_CHECK = 'SimpleCheck',
  DATE_CHECK = 'DateCheck',
  LOCATION_CHECK = 'LocationCheck',
  CONTACT_CHECK = 'ContactCheck',
  FILE_UPLOAD_CHECK = 'FileUploadCheck',
  INPUT_CHECK = 'InputCheck',
  INFORMATION_CHECK = 'InformationCheck',
}

export default defineComponent({
  name: 'ConcernSwitch',
  components: {
    Check,
    VSwitch,
    Message,
    InputTypes,
    CustomInput,
  },
  props: {
    concernType: Object as PropType<ConcernType>,
  },
  setup () {
    return {
      ColorState,
      InputTypes,
    }
  }
})
</script>
