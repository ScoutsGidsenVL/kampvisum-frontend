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
        id="addNewCamp"
        ref="formDiv"
        :class="{ 'd-flex': sideBarState.state === 'new' || sideBarState.state === 'edit', 'd-none': sideBarState.state === 'list' }"
        class="flex-col relative overflow-y-scroll h-full px-4 pt-3"
        @submit.prevent="onSubmit"
      >
        <div class="mt-4 flex flex-col gap-3">
          <div class="w-100">
            <custom-input :isSubmitting="isSubmitting" :type="InputTypes.TEXT" rules="" name="title" label="Titel" />
          </div>

          <div class="w-100">
            <date-field title="Deadline" :isWithRange="false" />
          </div>

          <div class="w-100">
            <custom-input :isSubmitting="isSubmitting" :type="InputTypes.TEXT" rules="" name="info" label="Info" />
          </div>
        </div>

        <div>
          
          <div class="flex items-center justify-between my-3">
            <h1 class="m-0 text-lg">Checklist</h1>
            <div @click="addItem()" class="underline text-lightGreen cursor-pointer">voeg item toe +</div>
          </div>

          <div class="p-3 bg-lighterGreen">
            Koppel een checklist item aan een categorie of geef zelf een label mee
          </div>

          <div v-for="(item, index) in items" :key="item" class="mt-3">
            <deadline-item-card :index="index" @removeItemFromArray="removeItemFromArray($event)" />
          </div>

        </div>

        <div class="mt-5 py-4 sticky bottom-0 bg-white pl-3" style="margin-left: -20px; margin-right: -20px">
          <custom-button :isSubmitting="isSubmitting" :text="sideBarState.state === 'edit' ? 'Bewerk' : 'Voeg deadline toe'" />
        </div>
      </form>
    </base-side-bar>
  </div>
</template>

<script lang="ts">
import { BaseSideBar, sideBarState, InputTypes, CustomButton, CustomInput, scrollToFirstError, CustomHeader } from 'vue-3-component-library'
import { computed, defineComponent, PropType, ref, toRefs } from 'vue'
import DeadlineItemCard from '@/components/cards/DeadlineItemCard.vue'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { CampRepository } from '@/repositories/campRepository'
import { useForm, ErrorMessage } from 'vee-validate'
import DateField from '@/components/semantics/DateField.vue'
import { Camp } from '../../serializer/Camp'
import { useI18n } from 'vue-i18n'

export interface DeadlineItem {
  categorie: string
  label: string
}

export default defineComponent({
  name: 'CampSideBar',
  components: {
    'custom-button': CustomButton,
    'custom-header': CustomHeader,
    'base-side-bar': BaseSideBar,
    'custom-input': CustomInput,
    DeadlineItemCard,
    ErrorMessage,
    DateField
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
      type: Object as PropType<sideBarState<Camp>>,
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
  },
  emits: ['update:sideBarState', 'actionSuccess'],
  setup(props, context) {
    const selected = computed(() => (props.sideBarState.state === 'list' ? 'BestaandCamp' : 'NieuwCamp'))
    const { resetForm, handleSubmit, validate, values, isSubmitting } = useForm<Camp>()
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
      await validate().then((validation: any) => scrollToFirstError(validation, 'addNewCamp'))
      handleSubmit(async (values: Camp) => {
        if (props.sideBarState.state === 'edit') {
          await updateCamp(values)
        } else {
          await postCamp(values)
        }
        closeSideBar()
      })()
    }

    const updateCamp = async (data: Camp) => {
      if (data.uuid) {
        await RepositoryFactory.get(CampRepository)
          .update(data.uuid, data)
          .then(() => {
            context.emit('actionSuccess', 'UPDATE')
          })
      }
    }

    const postCamp = async (data: Camp) => {
      await RepositoryFactory.get(CampRepository)
        .create(data)
        .then(() => {
          context.emit('actionSuccess', 'POST')
        })
    }

    const items = ref<Array<DeadlineItem>>([{ category: '', label: ''}])

    const addItem = () => {
      items.value.push({category: '', label: ''})
    }

    const removeItemFromArray = (index: string) => {
      console.log('INDEX TO SPLICE: ', index)
      items.value.splice(index, 1);
    }

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
      removeItemFromArray
    }
  },
})
</script>
