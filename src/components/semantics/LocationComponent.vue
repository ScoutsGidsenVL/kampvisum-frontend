<template>
  <div>
    <strong>{{check.checkParent.label}}</strong>
    <leaflet-map :locations="check.value.locations" :check="check" :center="[check.value.centerLatitude, check.value.centerLongitude]" />
    <custom-button @click="openLocationCreateSidebar()" class="mt-4" :text="check.value.locations.lenth > 0 ? 'wijzig locatie' : '+ voeg locatie toe'" />
    <location-create-sidebar :check="check" title="create" v-model:sideBarState="createSidebar" @actionSuccess="actionSuccess($event)" />
  </div>
</template>

<script lang="ts">
import LocationCreateSidebar from '../sideBars/LocationCreateSidebar.vue'
import LeafletMap from '@/components/cards/leaflet/leafletMap.vue'
import { CustomButton } from 'vue-3-component-library'
import { defineComponent, ref, PropType, toRefs } from 'vue'
import { Check } from '@/serializer/Check'


export default defineComponent({
  name: 'LocationComponent',
  components: {
    LeafletMap,
    CustomButton,
    LocationCreateSidebar
  },
  props: {
    check: {
      type: Object as PropType<Check>,
      required: true
    },
  },
  setup (props, context) {
    const { check } = toRefs(props)
    const createSidebar = ref<any>({state: 'hide'})

    const openLocationCreateSidebar = (): void => {
      createSidebar.value = {state: 'new'}
    }

    const actionSuccess = (action: {data: any, action: string}) => {
      if (action.action === 'PATCH') {
        console.log('PATCH: ', action.data)
        check.value.value = action.data
        console.log('AFTER PATCH: ', check.value)
        // patchLocation(action.data)
      }
    }

    return {
      openLocationCreateSidebar,
      createSidebar,
      actionSuccess,
      check
    }
  }
})
</script>
