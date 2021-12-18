<template>
  <div>
    <base-side-bar
      :isOverflowHidden="isOverflowHidden"
      :selection="selected"
      :is-display="sideBarState.state !== 'hide'"
      :is-edit="sideBarState.state === 'edit'"
      name="Camp"
      :title="title"
      @hideSidebar="closeSideBar"
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
            <custom-input :type="InputTypes.TEXT" rules="" name="name" label="Naam lokalen / kampplaats" />
          </div>
        </div>

        <div class="py-4">
          <strong class="m-0 text-lg">Contactpersoon</strong>
          <custom-input :type="InputTypes.TEXT" rules="" name="contactPerson.name" label="Naam" />
          <custom-input :type="InputTypes.TEXT" rules="" name="contactPerson.phoneNumber" label="Gsm nummer" />
        </div>

        <div class="pb-4 flex flex-col gap-3">
          <strong class="m-0 text-lg">Adres(sen)</strong>
          <div class="bg-lighterGreen p-2">Zoek een adres of duid het aan op de kaart.</div>
          <search-input v-model:loading="loading" name="search" placeholder="Zoek adres" :repository="LocationSearchRepository" @fetchedOptions="fetchedSearchResult($event)" />
          <leaflet-map @deleteLocationPoint="deleteLocationPoint($event)" @cancelLocationPoint="cancelLocationPoint()" @addLocationPoint="addLocationPoint($event)" v-if="sideBarState.state !== 'hide'" :searchedLocations="searchedLocations"  :searchedLocation="searchedLocation" :center="fakeCenter" />
        </div>

        <div class="mt-5 pb-5 pt-3 sticky bottom-0 bg-white pl-3" style="margin-left: -20px; margin-right: -20px">
          <custom-button text="">
            <template v-slot:icon>
              <div class="flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                {{sideBarState.state === 'edit' ? 'Bewerk' : 'Voeg toe'}}
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
import { computed, defineComponent, PropType, ref, toRefs } from 'vue'
import DeadlineItemCard from '@/components/cards/DeadlineItemCard.vue'
import LeafletMap from '@/components/cards/leaflet/leafletMap.vue'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { CampRepository } from '@/repositories/campRepository'
import DateField from '@/components/semantics/DateField.vue'
import { DeadlineItem } from '@/serializer/DeadlineItem'
import { useForm, ErrorMessage } from 'vee-validate'
import { Camp } from '../../serializer/Camp'
import { useI18n } from 'vue-i18n'
import SearchInput from '../inputs/SearchInput.vue'
import { LocationSearchRepository } from '../../repositories/locationSearchRepository'
import { SearchedLocation } from '../../serializer/SearchedLocation'
import { PostLocation } from '../../serializer/PostLocation'

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
    existingList: {
      type: Array,
      default: () => {
        return []
      },
    },
    closeOnAdd: {
      type: Boolean,
      default: false,
      required: false,
    },
    sideBarState: {
      type: Object as PropType<sideBarState<Location>>,
      required: true,
      default: () => {
        'hide'
      },
    },
    isExtraInformationComment: {
      type: Boolean,
      required: false,
      default: false,
    },
    isOverflowHidden: {
      type: Boolean,
      required: false,
      default: true,
    }
  },
  emits: ['update:sideBarState', 'actionSuccess'],
  setup(props, context) {
    const selected = computed(() => (props.sideBarState.state === 'list' ? 'BestaandCamp' : 'NieuwCamp'))
    const { resetForm, handleSubmit, validate, values, isSubmitting } = useForm<PostLocation>()
    const { sideBarState } = toRefs(props)
    const fakeCenter = ref<Array<number>>([50.6402809, 4.6667145])

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
        if (props.sideBarState.state === 'edit') {
          // await updateCamp(values)
        } else {
          await postLocation(values)
        }
        closeSideBar()
      })()
    }

    // const updateLocation = async (data: Camp) => {
    //   if (data.uuid) {
    //     await RepositoryFactory.get(CampRepository)
    //       .update(data.uuid, data)
    //       .then(() => {
    //         context.emit('actionSuccess', 'UPDATE')
    //       })
    //   }
    // }

    const postLocation = async (data: PostLocation) => {
      console.log('DATA TOT POST: ', data)
      // await RepositoryFactory.get(CampRepository)
      //   .create(data)
      //   .then(() => {
      //     context.emit('actionSuccess', 'POST')
      //   })
    }

    const items = ref<Array<DeadlineItem>>([{ category: '', label: ''}])

    const addItem = () => {
      items.value.push({category: '', label: ''})
    }

    const removeItemFromArray = (index: string) => {
      items.value.splice(Number(index), 1);
    }
    const searchedLocations = ref<Array<SearchedLocation>>([])
    const searchedLocation = ref<SearchedLocation>({})

    const fetchedSearchResult = (result: SearchedLocation ) => {
      searchedLocation.value = result
      fakeCenter.value = result.latLon ? result.latLon : fakeCenter.value
      loading.value = false
    }

    const resetSearchedLocation = () => {
      searchedLocation.value = {}
    }

    const addLocationPoint = (location: SearchedLocation) => {
      if (searchedLocations.value.length === 0) {
        location.isHeadLocation = true
        searchedLocations.value.push(location)
      } else {
        searchedLocations.value.push(location)
      }
      resetSearchedLocation()
      values.locationAddresses = searchedLocations.value
    }

    const cancelLocationPoint = () => {
      resetSearchedLocation()
    }

    const deleteLocationPoint = (index: number) => {
      const deletedLocationPoint = searchedLocations.value[index]
      searchedLocations.value.splice(index, 1)
      if (searchedLocations.value.length > 0 && deletedLocationPoint.isHeadLocation) {
        searchedLocations.value[0].isHeadLocation = true
      }
      values.locationAddresses = searchedLocations.value
    }

    const loading = ref<boolean>(false)

    return {
      isSubmitting,
      sideBarState,
      closeSideBar,
      selected,
      onSubmit,
      InputTypes,
      values,
      t,
      addItem,
      items,
      removeItemFromArray,
      fakeCenter,
      LocationSearchRepository,
      fetchedSearchResult,
      searchedLocation,
      loading,
      searchedLocations,
      addLocationPoint,
      cancelLocationPoint,
      deleteLocationPoint
    }
  },
})
</script>
