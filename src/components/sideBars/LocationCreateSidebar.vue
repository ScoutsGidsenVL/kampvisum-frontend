<template>
  <div>
    <base-side-bar
      maxWidth="max-w-2xl"
      :isOverflowHidden="true"
      :selection="selected"
      :is-display="sideBarState.state !== 'hide'"
      :is-edit="sideBarState.state === 'edit'"
      name="LocationSidebar"
      :title="title"
      @hideSidebar="closeSideBar"
      @options="changeSideBar"
      width="max-w-2xl"
      :options="options"
    >
      <form
        id="locationForm"
        ref="formDiv"
        :class="{ 'd-flex': sideBarState.state === 'new' || sideBarState.state === 'edit', 'd-none': sideBarState.state === 'search' }"
        class="flex-col relative overflow-y-scroll h-full px-4 pt-3"
        @submit.prevent="onSubmit"
      >
      
        <div class="mt-1flex flex-col gap-3">
          <div class="w-100">
            <custom-input :disabled="patchLoading" :type="InputTypes.TEXT" rules="required" name="name" :label="t('sidebars.location-sidebar.form.name')" />
          </div>
        </div>

        <div class="py-4 flex flex-col gap-3 relative">
          <strong class="m-0 text-lg">{{ t('sidebars.location-sidebar.form.addresses') }}</strong>
          <div v-if="searchedLocations.length > 0" class="bg-lighterGreen p-3">
            <div class="flex justify-between">
              <h4 class="">{{ t('sidebars.location-sidebar.form.main-location') }}</h4>
              <div>
                <i-trash @click="clearLocation()" class="cursor-pointer hover:text-red" />
              </div>
            </div>
            <div v-for="searchedLocation in searchedLocations" :key="searchedLocation">
              <div>
                <p class="mb-0 italic">{{ searchedLocation.name }}</p>
                <a class="text-sm italic" target="_blank" :href="'https://www.google.com/maps?q=' + searchedLocation.address">{{ searchedLocation.address }}</a>
              </div>
            </div>
          </div>
          <!-- SEARCH -->
          <!-- <search-input
            :disabled="values.locations.length !== 0"
            :loadingSubmit="patchLoading"
            v-model:loading="loading"
            name="search"
            :placeholder="t('sidebars.location-sidebar.form.search-map')"
            :repository="LocationSearchRepository"
            @fetchedOptions="fetchedSearchResults($event)"
          /> -->

          <!-- ADRESS FORM -->
          <div>
            <custom-input
              :disabled="patchLoading"
              :type="InputTypes.TEXT"
              :rules="'required'"
              name="country"
              :label="t('sidebars.location-sidebar.form.country')"
            />
            <div class="flex justify-between gap-2">
              <div class="w-50">
                <custom-input
                  :disabled="patchLoading"
                  :type="InputTypes.TEXT"
                  :rules="returnRequiredIfBelgium()"
                  name="postalcode"
                  :label="t('sidebars.location-sidebar.form.postalcode')"
                />
              </div>
              <div class="w-100">
                <custom-input
                  :disabled="patchLoading"
                  :type="InputTypes.TEXT"
                  :rules="'required'"
                  name="township"
                  :label="t('sidebars.location-sidebar.form.township')"
                />
              </div>
            </div>

            <div class="flex justify-between gap-2">
              <div class="w-100">
                <custom-input
                  :disabled="patchLoading"
                  :type="InputTypes.TEXT"
                  :rules="'required'"
                  name="street"
                  :label="t('sidebars.location-sidebar.form.street')"
                />
              </div>
              <div class="w-25">
                <custom-input
                  :disabled="patchLoading"
                  :type="InputTypes.TEXT"
                  :rules="''"
                  name="houseNumber"
                  :label="t('sidebars.location-sidebar.form.houseNumber')"
                />
              </div>
            </div>
          </div>

          <div v-if="fetchedLocationsToSelect.length > 0" class="absolute w-full mt-36 bg-white border-r-2 border-l-2 border-b-2 border-gray z-40">
            <div
              v-for="(fetchedLocation, index) in fetchedLocationsToSelect"
              :key="fetchedLocation"
              :class="index === 1 ? 'border-t-10' : ''"
              class="border-ligtGray hover:bg-lightGray p-2 pl-3 cursor-pointer border-b-2"
            >
              <div class="flex flex-col" @click="addLocationPoint(fetchedLocation)">
                <strong>
                  {{ fetchedLocation.properties.name }}
                </strong>
                {{ fetchedLocation.address }}
              </div>
            </div>
          </div>
          <leaflet-map 
          ref="child2"
          @addOnClick="values.locations.length === 0 ? addOnClick($event) : null" 
          @deleteLocationPoint="deleteLocationPoint($event)" 
          @cancelLocationPoint="cancelLocationPoint()" 
          @addLocationPoint="addLocationPoint($event)" 
          v-if="sideBarState.state === 'new' || sideBarState.state === 'edit'" 
          :searchedLocations="searchedLocations"  
          :searchedLocation="searchedLocation"
          v-model:center="check.value.centerLatLon"
          :check="check" />

        </div>
        <div>
        </div>

        <div class="">
          <strong class="m-0 text-lg">{{ t('sidebars.location-sidebar.form.contactPerson') }}</strong>
          <custom-input
            :disabled="patchLoading"
            :type="InputTypes.TEXT"
            :rules="check.checkParent.checkType.checkType === 'CampLocationCheck' ? '' : ''"
            name="contactName"
            :label="t('sidebars.location-sidebar.form.contactName')"
          />
          <custom-input
            :disabled="patchLoading"
            :type="InputTypes.TEXT"
            :rules="check.checkParent.checkType.checkType === 'CampLocationCheck' ? '' : ''"
            name="contactPhone"
            :label="t('sidebars.location-sidebar.form.contactPhone')"
          />
          <custom-input
            :disabled="patchLoading"
            :type="InputTypes.TEXT"
            :rules="check.checkParent.checkType.checkType === 'CampLocationCheck' ? 'email' : 'email'"
            name="contactEmail"
            :label="t('sidebars.location-sidebar.form.contactEmail')"
          />
        </div>

        <div class="mt-5 pb-5 pt-3 sticky bottom-0 bg-white pl-3" style="margin-left: -20px; margin-right: -20px">
          <custom-button :isSubmitting="patchLoading" text="">
            <template v-slot:icon>
              <div class="flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                {{ t('sidebars.location-sidebar.form.add') }}
              </div>
            </template>
          </custom-button>
        </div>
      </form>
       <!-- SEARCH -->
      <form
        id="SearchForm"
        ref="searchFormDiv"
        :class="{ 'd-none': sideBarState.state === 'new' || sideBarState.state === 'edit', 'd-flex': sideBarState.state === 'search' }"
        class="flex-col h-full"
        @submit.prevent="onSubmit"
      >
        <div class="p-4">
          <search-input :filter="filter" v-model:loading="loading" name="search" :placeholder="t('sidebars.location-sidebar.search')" :repository="LocationRepository" @fetchedOptions="fetchedSearchResultsExistingLocations($event)" />
        </div>

        <div class="px-4 overflow-scroll	h-full">
          <div v-for="(existingLocation) in existingLocations" :key="existingLocation">
            <existing-location-item :existingLocation="existingLocation" :displayCheck="displayCheckLocation(false, existingLocation, existingLocations)" />
          </div>
        </div>       
        <div class="mt-5 py-4 px-4 absolute bottom-0 bg-white w-full">
          <custom-button :isSubmitting="isPatching" :text="t('sidebars.location-sidebar.form.add')" />
        </div>
      </form>
    </base-side-bar>
  </div>
</template>

<script lang="ts">
import { BaseSideBar, InputTypes, CustomButtonSmall, CustomInput, scrollToFirstError, CustomHeader, option } from 'vue-3-component-library'
import { LocationSearchRepository } from '../../repositories/locationSearchRepository'
import { LocationCheckRepository } from '@/repositories/LocationCheckRepository'
import { LocationRepository } from '../../repositories/LocationRepository'
import ExistingLocationItem from '../semantics/ExistingLocationItem.vue'
import { computed, defineComponent, PropType, ref, toRefs } from 'vue'
import DeadlineCreateCard from '@/components/cards/DeadlineCreateCard.vue'
import { SearchedLocation } from '../../serializer/SearchedLocation'
import { useNotification } from '../../composable/useNotification'
import LeafletMap from '@/components/cards/leaflet/leafletMap.vue'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { useSelectionHelper } from '@/helpers/selectionHelper'
import { PostLocation } from '../../serializer/PostLocation'
import DateField from '@/components/semantics/DateField.vue'
import { useForm, ErrorMessage } from 'vee-validate'
import SearchInput from '../inputs/SearchInput.vue'
import { Check } from '@/serializer/Check'
import { useI18n } from 'vue-i18n'
import ITrash from '../icons/ITrash.vue'

export default defineComponent({
  name: 'LocationCreateSideBar',
  components: {
    'custom-button': CustomButtonSmall,
    'custom-header': CustomHeader,
    'base-side-bar': BaseSideBar,
    'custom-input': CustomInput,
    DeadlineCreateCard,
    ErrorMessage,
    DateField,
    LeafletMap,
    SearchInput,
    ExistingLocationItem,
    ITrash
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
      required: true,
    },
    parentLocations: {
      type: Object as PropType<Array<any>>,
      required: false,
      default: () => {
        return []
      },
    },
  },
  emits: ['update:sideBarState', 'actionSuccess'],
  setup(props, context) {
    const { displayCheckLocation } = useSelectionHelper()

    const options = ref<option[]>([
      { text: 'Nieuw', value: 'new' },
      // { text: 'Zoek', value: 'search' },
    ])

    const changeSideBar = (options: 'newLocationSidebar' | 'searchLocationSidebar') => {
      if (options === 'newLocationSidebar') {
        context.emit('update:sideBarState', { state: 'new' })
      }
      if (options === 'searchLocationSidebar') {
        context.emit('update:sideBarState', { state: 'search' })
      }
    }
    
    // CLONE OBJECT
    const check = ref<Check>({...props.check})
    const selected = computed(() => (props.sideBarState.state === 'search' ? 'searchLocationSidebar' : 'newLocationSidebar'))
    const searchedLocations = ref<Array<SearchedLocation>>([])
    const searchedLocation = ref<SearchedLocation>({})
    const { triggerNotification } = useNotification()
    const fetchedLocationsToSelect = ref<any>([])
    const patchLoading = ref<boolean>(false)
    const { sideBarState } = toRefs(props)
    const loading = ref<boolean>(false)

    // -------------- NEEDS REFACTOR -----------
    const init = ref<PostLocation>({ ...props.check.value })
    init.value.centerLatLon = [props.check.value.centerLatitude, props.check.value.centerLongitude]
    if (sideBarState.value.state === 'new') {
      init.value.locations = []
      init.value.country = 'Belgie'
    }
    if (sideBarState.value.state === 'edit') {
      init.value.locations = []
      init.value.name = sideBarState.value.entity.name
      init.value.contactName = sideBarState.value.entity.contactName
      init.value.contactPhone = sideBarState.value.entity.contactPhone
      init.value.contactEmail = sideBarState.value.entity.contactEmail
      init.value.locations = sideBarState.value.entity.locations
      init.value.country = 'Belgie'
    }
    const { resetForm, handleSubmit, validate, values, isSubmitting } = useForm<any>({
      initialValues: { ...init.value },
    })
    // -------------------------------------------------

    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    const closeSideBar = () => {
      context.emit('actionSuccess', { action: 'CLOSE' })
      context.emit('update:sideBarState', { state: 'hide' })
      document.body.classList.remove('overflow-hidden')
      resetForm()
    }

    const onSubmit = async () => {
      if (sideBarState.value.state === 'search') {
        const selected: any = existingLocations.value.find((xl: PostLocation) => xl.isChecked === true)
        if (selected && selected.id) {
          await RepositoryFactory.get(LocationCheckRepository)
          .addSearched(props.check.endpoint,props.parentLocations.concat([{id: selected.id}]))
          .then((p: any) => {
            context.emit('actionSuccess', { data: p, action: 'PATCH' })
            patchLoading.value = false
            triggerNotification(t('sidebars.location-sidebar.form.notification-patched'))
            closeSideBar()
          })
        }
      }
      await validate().then((validation: any) => scrollToFirstError(validation, 'addNewLocation'))
      if (searchedLocations.value.length !== 0) {
          handleSubmit(async (values: PostLocation) => {
            patchLoading.value = true
            values.zoom = check.value.value.zoom
            values.centerLatLon = check.value.value.centerLatLon
            values.centerLatitude = check.value.value.centerLatLon[0]
            values.centerLongitude = check.value.value.centerLatLon[1]
            sideBarState.value.state === 'edit' ?  values.id = sideBarState.value.entity.id : undefined 
            await patchLocation(values)
            closeSideBar()
          })()
      } else if (sideBarState.value.state !== 'search') {
        triggerNotification(t('sidebars.location-sidebar.form.atleast-one'))
      }
    }

    const patchLocation = async (location: any) => {
      await RepositoryFactory.get(LocationCheckRepository)
        .updateLocationCheck(props.check.endpoint, location, props.parentLocations)
        .then((p: any) => {
          context.emit('actionSuccess', { data: p, action: 'PATCH' })
          patchLoading.value = false
          triggerNotification(t('sidebars.location-sidebar.form.notification-patched'))
        })
    }

    if (values.locations) {
      searchedLocations.value = values.locations
    }

    const fetchedSearchResults = (results: SearchedLocation[]) => {
      fetchedLocationsToSelect.value = results
      loading.value = false
    }

    const existingLocations = ref<PostLocation[]>([])

    const fetchedSearchResultsExistingLocations = (results: PostLocation[] ) => {
      existingLocations.value = results
    }

    const resetSearchedLocation = () => {
      searchedLocation.value = {}
    }

    const emptySearchResults = () => {
      fetchedLocationsToSelect.value = []
      // values.search = ''
      const e = document.getElementById('search')
      // @ts-ignore
      e.value = ''
    }

    const child2 = ref<any>(null)

    const centerInChildComponent = (loc: any) => {
      child2.value.centerClickedLocation(loc[0], loc[1])
    }

    const addLocationPoint = (location: SearchedLocation) => {
      emptySearchResults()
      if (location.latLon && location.latLon.length > 0) {
        centerInChildComponent(location.latLon)
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
          searchedLocation.value.latLon = [latLng.lat, latLng.lng]
        })
    }

    const clearLocation = () => {
      searchedLocations.value = []
      values.locations = []
    }

    const returnRequiredIfBelgium = () => {
      const val = values.country;
      if (val === 'belgie' || val === 'belgium' || val === 'België') {
        return 'required'
      } else {
        return ''
      }
    }

    return {
      fetchedSearchResultsExistingLocations,
      LocationSearchRepository,
      fetchedLocationsToSelect,
      fetchedSearchResults,
      cancelLocationPoint,
      deleteLocationPoint,
      displayCheckLocation,
      LocationRepository,
      searchedLocations,
      existingLocations,
      searchedLocation,
      addLocationPoint,
      changeSideBar,
      isSubmitting,
      sideBarState,
      closeSideBar,
      patchLoading,
      InputTypes,
      addOnClick,
      selected,
      onSubmit,
      loading,
      options,
      child2,
      values,
      check,
      init,
      t,
      clearLocation,
      returnRequiredIfBelgium
    }
  },
})
</script>
