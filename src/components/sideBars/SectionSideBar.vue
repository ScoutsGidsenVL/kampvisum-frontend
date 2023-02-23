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
          <div class="w-100">
            <custom-input :disabled="isSubmitting" :type="InputTypes.TEXT" rules="required" name="name.name" :label="t('pages.settings.sections.sidebar.form.section-name')" />
          </div>

          <label class="mt-4 font-bold">{{ t('pages.settings.sections.sidebar.form.gender') }}</label>

          <div class="flex gap-3">
            <div v-for="option in options" :key="option" class="flex items-center gap-1 mr-0.5">
              <input class="cursor-pointer" type="radio" :id="option.value" :value="option.value" v-model="chosenGender" />
              <label class="cursor-pointer mb-0" :for="option.value">{{ option.label }}</label>
            </div>
          </div>

          <label class="mt-4 font-bold">{{t('pages.settings.sections.sidebar.form.age-group')}}</label>
          <multi-select
            class="mt-2"
            v-if="optionsAgeGroup"
            id="name.ageGroup"
            :object="true"
            track-by="label"
            value-prop="value"
            :options="optionsAgeGroup"
            :value="optionsAgeGroup[0]"
            :canClear="false"
            :canDeselect="false"
            @addSelection="selectedValue($event)"
          />
        </div>

        <div class="mt-5 py-4 sticky bottom-0 bg-white pl-3" style="margin-left: -20px; margin-right: -20px">
          <custom-button :isSubmitting="isSubmitting" :text="sideBarState.state === 'edit' ? t('pages.settings.sections.sidebar.edit') : t('sidebars.kampvisum-sidebar.buttons.add')" />
        </div>
      </form>
    </base-side-bar>
  </div>
</template>

<script lang="ts">
import { BaseSideBar, sideBarState, InputTypes, CustomButtonSmall, CustomInput, scrollToFirstError, CustomHeader } from 'vue-3-component-library'
import { computed, defineComponent, PropType, ref, toRefs, watch } from 'vue'
import { SectionsRepository } from '@/repositories/SectionsRepository'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { GroupRepository } from '@/repositories/groupRepository'
import MultiSelect from '../inputs/MultiSelect.vue'
import { Section } from '@/serializer/Section'
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import useGroupAndYears from '@/composable/useGroupAndYears'

export default defineComponent({
  name: 'SectionSideBar',
  components: {
    'base-side-bar': BaseSideBar,
    'custom-input': CustomInput,
    'custom-button': CustomButtonSmall,
    'custom-header': CustomHeader,
    MultiSelect,
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
    },
  },
  emits: ['update:sideBarState', 'actionSuccess'],
  setup(props, context) {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })
    const options = ref<any>([
      { value: 'M', label: t('pages.settings.sections.sidebar.form.genders.male') },
      { value: 'F', label: t('pages.settings.sections.sidebar.form.genders.female') },
      { value: 'I', label: t('pages.settings.sections.sidebar.form.genders.mix') },
    ])

    const optionsAgeGroup = ref<any>([])

    for (let i = 6; i < 31; i++) {
      optionsAgeGroup.value.push({ value: i, label: `${t('pages.settings.sections.start-age')} ${i} ${t('pages.settings.sections.year')}` })
    }
    
    const chosenAgeGroup = ref<any>({ value: '10', label: 'kapoenen en zeehondjes' })
    const selected = computed(() => (props.sideBarState.state === 'list' ? 'BestaandCamp' : 'NieuwCamp'))
    const initSection = ref<Section>({
        name: {
          id: '',
          name: '',
          ageGroup: '',
        },
      })
    const { resetForm, handleSubmit, validate, values, isSubmitting } = useForm<Section>({
      initialValues: initSection.value
    })
    const { selectedGroup } = useGroupAndYears()
    const groupSections = ref<Section[]>([])
    const { sideBarState } = toRefs(props)
    const isReload = ref<boolean>(false)
    const chosenGender = ref<string>('M')

    const closeSideBar = () => {
      context.emit('update:sideBarState', { state: 'hide' })
      resetGender()
      resetForm({
        values: initSection.value,
      })
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
      section.groupAdminId = selectedGroup.value.groupAdminId
      section.name.gender = chosenGender.value
      section.name.ageGroup = chosenAgeGroup.value.value
      if (props.sideBarState) {
        await RepositoryFactory.get(SectionsRepository)
          .update(selectedGroup.value.groupAdminId, props.sideBarState.entity.id, section)
          .then(() => {
            context.emit('actionSuccess', 'UPDATE')
          })
      }
    }

    const postSection = async (section: Section) => {
      section.groupAdminId = selectedGroup.value.groupAdminId
      section.name.gender = chosenGender.value
      section.name.ageGroup = chosenAgeGroup.value.value

      await RepositoryFactory.get(SectionsRepository)
        .create(selectedGroup.value.groupAdminId, section)
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

    const selectedValue = (event: any) => {
      chosenAgeGroup.value = event
    }

    const resetGender = () => {
      chosenGender.value = 'M'
    }

    getGroupSections(props.selectedGroupId)

    watch(
      () => props.sideBarState,
      (value: sideBarState<any>) => {
        if (value.state === 'edit') {
          chosenGender.value = props.sideBarState.entity.name.gender
          chosenAgeGroup.value = optionsAgeGroup.value.find((x: any) => x.value === Number(props.sideBarState.entity.name.ageGroup))
          const section = ref<Section>({
            name: {
              id: props.sideBarState.entity.name.id,
              name: props.sideBarState.entity.name.name,
              ageGroup: optionsAgeGroup.value.find((x: any) => x.value === Number(props.sideBarState.entity.name.ageGroup)),
            },
          })
          resetForm({
            values: section.value,
          })
        }
      }
    )

    return {
      optionsAgeGroup,
      chosenAgeGroup,
      groupSections,
      isSubmitting,
      sideBarState,
      closeSideBar,
      chosenGender,
      selectedValue,
      InputTypes,
      selected,
      onSubmit,
      isReload,
      options,
      values,
      t,
      selectedGroup,
    }
  },
})
</script>
