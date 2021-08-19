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
        <div class="mt-4">
          <div class="w-100">
            <custom-input :isSubmitting="isSubmitting" :type="InputTypes.TEXT" rules="required" name="name" :label="t('sidebars.kampvisum-sidebar.input-fields.name')" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :isSubmitting="isSubmitting" :type="InputTypes.DATE" rules="required" name="startDate" :label="t('sidebars.kampvisum-sidebar.input-fields.start-date')" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :isSubmitting="isSubmitting" :type="InputTypes.DATE" rules="required" name="endDate" :label="t('sidebars.kampvisum-sidebar.input-fields.end-date')" />
          </div>

          <div v-for="groupSection in groupSections" :key="groupSection.id">
            <p>{{ groupSection.name }} - {{ groupSection.hidden }}</p>
          </div>
        </div>

        <div class="mt-5 py-4 sticky bottom-0 bg-white pl-3" style="margin-left: -20px; margin-right: -20px">
          <custom-button :isSubmitting="isSubmitting" :text="sideBarState.state === 'edit' ? 'Bewerk' : t('sidebars.kampvisum-sidebar.buttons.add')" />
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
import { useI18n } from 'vue-i18n'
import { GroupRepository } from '@/repositories/groupRepository'
import { Section } from '@/serializer/Section'

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
    const groupSections = ref<Section[]>([])

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
        const camp = ref<Camp>(values)

        if (props.sideBarState.state === 'edit') {
          await updateCamp(camp.value)
        } else {
          await postCamp(camp.value)
        }
      })().then(() => {
        closeSideBar()
      })
    }

    const updateCamp = async (data: Camp) => {
      if (data.id) {
        await RepositoryFactory.get(CampRepository)
          .update(data.id, data)
          .then((completed: Camp) => {
            context.emit('actionSuccess', 'UPDATE')
          })
      }
    }

    const postCamp = async (data: Camp) => {
      await RepositoryFactory.get(CampRepository)
        .create(data)
        .then((completed: Camp) => {
          context.emit('actionSuccess', 'POST')
        })
    }

    const getGroupSection = async (groupId: string) => {
      await RepositoryFactory.get(GroupRepository)
        .getGroupSections(groupId)
        .then((results: Section[]) => {
          groupSections.value = results
        })
    }

    getGroupSection(props.selectedGroupId)

    watch(
      () => props.sideBarState,
      (value: sideBarState<any>) => {
        if (value.state === 'edit') {
          resetForm({
            values: value.entity,
          })
        }
      }
    )

    return {
      isSubmitting,
      sideBarState,
      closeSideBar,
      selected,
      onSubmit,
      InputTypes,
      values,
      t,
      groupSections,
    }
  },
})
</script>
