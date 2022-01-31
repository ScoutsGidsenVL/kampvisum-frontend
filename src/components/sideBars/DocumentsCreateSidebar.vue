<template>
  <div>
    <base-side-bar
      width="max-w-2xl"
      :isOverflowHidden="isOverflowHidden"
      :selection="selected"
      :is-display="sideBarState.state !== 'hide'"
      :is-edit="sideBarState.state === 'edit'"
      name="Documents"
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
        <div class="pb-4">
          <div class="w-full">
            <dropzone v-model:progress="progress" @uploadedFile="uploadedFile($event)" />
          </div>
        </div>

        <!-- <div class="pb-4 flex flex-col">
          <span class="font-bold text-sm">Zoek door bestaande bestanden</span>
          <search-input v-model:loading="loading" name="search" :repository="LocationSearchRepository" @fetchedOptions="fetchedSearchResult($event)" />
        </div> -->

        <div>
          <file-item-component v-for="(file) in filesToSelectFrom" :file="file" :key="file" :canBeChecked="true" />
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
import { BaseSideBar, sideBarState, InputTypes, CustomButton, CustomInput, CustomHeader } from 'vue-3-component-library'
import { LocationSearchRepository } from '../../repositories/locationSearchRepository'
import { FileCheckRepository } from '@/repositories/FileCheckRepository'
import { computed, defineComponent, PropType, ref, toRefs } from 'vue'
import DeadlineItemCard from '@/components/cards/DeadlineItemCard.vue'
import LeafletMap from '@/components/cards/leaflet/leafletMap.vue'
import RepositoryFactory from '@/repositories/repositoryFactory'
import DateField from '@/components/semantics/DateField.vue'
import { PostLocation } from '../../serializer/PostLocation'
import { DeadlineItem } from '@/serializer/DeadlineItem'
import { useUpload } from '../../composable/useUpload'
import FileItemComponent from '../upload/FileItem.vue'
import { useForm, ErrorMessage } from 'vee-validate'
import SearchInput from '../inputs/SearchInput.vue'
import { FileItem } from '@/serializer/FileItem'
import Dropzone from '../inputs/Dropzone.vue'
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
    SearchInput,
    Dropzone,
    FileItemComponent
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
    },
    check: {
      type: Object as PropType<Check>,
      required: true
    },
  },
  emits: ['update:sideBarState', 'actionSuccess'],
  setup(props, context) {
    const selected = computed(() => (props.sideBarState.state === 'list' ? 'BestaandCamp' : 'NieuwCamp'))
    const { resetForm, handleSubmit, values, isSubmitting } = useForm<PostLocation>()
    const filesToSelectFrom = ref<Array<any>>([])
    const { sideBarState } = toRefs(props)
    const loading = ref<boolean>(false)
    const { progress } = useUpload()
    const isUploading = ref<boolean>(false)
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    const closeSideBar = () => {
      context.emit('update:sideBarState', { state: 'hide' })
      filesToSelectFrom.value = []
      resetForm()
    }

    const onSubmit = async () => {
      handleSubmit(async () => {
        patchFilesToList(filesToSelectFrom.value)
        closeSideBar()
      })()
    }

    const patchFilesToList = async (files: FileItem[]) => {
      await RepositoryFactory.get(FileCheckRepository)
        .update(props.check.endpoint, files)
        .then(() => {
          context.emit('actionSuccess', 'POST')
        })
    }

    const items = ref<Array<DeadlineItem>>([{ category: '', label: ''}])

    const addItem = () => {
      items.value.push({category: '', label: ''})
    }

    const removeItemFromArray = (index: string) => {
      items.value.splice(Number(index), 1);
    }

    const uploadedFile = (file: any) => {
      filesToSelectFrom.value.push(file)
    }

    return {
      LocationSearchRepository,
      removeItemFromArray,
      filesToSelectFrom,
      isSubmitting,
      sideBarState,
      closeSideBar,
      uploadedFile,
      isUploading,
      InputTypes,
      selected,
      onSubmit,
      progress,
      addItem,
      loading,
      values,
      items,
      t,
    }
  },
})
</script>
