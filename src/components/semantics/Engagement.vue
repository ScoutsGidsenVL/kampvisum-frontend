<template>
  <div v-if="visum.state === VisumStates.SIGNABLE">
    <!-- keuring -->
    <div class="xs:w-100 md:w-80 mt-3">
      <custom-button-small class="w-100" :extraStyle="'w-100'" @click="displayWarning()" :isSubmitting="false" :text="'kamp goedkeuren'">
      </custom-button-small>
    </div>

    <!-- engagement -->
    <div class="md:w-1/3 xs:w-96 bg-lighterGreen mt-3 p-3 shadow-md">
      <h1 class="text-xl mb-0 mt-0">{{t('engagement.title')}}</h1>

      <div class="mt-3 flex gap-2 flex-col">
        <!-- LEADER -->
        <div class="flex gap-2 items-center" :class="!visum.engagement.leaders ? 'opacity-50' : ''">
          <i-empty-check v-if="!visum.engagement.leaders" />
          <i-checked v-else />
          <strong>{{t('engagement.leaders')}}</strong>
          {{ visum.engagement.leaders?.firstName }} {{ visum.engagement.leaders?.lastName }}
        </div>

        <!-- GROUP LEADER -->
        <div class="flex gap-2 items-center" :class="!visum.engagement.groupLeaders ? 'opacity-50' : ''">
          <i-empty-check v-if="!visum.engagement.groupLeaders" />
          <i-checked v-else />
          <strong>{{t('engagement.group-leaders')}}</strong>
          {{ visum.engagement.groupLeaders?.firstName }} {{ visum.engagement.groupLeaders?.lastName }}
        </div>

        <!-- DC -->
        <div class="flex text-grey gap-2 items-center" :class="!visum.engagement.districtCommisioner ? 'opacity-50' : ''">
          <i-empty-check v-if="!visum.engagement.districtCommisioner" />
          <i-checked v-else />
          <strong>{{t('engagement.dc')}}</strong>
          {{ visum.engagement.districtCommisioner?.firstName }} {{ visum.engagement.districtCommisioner?.lastName }}
        </div>
      </div>
    </div>

    <warning
      :title="t('engagement.warning-title') + `${visum.engagement.leaders?.firstName} ${visum.engagement.leaders?.lastName}`"
      :isLoading="isSigning"
      :isDisplayed="isWarningDisplayed"
      :text="t('engagement.warning-text')"
      :leftButton="t('engagement.warning-left-button')"
      :rightButton="t('engagement.warning-right-button')"
      @leftButtonClicked="sign()"
      @rightButtonClicked="hideWarning()"
    />

  </div>
</template>

<script lang="ts">
import { EngagementRepository } from '@/repositories/EngagementRepository'
import { CustomButtonSmall, Warning } from 'vue-3-component-library'
import RepositoryFactory from '@/repositories/repositoryFactory'
import IEmptyCheck from '@/components/icons/IEmptyCheck.vue'
import useGroupAndYears from '@/composable/useGroupAndYears'
import { defineComponent, PropType, toRefs, ref } from 'vue'
import { Visum, VisumStates } from '@/serializer/Visum'
import IChecked from '@/components/icons/IChecked.vue'
import { Engagement } from '@/serializer/Engagement'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'Engagement',
  components: {
    CustomButtonSmall,
    IEmptyCheck,
    IChecked,
    Warning
  },
  props: {
    visum: {
      type: Object as PropType<Visum>,
      required: true,
    },
  },
  setup(props: any) {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    const isWarningDisplayed = ref<boolean>(false)
    const isSigning = ref<boolean>(false)
    const { visum } = toRefs(props)
    const { selectedGroup } = useGroupAndYears()
    const sign = () => {
      isSigning.value = true
      RepositoryFactory.get(EngagementRepository).signVisum(props.visum).then(() => { 
        isSigning.value = false
        hideWarning()
        getEngagementState()
      })
    }

    const getEngagementState = () => {
      RepositoryFactory.get(EngagementRepository)
      .getById(props.visum.engagement.id)
      .then((response: Engagement) => {
        visum.value.engagement = response
      })
    }

    const hideWarning = () => {
      isWarningDisplayed.value = false
    }

    const displayWarning = () => {
      isWarningDisplayed.value = true
    }

    return {
      isSigning,
      isWarningDisplayed,
      displayWarning,
      hideWarning,
      selectedGroup,
      VisumStates,
      visum,
      sign,
      t
    }
  },
})
</script>
