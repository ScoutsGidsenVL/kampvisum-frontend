<template>
  <div>
    <base-side-bar
      :isOverflowHidden="true"
      :selection="selected"
      :is-display="sideBarState.state !== 'hide'"
      :is-edit="sideBarState.state === 'edit'"
      name="Camp"
      :title="title"
      @hideSidebar="closeSideBar"
      width="max-w-xl"
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
            <custom-input :disabled="isSubmitting" :type="InputTypes.TEXT" rules="required" name="name" :label="t('sidebars.kampvisum-sidebar.input-fields.name')" />
          </div>

          <div v-if="sideBarState.state !== 'hide'" class="w-100 mt-4">
            <div v-for="campType in campTypes" :key="campType">
              <custom-input v-model="selectedCampTypes" :disabled="isSubmitting" :type="InputTypes.CHECK" rules="required" :name="campType.campType" :label="campType.label" />
            </div>
          </div>

          <div v-if="sideBarState.state !== 'hide'">
            <custom-header :text="t('sidebars.kampvisum-sidebar.sections-going')" type="h3" />

            <loader color="lightGreen" size="10" :isLoading="isFetchingGroupSections" />


            <span name="sections">
              <ErrorMessage name="sections" class="text-red text-sm block mt-1 w-80" />
            </span>

            <div v-for="groupSection in groupSections" :key="groupSection.id">
              <custom-input v-model="selectedGroupSections" :disabled="isSubmitting" :type="InputTypes.CHECK" rules="required" :name="groupSection.id" :label="groupSection.name.name" />
            </div>
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
import { BaseSideBar, sideBarState, InputTypes, CustomButtonSmall, CustomInput, scrollToFirstError, CustomHeader, Loader } from 'vue-3-component-library'
import { Section, SectionObjectsToSectionStrings } from '@/serializer/Section'
import { computed, defineComponent, PropType, ref, toRefs, watch } from 'vue'
import { CampTypeRepository } from '@/repositories/CampTypeRepository'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { GroupRepository } from '@/repositories/groupRepository'
import { CampVisumRepository } from '@/repositories/CampVisumRepository'
import { useForm, useField, ErrorMessage } from 'vee-validate'
import MultiSelect from '../inputs/MultiSelect.vue'
import { CampType } from '@/serializer/CampType'
import { useI18n } from 'vue-i18n'
import { Visum } from '@/serializer/Visum'
import useGroupAndYears from '@/composable/useGroupAndYears'

export default defineComponent({
  name: 'CampSideBar',
  components: {
    'base-side-bar': BaseSideBar,
    'custom-input': CustomInput,
    'custom-button': CustomButtonSmall,
    'custom-header': CustomHeader,
    ErrorMessage,
    MultiSelect,
    Loader
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
  emits: ['update:sideBarState', 'actionSuccess', 'navigateTowardsVisumOverview'],
  setup(props, context) {
    const selected = computed(() => (props.sideBarState.state === 'list' ? 'BestaandCamp' : 'NieuwCamp'))
    const { resetForm, handleSubmit, validate, values, isSubmitting } = useForm<Visum>()
    const { sideBarState } = toRefs(props)
    const { selectedGroup } = useGroupAndYears()
    const groupSections = ref<Section[]>([])
    const campTypes = ref<CampType[]>([])
    const isReload = ref<boolean>(false)
    const selectedCampTypes = ref<Array<string>>()
    const { value: selectedGroupSections } = useField('sections', 'minimumOneSection', {
      initialValue: Array<String>(),
    })

    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    const closeSideBar = () => {
      context.emit('update:sideBarState', { state: 'hide' })
      resetForm()
      values.name = ''
      selectedGroupSections.value = []
      selectedCampTypes.value = []
    }

    const onSubmit = async () => {
      await validate().then((validation: any) => scrollToFirstError(validation, 'addNewCamp'))
      handleSubmit(async (values: Visum) => {
        if (props.sideBarState.state === 'edit') {
          await updateCamp(values)
        } else {
          await postCamp(values)
        }
        closeSideBar()
      })()
    }

    const updateCamp = async (data: Visum) => {
      if (data.id && props.sideBarState) {
        data.campTypes = selectedCampTypes.value
        await RepositoryFactory.get(CampVisumRepository)
          .update(selectedGroup.value.groupAdminId, props.sideBarState.entity.id, data)
          .then(() => {
            context.emit('actionSuccess', 'UPDATE')
          })
      }
    }

    const postCamp = async (data: Visum) => {
      data.campTypes = selectedCampTypes.value
      await RepositoryFactory.get(CampVisumRepository)
        .create(selectedGroup.value.groupAdminId, data)
        .then((visum: Visum) => {
          context.emit('actionSuccess', 'POST')
          context.emit('navigateTowardsVisumOverview', visum)
        })
    }

    const isFetchingGroupSections = ref<boolean>(false)

    const getGroupSections = async (groupId: string) => {
      isFetchingGroupSections.value = true
      await RepositoryFactory.get(GroupRepository)
        .getGroupSections(groupId)
        .then((results: Section[]) => {
          groupSections.value = results
          isFetchingGroupSections.value = false
        })
    }

    const getCampTypes = async (groupId: string) => {
      await RepositoryFactory.get(CampTypeRepository)
        .getArray(groupId)
        .then((results: CampType[]) => {
          filterOutCampTypes(results)
        })
    }

    const selectedCampType = ref<CampType>()

    const selectedValue = (event: any) => {
      selectedCampType.value = event
    }

    const filterOutCampTypes = (types: CampType[]) => {
      isReload.value = true
      campTypes.value = types.filter((x: CampType) => x.isBase === false)
      selectedCampType.value = campTypes.value[0]

      setTimeout(() => {
        isReload.value = false
      }, 1)
    }
    
    if (props.selectedGroupId) {
      getGroupSections(props.selectedGroupId)
      getCampTypes(props.selectedGroupId)
    }
    watch(
      () => props.selectedGroupId,
      () => {
        getGroupSections(props.selectedGroupId)
        getCampTypes(props.selectedGroupId)
      }
    )

    watch(
      () => props.sideBarState,
      (value: sideBarState<any>) => {
        if (value.state === 'edit') {
          const visum = ref<Visum>({
            id: value.entity.id,
            groupGroupAdminId: value.entity.groupGroupAdminId,
            groupName: value.entity.groupName,
            year: value.entity.year,
            name: value.entity.name,
            startDate: value.entity.startDate,
            endDate: value.entity.endDate,
            sections: value.entity.sections,
            categorySet: value.entity.categorySet,
            state: value.entity.state
          })
          // selectedCampType.value = value.entity.categorySet.categorySetParent.campType
          visum.value.sections = SectionObjectsToSectionStrings(value.entity.sections)
          selectedGroupSections.value = SectionObjectsToSectionStrings(value.entity.sections)
          selectedCampTypes.value = value.entity.campTypes.map((ct: CampType) => ct.campType)
          resetForm({
            values: visum.value,
          })

          setTimeout(() => {
            selectedCampTypes.value && selectedCampTypes.value.forEach((sc: string) => {
              if (sc !== 'basis') {
                // @ts-ignore
                document.getElementById('checkbox-'+sc).checked = true
              }
            })
            selectedGroupSections.value.forEach((s: any) => {
              // @ts-ignore
              document.getElementById('checkbox-' + s).checked = true
            })
          }, 50)
        }
      }
    )

    return {
      selectedGroupSections,
      selectedCampType,
      groupSections,
      selectedValue,
      isSubmitting,
      sideBarState,
      closeSideBar,
      InputTypes,
      campTypes,
      selected,
      onSubmit,
      isReload,
      values,
      t,
      selectedCampTypes,
      isFetchingGroupSections
    }
  },
})
</script>
