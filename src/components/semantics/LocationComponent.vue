<template>
  <div class="pb-3">

    <message class="p-2" :title="check.checkParent.label" :color="{ state: ColorState.GRAY }" />
    
    <div class="px-3 pb-3">
      <custom-button @click="openLocationCreateSidebar()" :text="t('checks.location-check.add-location')" /> 
      <div class="mt-3" v-for="(location) in check.value.locations" :key="location">
        <div class="font-bold">
          {{ location.name }}
        </div>
        <div class="ml-2" v-for="(subLocation) in location.locations" :key="subLocation">
          • {{ subLocation.name ? `${subLocation.name}, ` : '' }}{{ subLocation.address }}
        </div>
      </div>
    </div>

    <parent-leaflet-map v-if="!isReloading" :parentLocations="check.value.locations" :check="check" :center="[check.value.centerLatitude, check.value.centerLongitude]" @edit="edit($event)" />

    <location-create-sidebar
      v-if="createSidebar.state === 'new' || createSidebar.state === 'edit'"
      :parentLocations="check.value.locations"
      :check="check"
      :title="t('checks.location-check.create')"
      v-model:sideBarState="createSidebar"
      @actionSuccess="actionSuccess($event)"
    />
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
import Message, { ColorState } from './message.vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'LocationComponent',
  components: {
    Message,
    LeafletMap,
    CustomButton,
    LocationCreateSidebar,
    ParentLeafletMap,
  },
  props: {
    check: {
      type: Object as PropType<Check>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })
    
    const isReloading = ref<boolean>(false)
    const createSidebar = ref<any>({ state: 'hide' })
    const { sidebar } = useInfoBarHelper()

    const openLocationCreateSidebar = (): void => {
      document.body.classList.add('overflow-hidden')
      createSidebar.value = { state: 'new' }
    }

    const actionSuccess = (action: { data: any; action: string }) => {
      if (action.action === 'PATCH') {
        reloadMapComponent()
        emit('rl', true)
      }
      if (action.action === 'CLOSE') {
        reloadMapComponent()
      }
    }

    const reloadMapComponent = () => {
      isReloading.value = true
      setTimeout(() => {
        isReloading.value = false
      }, 1)
    }

    watch(
      () => sidebar.value.state,
      () => {
        reloadMapComponent()
      }
    )

    const edit = (parentLocation: any) => {
      createSidebar.value = { state: 'edit', entity: parentLocation }
    }

    return {
      openLocationCreateSidebar,
      createSidebar,
      actionSuccess,
      isReloading,
      ColorState,
      edit,
      t
    }
  },
})
</script>
