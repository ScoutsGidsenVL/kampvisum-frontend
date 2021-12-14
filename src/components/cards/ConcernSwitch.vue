<template>
  <div>
    <v-switch :case="concernType">
      

      <template #Message>
        <div class="pb-5">
          <leaflet-map />
        </div>
        <message title="Feedback DC" text="Materiaal niet verzekerd" :color="{state: ColorState.DANGER}" />
      </template>

      <template #SimpleCheck>
        <check text="totemisatie" />
        <check text="nachtspel" />
      </template>

      <template #DateCheck>
          <date-field class="my-2" v-for="(section) in camp.sections" :key="section" :title="section.name" />
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
import LeafletMap from '@/components/cards/leaflet/leafletMap.vue'
import { InputTypes, CustomInput } from 'vue-3-component-library'
import OverviewFiles from '@/components/upload/overviewFiles.vue'
import Message, { ColorState } from '../semantics/message.vue'
import DateField from '@/components/semantics/DateField.vue'
import { defineComponent, PropType, ref } from 'vue'
import VSwitch from '@lmiller1990/v-switch'
import { Camp } from '@/serializer/Camp'
import Check from './checks/check.vue'

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
    Check,
    VSwitch,
    Message,
    DateField,
    LeafletMap,
    InputTypes,
    CustomInput,
    OverviewFiles
  },
  props: {
    concernType: String,
    camp: {
      type: Object as PropType<Camp>,
      required: true,
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
