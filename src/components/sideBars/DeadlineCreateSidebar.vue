<template>
  <div>
    <base-side-bar
      width="max-w-xl"
      :isOverflowHidden="isOverflowHidden"
      :selection="selected"
      :is-display="sideBarState.state !== 'hide'"
      :is-edit="sideBarState.state === 'edit'"
      name="Deadline"
      :title="title"
      @hideSidebar="closeSideBar"
    >
      <form
        id="DeadlineForm"
        ref="formDiv"
        :class="{ 'd-flex': sideBarState.state === 'new' || sideBarState.state === 'edit', 'd-none': sideBarState.state === 'list' }"
        class="flex-col relative overflow-y-scroll h-full px-4 pt-3"
        @submit.prevent="onSubmit"
      >
        <div class="mt-4 flex flex-col gap-3">
          <div class="w-100">
            <custom-input :isSubmitting="isSubmitting" :type="InputTypes.TEXT" rules="required" name="title" label="Titel" />
          </div>

          <div class="w-100">
            <date-field-deadline :isWithRange="false" class="my-2" />
          </div>

          <div class="w-100">
            <custom-input textAreaWidth="w-full" :isSubmitting="isSubmitting" :type="InputTypes.TEXT_AREA" name="info" label="Info" />
          </div>
        </div>

        <!-- <div class="mt-5 pb-5 pt-3 sticky bottom-0 bg-white pl-3" style="margin-left: -20px; margin-right: -20px">
          <custom-button :isSubmitting="isPatching">
            <template v-slot:icon>
              <div class="flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                {{sideBarState.state === 'edit' ? 'Bewerk' : 'Voeg toe'}}
              </div>
            </template>
          </custom-button>
        </div> -->
      </form>
    </base-side-bar>
  </div>
</template>


<script lang="ts">
import { BaseSideBar, sideBarState, InputTypes, CustomButtonSmall, CustomInput, scrollToFirstError, CustomHeader } from 'vue-3-component-library'
import DateFieldDeadline from '@/components/semantics/DateFieldDeadline.vue'
import { computed, defineComponent, PropType, ref, toRefs } from 'vue'
import DeadlineCreateCard from '@/components/cards/DeadlineCreateCard.vue'
import { DeadlineRepository } from '@/repositories/DeadlineRepository'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { CustomDeadline } from '@/serializer/CustomDeadline'
import { useForm, ErrorMessage } from 'vee-validate'
import { Deadline } from '@/serializer/Deadline'
import { Visum } from '@/serializer/Visum'
import { useI18n } from 'vue-i18n'
import useGroupAndYears from '@/composable/useGroupAndYears'

export default defineComponent({
  name: 'CampSideBar',
  components: {
    'custom-button': CustomButtonSmall,
    'custom-header': CustomHeader,
    'base-side-bar': BaseSideBar,
    'custom-input': CustomInput,
    DeadlineCreateCard,
    ErrorMessage,
    DateFieldDeadline,
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
      type: Object as PropType<sideBarState<Visum>>,
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
    selectedGroupId: {
      type: String,
      required: true,
    },
    visum: {
      type: Object as PropType<Visum>,
      required: true,
    },
  },
  emits: ['update:sideBarState', 'actionSuccess'],
  setup(props, context) {
    const selected = computed(() => (props.sideBarState.state === 'list' ? 'BestaandCamp' : 'NieuwCamp'))
    const { resetForm, handleSubmit, validate, values, isSubmitting } = useForm<Visum>()
    const { sideBarState } = toRefs(props)
    const { selectedGroup } = useGroupAndYears()

    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    const closeSideBar = () => {
      context.emit('update:sideBarState', { state: 'hide' })
      resetForm()
    }

    // const onSubmit = async () => {
    //   await validate().then((validation: any) => scrollToFirstError(validation, 'addNewCamp'))
    //   handleSubmit(async (values: Deadline) => {
    //     if (props.sideBarState.state === 'edit') {
    //       await updateDeadline(values)
    //     } else {
    //       await postDeadline(values)
    //     }
    //     closeSideBar()
    //   })()
    // }

    // const updateDeadline = async (data: Deadline) => {
    //   if (data.id) {
    //     await RepositoryFactory.get(DeadlineRepository)
    //       .update(data.id, data)
    //       .then(() => {
    //         context.emit('actionSuccess', 'UPDATE')
    //       })
    //   }
    // }

    // const postDeadline = async (data: Deadline) => {
    //   await RepositoryFactory.get(DeadlineRepository)
    //     .create(data)
    //     .then(() => {
    //       context.emit('actionSuccess', 'POST')
    //     })
    // }

    const items = ref<Array<CustomDeadline>>([{ category: '', label: '' }])

    const addItem = () => {
      items.value.push({ category: '', label: '' })
    }

    const removeItemFromArray = (index: string) => {
      items.value.splice(Number(index), 1)
    }

    return {
      isSubmitting,
      sideBarState,
      closeSideBar,
      selected,
      // onSubmit,
      InputTypes,
      values,
      t,
      addItem,
      items,
      removeItemFromArray,
    }
  },
})
</script>
