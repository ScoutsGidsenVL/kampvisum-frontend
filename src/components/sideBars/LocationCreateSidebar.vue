<template>
  <div>
    <base-side-bar
      maxWidth="max-w-2xl"
      :isOverflowHidden="true"
      :selection="selected"
      :is-display="sideBarState.state !== 'hide'"
      :is-edit="sideBarState.state === 'edit'"
      name="LocationCreateSidebar"
      :title="title"
      @hideSidebar="closeSideBar"
      width="max-w-2xl"
    >
      <form
        id="addNewLocation"
        ref="formDiv"
        :class="{ 'd-flex': sideBarState.state === 'new' || sideBarState.state === 'edit', 'd-none': sideBarState.state === 'list' }"
        class="flex-col relative overflow-y-scroll h-full px-4 pt-3"
        @submit.prevent="onSubmit"
      >
        <div class="mt-1flex flex-col gap-3">
          <div class="w-100">
            <custom-input :disabled="patchLoading" :type="InputTypes.TEXT" rules="required" name="name" label="Naam locatie" />
          </div>
        </div>

        <div class="py-4">
          <strong class="m-0 text-lg">Contactpersoon</strong>
          <custom-input :disabled="patchLoading" :type="InputTypes.TEXT" :rules="check.checkParent.checkType.checkType === 'CampLocationCheck' ? 'required' : ''" name="contactName" label="Naam" />
          <custom-input :disabled="patchLoading" :type="InputTypes.TEXT" :rules="check.checkParent.checkType.checkType === 'CampLocationCheck' ? 'required' : ''" name="contactPhone" label="Gsm nummer" />
          <custom-input :disabled="patchLoading" :type="InputTypes.TEXT" :rules="check.checkParent.checkType.checkType === 'CampLocationCheck' ? 'required' : ''" name="contactEmail" label="Email" />
        </div>

        <div class="pb-4 flex flex-col gap-3 relative">
          <strong class="m-0 text-lg">Adres(sen)</strong>

          <div class="bg-lighterGreen p-2">Zoek een adres of duid het aan op de kaart.</div>
          <search-input :loadingSubmit="patchLoading" v-model:loading="loading" name="search" placeholder="Zoek adres" :repository="LocationSearchRepository" @fetchedOptions="fetchedSearchResults($event)" />
          <div v-if="fetchedLocationsToSelect.length > 0" class="absolute w-full mt-10 bg-white border-r-2 border-l-2 border-b-2 border-gray z-40">
            <div v-for="(fetchedLocation, index) in fetchedLocationsToSelect" :key="fetchedLocation" :class="index === 1 ? 'border-t-10': ''" class="border-ligtGray hover:bg-lightGray p-2 pl-3 cursor-pointer border-b-2">
              <div class="flex flex-col" @click="addLocationPoint(fetchedLocation)">
                <strong>
                 {{fetchedLocation.properties.name}} 
                </strong>
                {{fetchedLocation.address}}
              </div>
            </div>
          </div>

          <div class="bg-lighterGreen p-3" >
            <h4 class="">Hoofdlocatie</h4>
            <div v-for="(searchedLocation) in searchedLocations" :key="searchedLocation">
              <div v-if="searchedLocation.isMainLocation">
                <p class="mb-0 italic">{{searchedLocation.name}}</p>
                <a class="text-sm italic" target="_blank" :href="'https://www.google.com/maps?q=' + searchedLocation.address">{{ searchedLocation.address }}</a>  
              </div>
            </div>
          </div>
          <!-- {{init}} -->
          <leaflet-map 
          @addOnClick="addOnClick($event)" 
          @deleteLocationPoint="deleteLocationPoint($event)" 
          @cancelLocationPoint="cancelLocationPoint()" 
          @addLocationPoint="addLocationPoint($event)" 
          v-if="sideBarState.state !== 'hide'" 
          :searchedLocations="searchedLocations"  
          :searchedLocation="searchedLocation" 
          v-model:center="check.value.centerLatLon"
          :check="check" />
        </div>

        <div class="mt-5 pb-5 pt-3 sticky bottom-0 bg-white pl-3" style="margin-left: -20px; margin-right: -20px">
          <custom-button :isSubmitting="patchLoading" text="">
            <template v-slot:icon>
              <div class="flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                {{'Voeg toe'}}
              </div>
            </template>
          </custom-button>
        </div>
      </form>
    </base-side-bar>
  </div>
</template>

<script lang="ts">
import { BaseSideBar, sideBarState, InputTypes, CustomButton, CustomInput, scrollToFirstError, CustomHeader } from 'vue-3-component-library'
import { PostLocation, PostLocationDeserializer, PostLocationSerializer } from '../../serializer/PostLocation'
import { LocationSearchRepository } from '../../repositories/locationSearchRepository'
import { LocationCheckRepository } from '@/repositories/LocationCheckRepository'
import { computed, defineComponent, PropType, ref, toRefs } from 'vue'
import DeadlineItemCard from '@/components/cards/DeadlineItemCard.vue'
import { useNotification } from '../../composable/useNotification'
import { SearchedLocation } from '../../serializer/SearchedLocation'
import LeafletMap from '@/components/cards/leaflet/leafletMap.vue'
import RepositoryFactory from '@/repositories/repositoryFactory'
import DateField from '@/components/semantics/DateField.vue'
import { useForm, ErrorMessage } from 'vee-validate'
import SearchInput from '../inputs/SearchInput.vue'
import { Check } from '@/serializer/Check'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'LocationCreateSideBar',
  components: {
    'custom-button': CustomButton,
    'custom-header': CustomHeader,
    'base-side-bar': BaseSideBar,
    'custom-input': CustomInput,
    DeadlineItemCard,
    ErrorMessage,
    DateField,
    LeafletMap,
    SearchInput
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    sideBarState: {
      type: Object as PropType<any>,
      required: true,
      default: () => {
        'hide'
      },
    },
    check: {
      type: Object as PropType<Check>,
      required: true
    },
    parentLocations: {
      type: Object as PropType<Array<any>>,
      required: false,
      default: () => { return [] }
    },
  },
  emits: ['update:sideBarState', 'actionSuccess'],
  setup(props, context) {
    
    // CLONE OBJECT
    const check = ref<Check>({...props.check})

    const selected = computed(() => (props.sideBarState.state === 'list' ? 'BestaandCamp' : 'NieuwCamp'))
    const searchedLocations = ref<Array<SearchedLocation>>([])
    const searchedLocation = ref<SearchedLocation>({})
    const { triggerNotification } = useNotification()
    const fetchedLocationsToSelect = ref<any>([])
    const patchLoading = ref<boolean>(false)
    const { sideBarState } = toRefs(props)
    const loading = ref<boolean>(false)



    // -------------- NEEDS REFACTOR -----------
    const init = ref<PostLocation>({...props.check.value})
    init.value.centerLatLon = [props.check.value.centerLatitude, props.check.value.centerLongitude]
    if (sideBarState.value.state === 'new') {
      init.value.locations = []
    }
    if (sideBarState.value.state === 'edit') {
      init.value.locations = []
      init.value.name = sideBarState.value.entity.name
      init.value.contactName = sideBarState.value.entity.contactName
      init.value.contactPhone = sideBarState.value.entity.contactPhone
      init.value.contactEmail = sideBarState.value.entity.contactEmail
    }
    const { resetForm, handleSubmit, validate, values, isSubmitting } = useForm<PostLocation>({
      initialValues: {...init.value}
    })
    // -------------------------------------------------



    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    const closeSideBar = () => {
      context.emit('update:sideBarState', { state: 'hide' })
      resetForm()
    }

    const onSubmit = async () => {
      await validate().then((validation: any) => scrollToFirstError(validation, 'addNewLocation'))
      handleSubmit(async (values: PostLocation) => {
        patchLoading.value = true
        values.zoom = check.value.value.zoom
        values.centerLatLon = check.value.value.centerLatLon
        values.centerLatitude = check.value.value.centerLatLon[0]
        values.centerLongitude = check.value.value.centerLatLon[1]
        await patchLocation(values)
        closeSideBar()
      })()
    }

    const patchLocation = async (location: PostLocation) => {
      await RepositoryFactory.get(LocationCheckRepository)
        .updateLocationCheck(props.check.endpoint, location, props.parentLocations)
        .then((p: any) => {
          context.emit('actionSuccess', {data: p, action: 'PATCH'})
          patchLoading.value = false
          triggerNotification('Aanpassingen aan het kamp zijn succesvol opgeslagen!')
        })
    }

    if (values.locations) {
      searchedLocations.value = values.locations
    }

    const fetchedSearchResults = (results: SearchedLocation[] ) => {
      fetchedLocationsToSelect.value = results
      loading.value = false
    }

    const resetSearchedLocation = () => {
      searchedLocation.value = {}
    }

    const emptySearchResults = () => {
      fetchedLocationsToSelect.value = []
      // values.search = ''
      const e = document.getElementById('search')
      // @ts-ignore
      e.value = ""
    }

    const addLocationPoint = (location: SearchedLocation) => {
      emptySearchResults()
      if (location.latLon) {
        check.value.value.centerLatitude = location.latLon[0] ? location.latLon[0] : check.value.value.centerLatitude
        check.value.value.centerLongitude = location.latLon[1] ? location.latLon[1] : check.value.value.centerLongitude
        check.value.value.centerLatLon = location.latLon
      }

      if (searchedLocations.value.length === 0 && check?.value?.checkParent?.checkType?.checkType === 'CampLocationCheck') {
        location.isMainLocation = true
      }
      searchedLocations.value.push(location)
      resetSearchedLocation()
      values.locations = searchedLocations.value
    }

    const cancelLocationPoint = () => {
      resetSearchedLocation()
    }

    const deleteLocationPoint = (index: number) => {
      const deletedLocationPoint = searchedLocations.value[index]
      searchedLocations.value.splice(index, 1)
      if (searchedLocations.value.length > 0 && deletedLocationPoint.isMainLocation && check?.value?.checkParent?.checkType?.checkType === 'CampLocationCheck') {
        searchedLocations.value[0].isMainLocation = true
      }
      values.locations = searchedLocations.value
    }

    const addOnClick = (latLng: any) => {
      // search based on clicked coords latLng
      RepositoryFactory.get(LocationSearchRepository)
            .reverseSearch(latLng)
            .then((result: any) => {
              searchedLocation.value = result 
              searchedLocation.value.latLon = latLng
            })      
    }

    return {
      LocationSearchRepository,
      fetchedLocationsToSelect,
      fetchedSearchResults,
      cancelLocationPoint,
      deleteLocationPoint,
      searchedLocations,
      searchedLocation,
      addLocationPoint,
      isSubmitting,
      sideBarState,
      closeSideBar,
      patchLoading,
      InputTypes,
      addOnClick,
      selected,
      onSubmit,
      loading,
      values,
      check,
      t,
      init
    }
  },
})
</script>
