<template>
  <div>
    <base-side-bar
      maxWidth="max-w-2xl"
      :isOverflowHidden="isOverflowHidden"
      :selection="selected"
      :is-display="sideBarState.state !== 'hide'"
      :is-edit="sideBarState.state === 'edit'"
      name="MemberSidebar"
      :title="title"
      @hideSidebar="closeSideBar"
    >
      <div class="p-4">
        <search-input v-model:loading="loading" name="search" placeholder="Zoek op naam" :repository="LocationSearchRepository" @fetchedOptions="fetchedSearchResults($event)" />
      </div>

      <div>
        
      </div>
    </base-side-bar>
  </div>
</template>

<script lang="ts">
import { LocationSearchRepository } from '../../repositories/locationSearchRepository'
import { BaseSideBar, sideBarState, InputTypes } from 'vue-3-component-library'
import { computed, defineComponent, PropType, ref, toRefs } from 'vue'
import { SearchedLocation } from '../../serializer/SearchedLocation'
import { PostLocation } from '../../serializer/PostLocation'
import SearchInput from '../inputs/SearchInput.vue'
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'LocationCreateSideBar',
  components: {
    'base-side-bar': BaseSideBar,
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

    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    const closeSideBar = () => {
      context.emit('update:sideBarState', { state: 'hide' })
      resetForm()
    }

    const onSubmit = async () => {
      // await validate().then((validation: any) => scrollToFirstError(validation, 'addNewLocation'))
      handleSubmit(async (values: PostLocation) => {
        if (props.sideBarState.state === 'edit') {
          // await updateCamp(values)
        } else {
          // await postLocation(values)
        }
        closeSideBar()
      })()
    }
    
    const fetchedSearchResults = (result: SearchedLocation ) => {
      loading.value = false
    }

    const loading = ref<boolean>(false)

    return {
      LocationSearchRepository,
      fetchedSearchResults,
      isSubmitting,
      sideBarState,
      closeSideBar,
      InputTypes,
      selected,
      onSubmit,
      loading,
      values,
      t,
    }
  },
})
</script>
