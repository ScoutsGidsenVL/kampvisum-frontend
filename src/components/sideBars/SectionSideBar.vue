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

          <label class="mt-4 font-bold">{{t('pages.settings.sections.sidebar.form.gender')}}</label>
          
          <div class="flex gap-3">
            <div v-for="option in options" :key="option" class="flex items-center gap-1 mr-0.5">
              <input class="cursor-pointer" type="radio" :id="option.value" :value="option.value" v-model="chosenGender">
              <label class="cursor-pointer mb-0" :for="option.value">{{option.label}}</label>
            </div>
          </div>

          <label class="mt-4 font-bold">Leeftijdsgroep</label>
          <multi-select
            class="mt-2"
            v-if="optionsAgeGroup"
            id="name.ageGroup"
            :object="true"
            placeholder="Leeftijdsgroep"
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
          <custom-button :isSubmitting="isSubmitting" :text="sideBarState.state === 'edit' ? 'Bewerk' : t('sidebars.kampvisum-sidebar.buttons.add')" />
        </div>
      </form>
    </base-side-bar>
  </div>
</template>

<script lang="ts">
import { BaseSideBar, sideBarState, InputTypes, CustomButton, CustomInput, scrollToFirstError, CustomHeader } from 'vue-3-component-library'
import { computed, defineComponent, PropType, ref, toRefs, watch } from 'vue'
import { SectionsRepository } from '@/repositories/SectionsRepository'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { GroupRepository } from '@/repositories/groupRepository'
import MultiSelect from '../inputs/MultiSelect.vue'
import { Section } from '@/serializer/Section'
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import { useNavigation } from '@/router/navigation'

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
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })
    const options = ref<any>([{value: 'M', label: t('pages.settings.sections.sidebar.form.genders.male')}, {value: 'F', label: t('pages.settings.sections.sidebar.form.genders.female')}, {value: 'I', label: 'Mix'}])
    const optionsAgeGroup = ref<any>([
      {value: '10', label: 'kapoenen en zeehondjes'},
      {value: '15', label: 'startleeftijd 7 jaar'},
      {value: '16', label: 'startleeftijd 8 jaar'},
      {value: '17', label: 'startleeftijd 9 jaar'},
      {value: '20', label: 'kabouter en (zee)welp'},
      {value: '25', label: 'startleeftijd 9 jaar'},
      {value: '26', label: 'startleeftijd 10 jaar'},
      {value: '27', label: 'startleeftijd 11 jaar'},
      {value: '30', label: 'jonggivers en scheepsmakkers'},
      {value: '35', label: 'startleeftijd 11 jaar'},
      {value: '36', label: 'startleeftijd 11 jaar'},
      {value: '37', label: 'startleeftijd 11 jaar'},
      {value: '40', label: 'gidsen en (zee)verkenners'},
      {value: '45', label: 'startleeftijd 11 jaar'},
      {value: '46', label: 'startleeftijd 11 jaar'},
      {value: '47', label: 'startleeftijd 11 jaar'},
      {value: '50', label: 'jins en loodsen'},
      {value: '55', label: 'startleeftijd 18 jaar'},
      {value: '60', label: 'leeftijdsgroep ouder dan 18, bv. VIPS (akabe)'},
      {value: '100', label: 'leeftijdsgroep voor leiding, district, gouw, verbond'},
      {value: '999', label: 'onbekende leeftijdsgroep'},
    ])
    const chosenAgeGroup = ref<any>({value: '10', label: 'kapoenen en zeehondjes'})
    const selected = computed(() => (props.sideBarState.state === 'list' ? 'BestaandCamp' : 'NieuwCamp'))
    const { resetForm, handleSubmit, validate, values, isSubmitting } = useForm<Section>()
    const { selectedGroup } = useNavigation()
    const groupSections = ref<Section[]>([])
    const { sideBarState } = toRefs(props)
    const isReload = ref<boolean>(false)
    const chosenGender = ref<string>('M')

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
      section.groupAdminId = selectedGroup.value.groupAdminId
      section.name.gender = chosenGender.value
      section.groupType = selectedGroup.value.type
      section.name.ageGroup = chosenAgeGroup.value.value
      if (props.sideBarState) {
        await RepositoryFactory.get(SectionsRepository)
          .update(props.sideBarState.entity.id, section)
          .then(() => {
            context.emit('actionSuccess', 'UPDATE')
          })
      }
    }

    const postSection = async (section: Section) => {
      section.groupAdminId = selectedGroup.value.groupAdminId
      section.groupType = selectedGroup.value.type
      section.name.gender = chosenGender.value
      section.name.ageGroup = chosenAgeGroup.value.value

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

    const selectedValue = (event: any) => {
      chosenAgeGroup.value = event
    }

    getGroupSections(props.selectedGroupId)

    watch(
      () => props.sideBarState,
      (value: sideBarState<any>) => {
        if (value.state === 'edit') {
          chosenGender.value = props.sideBarState.entity.name.gender
          chosenAgeGroup.value = optionsAgeGroup.value.find((x: any) => x.value === props.sideBarState.entity.name.ageGroup)
          const section = ref<Section>({
            name: {
              name: props.sideBarState.entity.name.name,
              ageGroup: optionsAgeGroup.value.find((x: any) => x.value === props.sideBarState.entity.name.ageGroup)
            }
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
      selectedGroup
    }
  },
})
</script>
