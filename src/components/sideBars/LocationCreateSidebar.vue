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
        onkeydown="return event.key != 'Enter';"
        v-on:keyup.enter="onPageChange"
      >
      
        <div class="mt-1flex flex-col gap-3">
          <div class="w-100">
            <custom-input :disabled="patchLoading" :type="InputTypes.TEXT" rules="required" name="name" :label="t('sidebars.location-sidebar.form.name')" />
          </div>
        </div>

        <div class="py-4 flex flex-col gap-3 relative">
          <!-- ADRESS FORM -->
          <div>
            <multi-select
              :label="t('sidebars.location-sidebar.form.country')"
              @addSelection="changeSelectedCountry($event)"
              id="countrySelector"
              :object="true"
              :options="countries"
              :value="selectedCountry"
              track-by="nl"
              value-prop="en"
              :canClear="false"
              :canDeselect="false"
              :searchable="true"
            />
            <multiselect v-model="value" :options="options" :custom-label="nameWithLang" placeholder="Select one" label="name" track-by="name"></multiselect>

            <div class="my-3">
              <custom-input
                :placeholder="''"
                :disabled="patchLoading"
                :type="InputTypes.TEXT"
                name="autocomplete"
                :label="t('sidebars.location-sidebar.search')"
              />
            </div>

            <div class="flex justify-between gap-2">
              <div class="w-50" :class="returnRequiredIfBelgium() ? '' : 'mt-2'">
                <!-- HACKY CROSS VALIDATION -->
                <custom-input
                  v-if="values.country.toLowerCase() === 'belgium'"
                  :placeholder="''"
                  :disabled="patchLoading"
                  :type="InputTypes.TEXT"
                  :rules="'required'"
                  name="postalcode"
                  :label="t('sidebars.location-sidebar.form.postalcode')"
                  @change="updatedAddress()"
                />
                <custom-input
                  v-if="values.country.toLowerCase() !== 'belgium'"
                  :placeholder="''"
                  :disabled="patchLoading"
                  :type="InputTypes.TEXT"
                  name="postalcode"
                  :label="t('sidebars.location-sidebar.form.postalcode')"
                  @change="updatedAddress()"
                />
              </div>
              <div class="w-100">
                <custom-input
                  :placeholder="''"
                  :disabled="patchLoading"
                  :type="InputTypes.TEXT"
                  :rules="'required'"
                  name="township"
                  :label="t('sidebars.location-sidebar.form.township')"
                  @change="updatedAddress()"
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
                  @change="updatedAddress()"
                />
              </div>
              <div class="w-25 mt-2">
                <custom-input
                  :disabled="patchLoading"
                  :type="InputTypes.TEXT"
                  :rules="''"
                  name="houseNumber"
                  :label="t('sidebars.location-sidebar.form.houseNumber')"
                  @change="updatedAddress()"
                />
              </div>
            </div>
          </div>

          <div v-if="message" class="text-white p-1 font-bold" :class=" (message === SearchType.SUCCESS || message === SearchType.LOADING) ? 'bg-green' : 'bg-red'">
            {{ t(message) }}
          </div>

          <leaflet-map 
          ref="child2"
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

        <div v-if="!loadingDates && check.checkParent.checkType.checkType === 'CampLocationCheck'" class="mb-4">
          <strong class="m-0 text-lg">{{ t('sidebars.location-sidebar.form.start-end') }}</strong><span class="ml-2 text-red font-bold">*</span>
          <litepie-datepicker
            class="mt-2 mb-1"
            i18n="nl-be"
            as-single
            use-range
            v-model="dateValues"
            :formatter="formatter"
            separator=" - "
            placeholder=" "
          ></litepie-datepicker>
          <div v-if="checkIfOutsideRange(dateValues, leadersDates)" class="text-white p-1 font-bold bg-red">
            {{ t('sidebars.location-sidebar.form.warning') }}
          </div>
          <div v-if="dateValues.length === 0" class="text-red p-1">
            Dit veld is verplicht
          </div>
        </div>

        <div>
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

        <div class="mt-5 pb-5 pt-3 bottom-0 bg-white pl-3" style="margin-left: -20px; margin-right: -20px">
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
import { computed, defineComponent, PropType, ref, toRefs, onMounted } from 'vue'
import DeadlineCreateCard from '@/components/cards/DeadlineCreateCard.vue'
import { SearchedLocation } from '../../serializer/SearchedLocation'
import { useNotification } from '../../composable/useNotification'
import LeafletMap from '@/components/cards/leaflet/leafletMap.vue'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { useSelectionHelper } from '@/helpers/selectionHelper'
import { usePlaceAutocompleteHelper, message, SearchType } from '@/helpers/placeAutocompleteHelper'
import { PostLocation } from '../../serializer/PostLocation'
import DateField from '@/components/semantics/DateField.vue'
import { useForm, ErrorMessage } from 'vee-validate'
import SearchInput from '../inputs/SearchInput.vue'
import { Check } from '@/serializer/Check'
import { useI18n } from 'vue-i18n'
import ITrash from '../icons/ITrash.vue'
const LitepieDatepicker = require('litepie-datepicker').default
const { DateTime } = require("luxon");
import MultiSelect from '../../components/inputs/MultiSelect.vue'
import { scoutsCountriesRepository, ScoutsCountry } from '../../repositories/scoutsCountriesRepository'
import { CampVisumRepository } from '@/repositories/CampVisumRepository'
import { useRoute } from 'vue-router'
import useGroupAndYears from '@/composable/useGroupAndYears'

export default defineComponent({
  name: 'LocationCreateSideBar',
  components: {
    'litepie-datepicker': LitepieDatepicker,
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
    ITrash,
    'multi-select': MultiSelect,
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
    }
  },
  emits: ['update:sideBarState', 'actionSuccess'],
  setup(props, context) {
    const child2 = ref<any>(null)
    const dateValues = ref<Array<string>>([])
    const { displayCheckLocation } = useSelectionHelper()
    const countries = ref<Array<ScoutsCountry>>(RepositoryFactory.get(scoutsCountriesRepository).getCountries())
    const { getCountryObjectByName } = usePlaceAutocompleteHelper()
    const route = useRoute()
    const { selectedGroup } = useGroupAndYears()

    const loadingDates = ref<boolean>(true)
    const leadersDates = ref<Array<string>>([])

    const checkIfOutsideRange = (datesInput: Array<string>, leaderDatesInput: Array<string>) => {
      if (leaderDatesInput.length > 0 && datesInput.length > 0) {
        const ds = DateTime.fromFormat(datesInput[0].replace('.', ''), 'dd MMM yyyy', { locale: 'nl'})
        const de = DateTime.fromFormat(datesInput[1].replace('.', ''), 'dd MMM yyyy', { locale: 'nl'})
        const lds = DateTime.fromFormat(leaderDatesInput[0].replace('.', ''), 'dd MMM yyyy', { locale: 'nl'})
        const lde = DateTime.fromFormat(leaderDatesInput[1].replace('.', ''), 'dd MMM yyyy', { locale: 'nl'})
        if (ds.ts < lds.ts || ds.ts > lde.ts || de.ts < lds.ts || de.ts > lde.ts) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    }

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
      init.value.country = 'Belgium'
      init.value.postalcode = ''
      init.value.township = ''
      init.value.street = ''
      init.value.houseNumber = ''
        //DO CALL AND GET THE VALUES FOR START AND END DATE
        RepositoryFactory.get(CampVisumRepository).getDatesLeadersById(selectedGroup.value.groupAdminId, route.params.campId.toString()).then((res: any) => {
          if (res.start_date && res.end_date && props.check.checkParent && props.check.checkParent.checkType.checkType === 'CampLocationCheck') {
            dateValues.value.push(DateTime.fromFormat(res.start_date,'yyyy-MM-dd').setLocale('nl').toFormat('dd MMM. yyyy').toLowerCase())
            dateValues.value.push(DateTime.fromFormat(res.end_date, 'yyyy-MM-dd').setLocale('nl').toFormat('dd MMM. yyyy').toLowerCase())
            leadersDates.value.push(DateTime.fromFormat(res.start_date,'yyyy-MM-dd').setLocale('nl').toFormat('dd MMM. yyyy').toLowerCase())
            leadersDates.value.push(DateTime.fromFormat(res.end_date, 'yyyy-MM-dd').setLocale('nl').toFormat('dd MMM. yyyy').toLowerCase())
          } else {
            dateValues.value = []
          }
          loadingDates.value = false;
        })
    }
    const selectedCountry = ref<any>({ en: 'Belgium', nl: 'België', code: 'BE'})
    if (sideBarState.value.state === 'edit') {
      init.value.locations = []
      init.value.name = sideBarState.value.entity.name
      init.value.contactName = sideBarState.value.entity.contactName
      init.value.contactPhone = sideBarState.value.entity.contactPhone
      init.value.contactEmail = sideBarState.value.entity.contactEmail
      init.value.locations = sideBarState.value.entity.locations
      init.value.country = sideBarState.value.entity.country
      selectedCountry.value = getCountryObjectByName(sideBarState.value.entity.country)
      init.value.postalcode = sideBarState.value.entity.postalcode
      init.value.township = sideBarState.value.entity.township
      init.value.street = sideBarState.value.entity.street
      init.value.houseNumber = sideBarState.value.entity.houseNumber

      //DO CALL AND GET THE VALUES FOR START AND END DATE
      RepositoryFactory.get(CampVisumRepository).getDatesLeadersById(selectedGroup.value.groupAdminId, route.params.campId.toString()).then((res: any) => {
        if (res.start_date && res.end_date) {
          leadersDates.value.push(DateTime.fromFormat(res.start_date,'yyyy-MM-dd').setLocale('nl').toFormat('dd MMM. yyyy').toLowerCase())
          leadersDates.value.push(DateTime.fromFormat(res.end_date, 'yyyy-MM-dd').setLocale('nl').toFormat('dd MMM. yyyy').toLowerCase())
          if (sideBarState.value.entity?.startDate && sideBarState.value.entity?.endDate) {
            dateValues.value.push(DateTime.fromFormat(sideBarState.value.entity.startDate,'yyyy-MM-dd').setLocale('nl').toFormat('dd MMM. yyyy').toLowerCase())
            dateValues.value.push(DateTime.fromFormat(sideBarState.value.entity.endDate,'yyyy-MM-dd').setLocale('nl').toFormat('dd MMM. yyyy').toLowerCase())
          } else {
            dateValues.value = []
          }
        } else {
          dateValues.value = []
        }
        loadingDates.value = false;
      })
    }    

    const { resetForm, handleSubmit, validate, values, isSubmitting } = useForm<any>({
      initialValues: { ...init.value },
    })

    const { stopAutocomplete, initSearchAutocomplete, searchAddresCoordsWithGeocode, emptyAutocompleteField, emptyFields } = usePlaceAutocompleteHelper(values, searchedLocations, child2)

    onMounted(() => {
      initSearchAutocomplete(selectedCountry.value.code)
    })

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
          .addSearched(selectedGroup.value.groupAdminId, props.check.endpoint,props.parentLocations.concat([{id: selected.id}]))
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
        if (!(props.check.checkParent && props.check.checkParent.checkType.checkType === 'CampLocationCheck' && dateValues.value.length === 0)) {
          handleSubmit(async (values: PostLocation) => {
            patchLoading.value = true
            values.zoom = check.value.value.zoom
            values.centerLatLon = check.value.value.centerLatLon
            values.centerLatitude = check.value.value.centerLatLon[0]
            values.centerLongitude = check.value.value.centerLatLon[1]
            sideBarState.value.state === 'edit' ? values.id = sideBarState.value.entity.id : undefined 
            if (values.locations && values.locations[0]) {
              values.locations[0].country = values.country
              values.locations[0].postalcode = values.postalcode
              values.locations[0].township = values.township
              values.locations[0].street = values.street
              values.locations[0].houseNumber = values.houseNumber
            }
            const tmpDates: any = []
            dateValues.value.forEach((date: any) => {
              tmpDates.push(DateTime.fromFormat(date.replace('.', ''), 'dd MMM yyyy', { locale: 'nl' }).toFormat('yyyy-MM-dd'))
            });
            if (tmpDates.length > 0) {
              values.startDate = tmpDates[0];
              values.endDate = tmpDates[1];
            }
            await patchLocation(values)
            closeSideBar()
          })()
        }
      } else if (sideBarState.value.state !== 'search') {
        triggerNotification(t('sidebars.location-sidebar.form.atleast-one'))
      }
    }

    const patchLocation = async (location: any) => {
      await RepositoryFactory.get(LocationCheckRepository)
        .updateLocationCheck(selectedGroup.value.groupAdminId, props.check.endpoint, location, props.parentLocations)
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
      const e = document.getElementsByName('search')[0]
      // @ts-ignore
      e.value = ''
    }

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

      // searchedLocations.value.push(location)
      searchedLocations.value = [location]

      resetSearchedLocation()
      values.locations = [location]
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
      const val = values.country.toLowerCase();
      if (val === 'belgium') {
        return 'required'
      } else {
        return ''
      }
    }

    let debounce: any
    

    const performPhotonSearch = async () => {
      const v = values;
      const searchString = `${v.country} ${v.postalcode} ${v.township} ${v.street} ${v.houseNumber}`;
      clearTimeout(debounce)
      debounce = setTimeout(async () => {
        loading.value = true
        await RepositoryFactory.get(LocationSearchRepository)
        .search(searchString)
          .then((results: SearchedLocation[]) => {
            if (results[0]) {
              addLocationPoint(results[0])
              loading.value = false
            }
        })
      }, 750)
    }

    const formatter = ref({
      date: 'DD MMM YYYY',
      month: 'MMM'
    })

    const changeSelectedCountry = (changed: any) => {
      selectedCountry.value = changed;
      values.country = selectedCountry.value.en
      emptyAutocompleteField();
      emptyFields();
      stopAutocomplete();
      initSearchAutocomplete(selectedCountry.value.code);
    }

    const updatedAddress = () => {
      searchAddresCoordsWithGeocode(`${values.country} ${values.postalcode} ${values.township} ${values.street} ${values.houseNumber}`, selectedCountry.value.code)
    }

    const onPageChange = (event: any) =>{
      event.target.blur(); 
    }

    return {
      SearchType,
      onPageChange,
      updatedAddress,
      changeSelectedCountry,
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
      returnRequiredIfBelgium,
      performPhotonSearch,
      dateValues,
      formatter,
      selectedCountry,
      countries,
      message,
      loadingDates,
      leadersDates,
      checkIfOutsideRange
    }
  },
})
</script>
