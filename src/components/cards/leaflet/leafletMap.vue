<template>
  <div class="h-96 w-full">
    <l-map
      :options="{scrollWheelZoom: false}"
      ref="myMap"
      class="z-0 border-2 border-black"
      v-model="z"
      v-model:zoom="check.value.zoom"
      :center="center"
      @update:center="centerUpdated"
      @click="addOnClick($event)"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>

      <div v-for="(location, index) in locations" :key="location">
        <l-marker @update:latLng="patchLatLng($event, index)" :lat-lng="location.latLon">
          <l-icon>
            <svg width="30" height="30" style="margin-left: -14px;margin-top: -30px" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.875 9.41675C18.875 16.7084 9.5 22.9584 9.5 22.9584C9.5 22.9584 0.125 16.7084 0.125 9.41675C0.125 6.93034 1.11272 4.54578 2.87087 2.78762C4.62903 1.02947 7.0136 0.041748 9.5 0.041748C11.9864 0.041748 14.371 1.02947 16.1291 2.78762C17.8873 4.54578 18.875 6.93034 18.875 9.41675Z" fill="#7B8F1C"/>
            </svg>
          </l-icon>
          <l-popup class="w-60" >
            <custom-popup :location="location" :check="check" />
          </l-popup>
        </l-marker>
      </div>


      <div v-if="searchedLocation.latLon">
        <l-marker id="searchedMarker" :lat-lng="searchedLocation.latLon">
          <l-icon>
              <svg width="30" height="30" style="margin-left: -14px;margin-top: -30px" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.875 9.41675C18.875 16.7084 9.5 22.9584 9.5 22.9584C9.5 22.9584 0.125 16.7084 0.125 9.41675C0.125 6.93034 1.11272 4.54578 2.87087 2.78762C4.62903 1.02947 7.0136 0.041748 9.5 0.041748C11.9864 0.041748 14.371 1.02947 16.1291 2.78762C17.8873 4.54578 18.875 6.93034 18.875 9.41675Z" fill="#000"/>
              </svg>
            </l-icon>
          <l-popup class="w-56" >
            <div class="flex flex-col gap-4">
              
              <div>
                <label for="">Naam</label>
                <input type="text" id="name" name="name" v-model="searchedLocation.name" class="bg-lightGray p-2 min-w-0 w-100">
              </div>

              <div>
                {{searchedLocation.address}}
              </div>

              <div class="flex justify-between">
                <div @click="addLocationPoint()" class="flex gap-3 text-lightGreen cursor-pointer">
                  <div class="underline">Voeg toe</div>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                  </svg>
                </div>

                <div @click="cancelLocationPoint(index)" class="text-lightGreen underline cursor-pointer">
                  Annuleer
                </div>
              </div>
            </div>
          </l-popup>
        </l-marker>
      </div>

      <div v-for="(sL, index) in searchedLocations" :key="sL">
        <l-marker id="searchedMarker" :lat-lng="sL.latLon">
          <l-icon>
              <svg width="30" height="30" style="margin-left: -14px;margin-top: -30px" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.875 9.41675C18.875 16.7084 9.5 22.9584 9.5 22.9584C9.5 22.9584 0.125 16.7084 0.125 9.41675C0.125 6.93034 1.11272 4.54578 2.87087 2.78762C4.62903 1.02947 7.0136 0.041748 9.5 0.041748C11.9864 0.041748 14.371 1.02947 16.1291 2.78762C17.8873 4.54578 18.875 6.93034 18.875 9.41675Z" fill="#7B8F1C"/>
              </svg>
            </l-icon>
          <l-popup class="w-56" >
            <div class="flex flex-col">
              
              <div>
                <label for="">Naam</label>
                <input type="text" id="sLname" name="sLname" v-model="sL.name" class="bg-lightGray p-2 min-w-0 w-100">
              </div>


              <div v-if="check.checkParent.checkType.checkType === 'CampLocationCheck'" class="flex items-center gap-1">
                <input :disabled="sL.isMainLocation" @click="checkMainLocation(index)" class="cursor-pointer" :value="true" v-model="sL.isMainLocation" type="checkbox" id="name" name="name">
                <label @click="checkMainLocation(index)" class="cursor-pointer mt-2.5" for="name">Hoofdlocatie</label>
              </div>

              <div class="mt-2">
                {{ sL.address }}
              </div>

              <div class="text-red underline mt-3">
                <span class="cursor-pointer" @click="sL.isMainLocation ? displayWarning() : deleteLocationPoint(index)">Verwijder</span>
              </div>
            </div>
          </l-popup>
        </l-marker>
      </div>

      <l-control position="bottomleft" class="text-white" >
        <custom-button type="button" class="text-white" @click="doMapStuff()">
        <template v-slot:icon>
          <i-center />
        </template>
        </custom-button>
      </l-control>
    </l-map>
    <warning title="Hoofdlocatie" :isLoading="isDeletingVisum" :isDisplayed="isWarningDisplayed" text="Ben je zeker de hoofdlocatie te willen verwijderen?" leftButton="annuleren" rightButton="verwijder" @leftButtonClicked="hideWarning()" @rightButtonClicked="deleteMainLocationPoint()" />
  </div>
</template>

<script lang="ts">
import {
  LTileLayer,
  LMarker,
  LControl,
  LPopup,
  LIcon,
  LMap,
} from "@vue-leaflet/vue-leaflet";
import { CustomInput, CustomButton, InputTypes, Warning } from 'vue-3-component-library'
import { SearchedLocation } from '../../../serializer/SearchedLocation'
import { defineComponent, ref, PropType, toRefs } from 'vue'
import ICenter from "@/components/icons/ICenter.vue";
import { latLngBounds, latLng } from 'leaflet'
import CustomPopup from './CustomPopup.vue'
import { Check } from "@/serializer/Check";
import "leaflet/dist/leaflet.css";

export default defineComponent ({
  components: {
    CustomPopup,
    CustomInput,
    CustomButton,
    LTileLayer,
    LMarker,
    Warning,
    LControl,
    LPopup,
    LIcon,
    LMap,
    ICenter,
  },
  props: {
    center: Object as PropType<Array<number>>,
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
    const myMap = ref<any>(null)
    // THIS APPLICATION USES VUE3-LEAFLET BUT DOCUMENTATION IS ALMOST THE SAME AS VUE2-LEAFLET
    // https://vue2-leaflet.netlify.app/quickstart/
    const isWarningDisplayed = ref<Boolean>(false)

    const centerClickedLocation = (lat: any,lng: any) => {
      let map = myMap.value.leafletObject
      map.flyTo(latLng(lat, lng), 14)
    }

    const displayWarning = () => {
      isWarningDisplayed.value = true
    }

    const hideWarning = () => {
      isWarningDisplayed.value = false
    }
    const { searchedLocation, searchedLocations } = toRefs(props)

    const toPatch = ref<Array<Array<number>>>([[],[],[]])
    const iconWidthAndHeight = [25, 40]

    const patchLatLng = (latLng: any, id: number) => {
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

    const doMapStuff = () => {
      let locs: Array<any> = []
      props.searchedLocations.forEach((location: any) => {
          locs.push(location.latLon)
          if (props.searchedLocations.length === 1) {
            locs.push(location.latLon)
            //NEEDS BETTER SOLUTION, WHEN ONLY ONE LOCATION ITS BUGGY
              locs.push([location.latLon[0]*1.0001,location.latLon[1]*1.0001])
          }
      })

      if (props.searchedLocations.length === 0) {
        //SET COORDS TO BELGIUM IF THERE ARE NO LOCATIONS
        locs.push([50.500479,4.6954777])
        locs.push([50.500480,4.6954778])
      }

      const markerBounds = latLngBounds([])

      locs.forEach((loc: any) => {
        markerBounds.extend(latLng(loc[0],loc[1]))
      })

      let map = myMap.value.leafletObject
      
      if (map) {
        map.fitBounds([[markerBounds.getSouth(),markerBounds.getWest()],[markerBounds.getNorth(),markerBounds.getEast()]])
        // map.value.leafletObject.fitBounds([[10,10],[10,10]])
        
        if (props.searchedLocations.length === 0) {
            map.setZoom(7)
          } else {
            map.setZoom(map.getZoom() - 1);
          }
      }
    }

    setTimeout(() => {
      doMapStuff()
    }, 1)
    return {
      centerClickedLocation,
      deleteMainLocationPoint,
      cancelLocationPoint,
      deleteLocationPoint,
      iconWidthAndHeight,
      isWarningDisplayed,
      checkMainLocation,
      addLocationPoint,
      displayWarning,
      centerUpdated,
      patchLatLng,
      hideWarning,
      InputTypes,
      addOnClick,
      doMapStuff,
      toPatch,
      myMap
    }
  }
})
</script>

<style>
  .leaflet-popup-content-wrapper {
      border-radius: 0px !important;
  }
</style>