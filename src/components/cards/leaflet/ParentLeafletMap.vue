<template>
  <div class="h-96 w-full">
      <l-map
        class="z-0 border-2 border-black"
        v-model:zoom="check.value[0].zoom"
        :center="center"
        @update:center="centerUpdated"
        @click="addOnClick($event)"
      >
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></l-tile-layer>

        <div v-for="(parentLocation) in parentLocations" :key="parentLocation">
          <div v-for="(parentSubLocation, index) in parentLocation.locations" :key="parentSubLocation">
            <l-marker @update:latLng="patchLatLng($event, index)" :lat-lng="parentSubLocation.latLon">
              <l-icon>
                <svg width="30" height="30" style="margin-left: -14px;margin-top: -30px" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.875 9.41675C18.875 16.7084 9.5 22.9584 9.5 22.9584C9.5 22.9584 0.125 16.7084 0.125 9.41675C0.125 6.93034 1.11272 4.54578 2.87087 2.78762C4.62903 1.02947 7.0136 0.041748 9.5 0.041748C11.9864 0.041748 14.371 1.02947 16.1291 2.78762C17.8873 4.54578 18.875 6.93034 18.875 9.41675Z" fill="#7B8F1C"/>
                </svg>
              </l-icon>
              <l-popup class="w-60" >
                <custom-popup :location="parentSubLocation" :parentLocation="parentLocation" :check="check" />
              </l-popup>
            </l-marker>
          </div>
        </div>
      </l-map>
    <warning title="Hoofdlocatie" :isLoading="isDeletingVisum" :isDisplayed="isWarningDisplayed" text="Ben je zeker de hoofdlocatie te willen verwijderen?" leftButton="annuleren" rightButton="verwijder" @leftButtonClicked="hideWarning()" @rightButtonClicked="deleteMainLocationPoint()" />
  </div>
</template>

<script lang="ts">
import {
  LMap,
  LTileLayer,
  LMarker,
  LIcon,
  LPopup,
} from "@vue-leaflet/vue-leaflet";
import { SearchedLocation } from '../../../serializer/SearchedLocation'
import { CustomInput, InputTypes, Warning } from 'vue-3-component-library'
import { defineComponent, ref, PropType, toRefs } from 'vue'
import { latLng } from '../../../interfaces/latLng'
import CustomPopup from './CustomPopup.vue'
import { Check } from "@/serializer/Check";
import "leaflet/dist/leaflet.css";

export default defineComponent ({
  components: {
    CustomPopup,
    LTileLayer,
    CustomInput,
    LMarker,
    LPopup,
    LIcon,
    LMap,
    Warning
  },
  props: {
    center: Object as PropType<Array<number>>,
    parentLocations: {
      type: Object as PropType<Array<any>>,
      required: false,
      default: () => { return [] }
    },
    locations: {
      type: Object as PropType<Array<SearchedLocation>>,
      required: false,
      default: () => { return [] }
    },
    isCreating: Boolean,
    searchedLocation: {
      type: Object as PropType<SearchedLocation>,
      default: () => { return {} }
    },
    check: {
      type: Object as PropType<Check>,
      required: true,
    },
    searchedLocations: {
      type: Object as PropType<Array<SearchedLocation>>,
      default: () => { return {} }
    }
  },
  setup (props, { emit }) {
    // THIS APPLICATION USES VUE3-LEAFLET BUT DOCUMENTATION IS ALMOST THE SAME AS VUE2-LEAFLET
    // https://vue2-leaflet.netlify.app/quickstart/
    const isWarningDisplayed = ref<Boolean>(false)

    const displayWarning = () => {
      isWarningDisplayed.value = true
    }

    const hideWarning = () => {
      isWarningDisplayed.value = false
    }
    const { searchedLocation, searchedLocations } = toRefs(props)

    const toPatch = ref<Array<Array<number>>>([[],[],[]])
    const iconWidthAndHeight = [25, 40]

    const patchLatLng = (latLng: latLng, id: number) => {
      toPatch.value[id] = [latLng.lat, latLng.lng]
      //PATCH NEW VALUES TO ENDPOINT...
    }

    const addLocationPoint = () => {
      emit('addLocationPoint', searchedLocation.value)
    }

    const cancelLocationPoint = () => {
      emit('cancelLocationPoint', true)
    }

    const deleteLocationPoint = (index: any) => {
      emit('deleteLocationPoint', index)
    }

    const deleteMainLocationPoint = () => {
      searchedLocations.value.forEach((x: SearchedLocation, index: any) => {
        if (x.isMainLocation) {
          emit('deleteLocationPoint', index)
          hideWarning()
        }
      })
    }

    const checkMainLocation = (i: number) => {
      searchedLocations.value.forEach((s, index) => {
        if (index !== i) {
          s.isMainLocation = false
        }
      })
    }

    const addOnClick = (p: any) => {
      if (p.latlng) {
        emit('addOnClick', p.latlng)
      }
    }

    const centerUpdated = (center: any) => {
      emit('update:center', [center.lat,center.lng])
    }
    return {
      cancelLocationPoint,
      deleteLocationPoint,
      iconWidthAndHeight,
      checkMainLocation,
      addLocationPoint,
      centerUpdated,
      patchLatLng,
      InputTypes,
      addOnClick,
      toPatch,
      displayWarning,
      hideWarning,
      isWarningDisplayed,
      deleteMainLocationPoint
    }
  }
})
</script>

<style>
  .leaflet-popup-content-wrapper {
      border-radius: 0px !important;
  }
</style>