<template>
  <div class="h-96 w-full">
    <l-map ref="myMap" class="z-0" v-model:zoom="check.value.zoom" :center="center" @update:center="centerUpdated" @click="addOnClick($event)">
      <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>

      <div v-for="parentLocation in parentLocations" :key="parentLocation">
        <div v-for="(parentSubLocation, index) in parentLocation.locations" :key="parentSubLocation">
          <l-marker @update:latLng="patchLatLng($event, index)" :lat-lng="parentSubLocation.latLon">
            <l-icon>
              <svg width="30" height="30" style="margin-left: -14px; margin-top: -30px" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18.875 9.41675C18.875 16.7084 9.5 22.9584 9.5 22.9584C9.5 22.9584 0.125 16.7084 0.125 9.41675C0.125 6.93034 1.11272 4.54578 2.87087 2.78762C4.62903 1.02947 7.0136 0.041748 9.5 0.041748C11.9864 0.041748 14.371 1.02947 16.1291 2.78762C17.8873 4.54578 18.875 6.93034 18.875 9.41675Z"
                  fill="#7B8F1C"
                />
              </svg>
            </l-icon>
            <l-popup class="w-60">
              <custom-popup :location="parentSubLocation" :parentLocation="parentLocation" :check="check" @edit="edit($event)" />
            </l-popup>
          </l-marker>
        </div>
      </div>
      <l-control position="bottomleft" class="text-white" >
        <slot name="create"></slot>
      </l-control>
      <l-control position="bottomleft" class="text-white" >
        <custom-button class="text-white" @click="doMapStuff()">
        <template v-slot:icon>
          <i-center />
        </template>
        </custom-button>
      </l-control>
    </l-map>
    <warning
      :title="t('checks.location-check.delete-warning-title')"
      :isLoading="isDeletingVisum"
      :isDisplayed="isWarningDisplayed"
      :text="t('checks.location-check.delete-warning')"
      :leftButton="t('checks.location-check.delete-warning-button-left')"
      :rightButton="t('checks.location-check.delete-warning-button-right')"
      @leftButtonClicked="hideWarning()"
      @rightButtonClicked="deleteMainLocationPoint()"
    />
  </div>
</template>

<script lang="ts">
import { LMap, LTileLayer, LMarker, LIcon, LPopup, LControl } from '@vue-leaflet/vue-leaflet'
import { CustomInput, CustomButton, InputTypes, Warning } from 'vue-3-component-library'
import { SearchedLocation } from '../../../serializer/SearchedLocation'
import { defineComponent, ref, PropType, toRefs } from 'vue'
import ICenter from '@/components/icons/ICenter.vue'
import { latLngBounds, latLng } from 'leaflet'
import CustomPopup from './CustomPopup.vue'
import { Check } from '@/serializer/Check'
import { useI18n } from 'vue-i18n'
import 'leaflet/dist/leaflet.css'

export default defineComponent({
  components: {
    CustomPopup,
    LTileLayer,
    CustomInput,
    LControl,
    LMarker,
    LPopup,
    LIcon,
    LMap,
    Warning,
    CustomButton,
    ICenter
  },
  props: {
    center: Object as PropType<Array<number>>,
    parentLocations: {
      type: Object as PropType<Array<any>>,
      required: false,
      default: () => {
        return []
      },
    },
    locations: {
      type: Object as PropType<Array<SearchedLocation>>,
      required: false,
      default: () => {
        return []
      },
    },
    isCreating: Boolean,
    searchedLocation: {
      type: Object as PropType<SearchedLocation>,
      default: () => {
        return {}
      },
    },
    check: {
      type: Object as PropType<Check>,
      required: true,
    },
    searchedLocations: {
      type: Object as PropType<Array<SearchedLocation>>,
      default: () => {
        return {}
      },
    },
  },
  setup(props, { emit }) {
    const myMap = ref<any>(null)
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })
    // THIS APPLICATION USES VUE3-LEAFLET BUT DOCUMENTATION IS ALMOST THE SAME AS VUE2-LEAFLET
    // https://vue2-leaflet.netlify.app/quickstart/
    const isWarningDisplayed = ref<Boolean>(false)
    const displayWarning = () => {
      isWarningDisplayed.value = true
    }

    const doMapStuff = () => {
      let map = myMap.value.leafletObject
      let locs: Array<any> = []

      props.parentLocations.forEach((parentLocation: any) => {
        parentLocation.locations.forEach((location: any) => {
          locs.push(location.latLon)
          //NEEDS BETTER SOLUTION, WHEN ONLY ONE LOCATION ITS BUGGY
          if (props.parentLocations.length === 1 && parentLocation.locations.length === 1) {
            locs.push([location.latLon[0]*1.0001,location.latLon[1]*1.0001])
          }
        })
      })

      if (props.parentLocations.length === 0) {
        //SET COORDS TO BELGIUM IF THERE ARE NO LOCATIONS
        locs.push([50.500479,4.6954777])
        locs.push([50.500480,4.6954778])
      }

      const markerBounds = latLngBounds([])

      locs.forEach((loc: any) => {
        markerBounds.extend(latLng(loc[0],loc[1]))
      })
      
      if (map) {
        myMap.value.leafletObject.fitBounds([[markerBounds.getSouth(),markerBounds.getWest()],[markerBounds.getNorth(),markerBounds.getEast()]])
        setTimeout(function() {
          if (props.parentLocations.length === 0) {
            map.setZoom(7)
          } else {
            map.setZoom(map.getZoom() - 1);
          }
        }, 1);
      }
    }

    const hideWarning = () => {
      isWarningDisplayed.value = false
    }
    const { searchedLocation, searchedLocations } = toRefs(props)

    const toPatch = ref<Array<Array<number>>>([[], [], []])
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
      emit('update:center', [center.lat, center.lng])
    }

    const edit = (parentLocation: any) => {
      emit('edit', parentLocation)
    }

    setTimeout(() => {
      doMapStuff()
    }, 20)
    return {
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
      toPatch,
      edit,
      t,
      doMapStuff,
      myMap
    }
  },
})
</script>

<style>
.leaflet-popup-content-wrapper {
  border-radius: 0px !important;
}

.leaflet-container button a {
    color: white;
}
</style>
