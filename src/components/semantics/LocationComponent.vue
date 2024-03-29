<template>
  <div class="pb-3">

    <div class="flex gap-1 items-center">
      <message class="p-2" :title="check.checkParent.label" :color="{ state: ColorState.GRAY }" />
      <div v-if="check.checkParent.explanation">
        <i-info :info="check.checkParent.explanation" />
      </div>
    </div>

    <div class="pb-3 mb-3">
      <custom-button class="mx-3 mb-3" @click="openLocationCreateSidebar()" :text="t('checks.location-check.add-location')" /> 
      <div v-for="(location) in check.value.locations" :key="location">
        <div @click="centerInChildComponent(subLocation)" class="flex justify-between md:border-b-2 hover:text-green cursor-pointer bg-white" v-for="(subLocation) in location.locations" :key="subLocation">
          <div class="p-2.5 flex items-center gap-3">
            <i-marker /> {{location.name}} - {{ subLocation.name ? `${subLocation.name}, ` : '' }}{{ `${subLocation.street} ${subLocation.houseNumber}, ${subLocation.postalcode} ${subLocation.township}, ${getTranslationCountry(subLocation.country)}` }}
          </div>
          <div v-if="location.startDate && location.endDate" class="p-2.5 items-center">
            {{ dateFromLocalisedString(location.startDate) }} - {{ dateFromLocalisedString(location.endDate) }}
          </div>
        </div>
      </div>
    </div>

    <parent-leaflet-map ref="child" v-if="!isReloading" :parentLocations="check.value.locations" :check="check" @rl="rl($event)" @edit="edit($event)" />
    
    <location-create-sidebar
      v-if="createSidebar.state === 'new' || createSidebar.state === 'edit' || createSidebar.state === 'search'"
      :parentLocations="check.value.locations"
      :check="check"
      :title="createSidebar.state === 'new' ? t('checks.location-check.create') : createSidebar.state === 'edit' ? t('checks.location-check.edit') : createSidebar.state === 'search' ? t('checks.location-check.search') : '' "
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
import Message, { ColorState } from './message.vue'
import { Check } from '@/serializer/Check'
import IMarker from '../icons/IMarker.vue'
import IInfo from '../icons/IInfo.vue'
import { useI18n } from 'vue-i18n'
import { usePlaceAutocompleteHelper } from '@/helpers/placeAutocompleteHelper'
import { useDateHelper } from '@/helpers/dateHelper'

export default defineComponent({
  name: 'LocationComponent',
  components: {
    LocationCreateSidebar,
    ParentLeafletMap,
    CustomButton,
    LeafletMap,
    Message,
    IMarker,
    IInfo
  },
  props: {
    check: {
      type: Object as PropType<Check>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { getTranslationCountry } = usePlaceAutocompleteHelper()
    const { dateFromLocalisedString } = useDateHelper()
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

    const rl = () => {
        emit('rl', true)
    }

    const reloadMapComponent = () => {
      // isReloading.value = true
      // setTimeout(() => {
      //   isReloading.value = false
      // }, 1)
      // console.log('reload component...')
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
      getTranslationCountry,
      openLocationCreateSidebar,
      centerInChildComponent,
      createSidebar,
      actionSuccess,
      isReloading,
      ColorState,
      edit,
      child,
      dateFromLocalisedString,
      t,
      rl
    }
  },
})
</script>
