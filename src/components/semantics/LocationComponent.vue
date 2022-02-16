<template>
  <div>
    <strong>{{check.checkParent.label}}</strong>
    <parent-leaflet-map 
      v-if="!isReloading" 
      :parentLocations="check.value.locations" 
      :check="check" 
      :center="[check.value.centerLatitude, check.value.centerLongitude]"
      @edit="edit($event)"  
    />
    <custom-button @click="openLocationCreateSidebar()" class="mt-4" :text="'+ voeg locatie toe'" />
    <location-create-sidebar v-if="createSidebar.state === 'new' || createSidebar.state === 'edit'" :parentLocations="check.value.locations" :check="check" title="create" v-model:sideBarState="createSidebar" @actionSuccess="actionSuccess($event)" />
  </div>
</template>

<script lang="ts">
import LocationCreateSidebar from '../sideBars/LocationCreateSidebar.vue'
import ParentLeafletMap from '../cards/leaflet/ParentLeafletMap.vue'
import LeafletMap from '@/components/cards/leaflet/leafletMap.vue'
import { defineComponent, ref, PropType, watch } from 'vue'
import { useInfoBarHelper } from '@/helpers/infoBarHelper'
import { CustomButton } from 'vue-3-component-library'
import { Check } from '@/serializer/Check'

export default defineComponent({
  name: 'LocationComponent',
  components: {
    LeafletMap,
    CustomButton,
    LocationCreateSidebar,
    ParentLeafletMap
  },
  props: {
    check: {
      type: Object as PropType<Check>,
      required: true
    },
  },
  setup (props, { emit }) {
    const isReloading = ref<boolean>(false)
    const createSidebar = ref<any>({state: 'hide'})
    const { sidebar } = useInfoBarHelper()

    const openLocationCreateSidebar = (): void => {
      document.body.classList.add('overflow-hidden')
      createSidebar.value = {state: 'new'}
    }

    const actionSuccess = (action: {data: any, action: string}) => {
      if (action.action === 'PATCH') {
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

    const edit = (parentLocation: any) => {
      createSidebar.value = { state: 'edit', entity: parentLocation  }
    }

    return {
      openLocationCreateSidebar,
      createSidebar,
      actionSuccess,
      isReloading,
      edit
    }
  }
})
</script>
