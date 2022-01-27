<template>
  <div>
    <strong>{{check.checkParent.label}}</strong>
    <leaflet-map v-if="!isReloading" :locations="check.value.locations" :check="check" :center="[check.value.centerLatitude, check.value.centerLongitude]" />
    <custom-button @click="openLocationCreateSidebar()" class="mt-4" :text="check.value.locations.length > 0 ? 'wijzig locatie' : '+ voeg locatie toe'" />
    <location-create-sidebar v-if="createSidebar.state === 'new'" :check="check" title="create" v-model:sideBarState="createSidebar" @actionSuccess="actionSuccess($event)" />
  </div>
</template>

<script lang="ts">
import LocationCreateSidebar from '../sideBars/LocationCreateSidebar.vue'
import { defineComponent, ref, PropType, toRefs, watch } from 'vue'
import LeafletMap from '@/components/cards/leaflet/leafletMap.vue'
import { useInfoBarHelper } from '@/helpers/infoBarHelper'
import { CustomButton } from 'vue-3-component-library'
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
  setup (props, { emit }) {
    const isReloading = ref<boolean>(false)
    const { check } = toRefs(props)
    const createSidebar = ref<any>({state: 'hide'})
    const { sidebar } = useInfoBarHelper()

    const openLocationCreateSidebar = (): void => {
      createSidebar.value = {state: 'new'}
    }

    const actionSuccess = (action: {data: any, action: string}) => {
      if (action.action === 'PATCH') {
        check.value.value = action.data
        reloadMapComponent()
        emit('rl', true)
      }
    }

    const reloadMapComponent = () => {
      isReloading.value = true
      setTimeout(() => {
       isReloading.value = false
      }, 50)
    }

    watch(
      () => sidebar.value.state,
      () => {
        reloadMapComponent()
      }
    )

    return {
      openLocationCreateSidebar,
      createSidebar,
      actionSuccess,
      isReloading,
      check,
    }
  }
})
</script>
