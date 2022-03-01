<template>
  <div class="pb-3">

    <message class="p-2" :title="check.checkParent.label" :color="{ state: ColorState.GRAY }" />
    
    <div class="pb-3 mb-3">
      <custom-button class="mx-3 mb-3" @click="openLocationCreateSidebar()" :text="t('checks.location-check.add-location')" /> 
      <div class="md:border-b-2" v-for="(location) in check.value.locations" :key="location">
        <div @click="centerInChildComponent(subLocation)" class="mx-3 hover:text-green cursor-pointer" v-for="(subLocation) in location.locations" :key="subLocation">
          ({{location.name}}) {{ subLocation.name ? `${subLocation.name}, ` : '' }}{{ subLocation.address }}
        </div>
      </div>
    </div>

    <parent-leaflet-map ref="child" v-if="!isReloading" :parentLocations="check.value.locations" :check="check" :center="[check.value.centerLatitude, check.value.centerLongitude]" @edit="edit($event)" />

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
    const child = ref<any>(null)
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

    const centerInChildComponent = (loc: any) => {
      child.value.centerClickedLocation(loc.latitude,loc.longitude)
    }

    return {
      openLocationCreateSidebar,
      centerInChildComponent,
      createSidebar,
      actionSuccess,
      isReloading,
      ColorState,
      edit,
      child,
      t
    }
  },
})
</script>
