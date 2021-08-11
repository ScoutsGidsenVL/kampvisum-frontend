<template>
  <div>
    <base-side-bar
      :isOverflowHidden="isOverflowHidden"
      :selection="selected"
      :is-display="sideBarState.state !== 'hide'"
      :is-edit="sideBarState.state === 'edit'"
      name="Camp"
      :title="title"
      :options="options"
      @options="changeSideBar"
      @hideSidebar="closeSideBar"
    >
      <form
        id="addNewCamp"
        ref="formDiv"
        :class="{ 'd-flex': sideBarState.state === 'new' || sideBarState.state === 'edit', 'd-none': sideBarState.state === 'list' }"
        class="flex-col relative overflow-y-scroll h-full px-4 pt-3"
        @submit.prevent="onSubmit"
      >
        <div class="mt-4">
          <div class="w-100">
            <custom-input :isSubmitting="false" :type="InputTypes.TEXT" rules="required" name="name" label="Naam" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :isSubmitting="false" :type="InputTypes.TEXT" rules="required" name="startDate" label="Startdatum" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :isSubmitting="false" :type="InputTypes.TEXT" rules="required" name="endDate" label="Einddatum" />
          </div>
        </div>

        <div class="mt-5 py-4 sticky bottom-0 bg-white pl-3" style="margin-left: -20px; margin-right: -20px">
          <custom-button :isSubmitting="false" :text="sideBarState.state === 'edit' ? 'Bewerk' : 'Voeg toe'" />
        </div>
      </form>
    </base-side-bar>
  </div>
</template>

<script lang="ts">
import { BaseSideBar, sideBarState, option, InputTypes, CustomButton, CustomInput, scrollToFirstError } from 'vue-3-component-library'
import { computed, defineComponent, PropType, ref, toRefs, watch } from 'vue'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { CampRepository } from '@/repositories/campRepository'
import { Camp } from '../../serializer/Camp'
import { useForm } from 'vee-validate'

export default defineComponent({
  name: 'CampSideBar',
  components: {
    'base-side-bar': BaseSideBar,
    'custom-input': CustomInput,
    'custom-button': CustomButton,
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
      type: Object as PropType<sideBarState<any>>,
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
  },
  emits: ['update:sideBarState', 'addCreatedNonMemberToList', 'updateMemberInList'],
  setup(props, context) {
    const selected = computed(() => (props.sideBarState.state === 'list' ? 'BestaandCamp' : 'NieuwCamp'))
    const { resetForm, handleSubmit, validate, values } = useForm<Camp>()
    const { sideBarState } = toRefs(props)

    const options = ref<option[]>([
      { text: 'Nieuw', value: 'Nieuw' },
      { text: 'Uit eerdere aanvragen', value: 'Bestaand' },
    ])

    const closeSideBar = () => {
      context.emit('update:sideBarState', { state: 'hide' })
    }

    const changeSideBar = (options: 'NieuwNonMember' | 'BestaandNonMember') => {
      if (options === 'NieuwNonMember') {
        context.emit('update:sideBarState', { state: 'new' })
      }

      if (options === 'BestaandNonMember') {
        context.emit('update:sideBarState', { state: 'list' })
      }
    }

    const onSubmit = async () => {
      await validate().then((validation: any) => scrollToFirstError(validation, 'addNewCamp'))
      console.log('POST')
      handleSubmit(async (values: Camp) => {
        if (props.sideBarState.state === 'new' || props.sideBarState.state === 'edit') {
          const camp = ref<Camp>({
            name: values.name,
            startDate: values.startDate,
            endDate: values.endDate,
          })
          if (props.sideBarState.state === 'edit') {
            console.log('edit: ', camp.value)
          } else {
            await postCamp(camp.value)
          }
        }
      })()
    }

    const postCamp = async (data: any) => {
      console.log('input: ', data)
      await RepositoryFactory.get(CampRepository)
        .create(data)
        .then((completed: Camp) => {
          resetForm()
          console.log('post response: ', completed)
        })
    }

    watch(sideBarState, (value: sideBarState<any>) => {
      if (value.state === 'edit') {
        console.log('CAMP SIDE BAR EDIT')
      }
    })

    return {
      sideBarState,
      closeSideBar,
      changeSideBar,
      options,
      selected,
      onSubmit,
      InputTypes,
      values,
    }
  },
})
</script>
