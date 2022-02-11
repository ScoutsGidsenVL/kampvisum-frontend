<template>
  <div>
    <base-side-bar
      :isOverflowHidden="true"
      :selection="selected"
      :is-display="sideBarState.state !== 'hide'"
      :is-edit="sideBarState.state === 'edit'"
      name="Section"
      :title="title"
      @hideSidebar="closeSideBar"
      width="max-w-xl"
    >
      <form
        id="addNewSection"
        ref="formDiv"
        :class="{ 'd-flex': sideBarState.state === 'new' || sideBarState.state === 'edit', 'd-none': sideBarState.state === 'list' }"
        class="flex-col relative overflow-y-scroll h-full px-4 pt-3"
        @submit.prevent="onSubmit"
      >
        <div class="mt-4">
          <pre>
            {{sideBarState}}
          </pre>        
        </div>

        <div class="mt-5 py-4 sticky bottom-0 bg-white pl-3" style="margin-left: -20px; margin-right: -20px">
          <custom-button :isSubmitting="isSubmitting" :text="sideBarState.state === 'edit' ? 'Bewerk' : t('sidebars.kampvisum-sidebar.buttons.add')" />
        </div>
      </form>
    </base-side-bar>
  </div>
</template>

<script lang="ts">
import { BaseSideBar, sideBarState, InputTypes, CustomButton, CustomInput, scrollToFirstError, CustomHeader } from 'vue-3-component-library'
import { Section, SectionObjectsToSectionStrings } from '@/serializer/Section'
import { computed, defineComponent, PropType, ref, toRefs, watch } from 'vue'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { GroupRepository } from '@/repositories/groupRepository'
import { SectionsRepository } from '@/repositories/SectionsRepository'
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import MultiSelect from '../inputs/MultiSelect.vue'

export default defineComponent({
  name: 'SectionSideBar',
  components: {
    'base-side-bar': BaseSideBar,
    'custom-input': CustomInput,
    'custom-button': CustomButton,
    'custom-header': CustomHeader,
    MultiSelect
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
    selectedGroupId: {
      type: String,
      required: true,
    }
  },
  emits: ['update:sideBarState', 'actionSuccess'],
  setup(props, context) {
    const selected = computed(() => (props.sideBarState.state === 'list' ? 'BestaandCamp' : 'NieuwCamp'))
    const { resetForm, handleSubmit, validate, values, isSubmitting } = useForm<Section>()
    const { sideBarState } = toRefs(props)
    const groupSections = ref<Section[]>([])
    const isReload = ref<boolean>(false)

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
      handleSubmit(async (values: Section) => {
        if (props.sideBarState.state === 'edit') {
          await updateSection(values)
        } else {
          await postSection(values)
        }
        closeSideBar()
      })()
    }

    const updateSection = async (section: Section) => {
      if (section.id && props.sideBarState) {
        await RepositoryFactory.get(SectionsRepository)
          .update(props.sideBarState.entity.id, section)
          .then(() => {
            context.emit('actionSuccess', 'UPDATE')
          })
      }
    }

    const postSection = async (section: Section) => {
      await RepositoryFactory.get(SectionsRepository)
        .create(section)
        .then(() => {
          context.emit('actionSuccess', 'POST')
        })
    }

    const getGroupSections = async (groupId: string) => {
      await RepositoryFactory.get(GroupRepository)
        .getGroupSections(groupId)
        .then((results: Section[]) => {
          groupSections.value = results
        })
    }

    getGroupSections(props.selectedGroupId)

    watch(
      () => props.sideBarState,
      (value: sideBarState<any>) => {
        if (value.state === 'edit') {
          const section = ref<Section>({
          })
          resetForm({
            values: section.value,
          })
        }
      }
    )

    return {
      groupSections,
      isSubmitting,
      sideBarState,
      closeSideBar,
      InputTypes,
      selected,
      onSubmit,
      values,
      t,
      isReload,
    }
  },
})
</script>
