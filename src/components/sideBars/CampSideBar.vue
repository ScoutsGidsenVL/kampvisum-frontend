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
      width="max-w-xl"
    >
      <form
        id="addNewCamp"
        ref="formDiv"
        :class="{ 'd-flex': sideBarState.state === 'new' || sideBarState.state === 'edit', 'd-none': sideBarState.state === 'list' }"
        class="flex-col relative overflow-y-scroll h-full px-4 pt-3"
        @submit.prevent="onSubmit"
      >
      <!-- {{sideBarState.entity}} -->
        <div class="mt-4">
          <div class="w-100">
            <custom-input :disabled="isSubmitting" :type="InputTypes.TEXT" rules="required" name="name" :label="t('sidebars.kampvisum-sidebar.input-fields.name')" />
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
import RepositoryFactory from '@/repositories/repositoryFactory'
import { GroupRepository } from '@/repositories/groupRepository'
import { CampRepository } from '@/repositories/campRepository'
import { useForm, useField, ErrorMessage } from 'vee-validate'
import { Camp } from '../../serializer/Camp'
import { useI18n } from 'vue-i18n'
import { Visum } from '@/serializer/Visum'

export default defineComponent({
  name: 'CampSideBar',
  components: {
    'base-side-bar': BaseSideBar,
    'custom-input': CustomInput,
    'custom-button': CustomButton,
    'custom-header': CustomHeader,
    ErrorMessage,
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
    isOverflowHidden: {
      type: Boolean,
      required: false,
      default: true,
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

    getGroupSections(props.selectedGroupId)

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

    return {
      selectedGroupSections,
      groupSections,
      isSubmitting,
      sideBarState,
      closeSideBar,
      InputTypes,
      selected,
      onSubmit,
      values,
      t,
    }
  },
})
</script>
