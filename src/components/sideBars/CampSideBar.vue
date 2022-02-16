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

          <div v-if="sideBarState.state !== 'edit'" class="w-100 mt-4">
            <!-- <span class="font-bold">
              Camp Type
            </span> -->
            <div>
              <input class="cursor-pointer mr-2" id="inter" name="inter" v-model="isInternational" type="checkbox">
              <label class="cursor-pointer" for="inter">Internationaal kamp</label>
            </div>

            <multi-select
              class="mt-2"
              v-if="campTypes.length > 0 && !isReload"
              id="campType"
              :object="true"
              placeholder="Kies een kamp type"
              track-by="label"
              value-prop="id"
              :options="campTypes"
              :canClear="false"
              :canDeselect="true"
              @addSelection="selectedValue($event)"
            />
          </div>

          <div v-if="sideBarState.state !== 'hide'">
            <custom-header text="Takken die meegaan" type="h3" />

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
import { BaseSideBar, sideBarState, InputTypes, CustomButton, CustomInput, scrollToFirstError, CustomHeader } from 'vue-3-component-library'
import { Section, SectionObjectsToSectionStrings } from '@/serializer/Section'
import { computed, defineComponent, PropType, ref, toRefs, watch } from 'vue'
import { CampTypeRepository } from '@/repositories/CampTypeRepository'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { GroupRepository } from '@/repositories/groupRepository'
import { CampRepository } from '@/repositories/campRepository'
import { useForm, useField, ErrorMessage } from 'vee-validate'
import MultiSelect from '../inputs/MultiSelect.vue'
import { CampType } from '@/serializer/CampType'
import { Camp } from '../../serializer/Camp'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'CampSideBar',
  components: {
    'base-side-bar': BaseSideBar,
    'custom-input': CustomInput,
    'custom-button': CustomButton,
    'custom-header': CustomHeader,
    ErrorMessage,
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
    const { resetForm, handleSubmit, validate, values, isSubmitting } = useForm<Camp>()
    const { sideBarState } = toRefs(props)
    const groupSections = ref<Section[]>([])
    const campTypes = ref<CampType[]>([])
    const campTypesOriginal = ref<CampType[]>([])
    const isInternational = ref<boolean>(false)
    const isReload = ref<boolean>(false)

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
      isInternational.value = false
      selectedGroupSections.value = []
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
      if (data.id && props.sideBarState) {
        await RepositoryFactory.get(CampRepository)
          .update(props.sideBarState.entity.id, data)
          .then(() => {
            context.emit('actionSuccess', 'UPDATE')
          })
      }
    }

    const postCamp = async (data: Camp) => {
      data.campType = selectedCampType.value
      await RepositoryFactory.get(CampRepository)
        .create(data)
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

    const getCampTypes = async () => {
      await RepositoryFactory.get(CampTypeRepository)
      .getArray()
      .then((results: CampType[]) => {
          campTypesOriginal.value = results
          filterOutCampTypes()
        })
    }

    const selectedCampType = ref<CampType>()

    const selectedValue = (event: any) => {
      selectedCampType.value = event
    }

    const filterOutCampTypes = () => {
      isReload.value = true
      if (isInternational.value) {
        campTypes.value = campTypesOriginal.value.filter((x: CampType) => x.isBase === false)
      } else {
        campTypes.value = campTypesOriginal.value.filter((x: CampType) => x.isBase === true)
      }

      selectedCampType.value = campTypes.value[0]

      setTimeout(() => {
        isReload.value = false
      }, 1)
    }

    getGroupSections(props.selectedGroupId)
    getCampTypes()

    watch(
      () => props.selectedGroupId,
      () => {
        getGroupSections(props.selectedGroupId)
      }
    )

    watch(
      () => props.sideBarState,
      (value: sideBarState<any>) => {
        if (value.state === 'edit') {
          const camp = ref<Camp>({
            id: value.entity.camp.id,
            name: value.entity.camp.name,
            endDate: value.entity.camp.endDate,
            startDate: value.entity.camp.startDate,
            sections: value.entity.camp.sections,
          })
          camp.value.sections = SectionObjectsToSectionStrings(value.entity.camp.sections)
          selectedGroupSections.value = SectionObjectsToSectionStrings(value.entity.camp.sections)

          resetForm({
            values: camp.value,
          })

          setTimeout(
            () => {
              selectedGroupSections.value.forEach((s: any) => {
                // @ts-ignore
                document.getElementById('checkbox-'+s).checked = true;
              });
            }, 50
          )
        }
      }
    )

    watch(() => isInternational.value, () => {
      filterOutCampTypes()
    })

    return {
      selectedGroupSections,
      isInternational,
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
    }
  },
})
</script>
