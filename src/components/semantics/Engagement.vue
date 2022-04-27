<template>
  <div>
    <!-- SIGNABLE -->
    <div class="xs:w-100 md:w-80 mt-3" v-if="
    (visum.state === VisumStates.SIGNABLE || visum.state === VisumStates.DATA_REQUIRED) &&
    (
      !visum.engagement.leaders && selectedGroup.isSectionLeader ||
      !visum.engagement.groupLeaders && selectedGroup.isGroupLeader ||
      visum.engagement.groupLeaders && selectedGroup.isDistrictCommissioner
    )
    ">
      <custom-button-small class="w-100" :extraStyle="'w-100'" @click="displayWarning()" :isSubmitting="false" :text="t('engagement.approve-camp')">
      </custom-button-small>
    </div>

    <!-- APPROVE FEEDBACK -->
    <div class="xs:w-100 md:w-80 mt-3" v-if="visum.state === VisumStates.FEEDBACK_HANDLED">
      <custom-button-small class="w-100" :extraStyle="'w-100'" @click="displayWarning()" :isSubmitting="false" :text="t('engagement.feedback-handled')">
      </custom-button-small>
    </div>

    <!-- DISAPPROVE -->
    <div class="xs:w-100 md:w-80 mt-3" v-if="visum.state === VisumStates.NOT_SIGNABLE && selectedGroup.isDistrictCommissioner">
      <custom-button-small class="w-100" :extraStyle="'w-100'" @click="displayWarning()" :isSubmitting="false" :text="t('engagement.disapprove-camp')">
      </custom-button-small>
    </div>

    <div class="flex flex-column">
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

      <div class="mt-3 md:w-1/3 xs:w-96">
        <dc-notes :visum="visum" />
      </div>
    </div>
    <warning
      :title="`${user.firstName} ${user.lastName}`"
      :isLoading="isSigning"
      :isDisplayed="isWarningDisplayed"
      :text="warningText()"
      :leftButton="warningButtonLeft()"
      :rightButton="warningButtonRight()"
      @leftButtonClicked="handler()"
      @rightButtonClicked="hideWarning()"
    />

  </div>
</template>

<script lang="ts">
import { EngagementRepository } from '@/repositories/EngagementRepository'
import { CustomButtonSmall, Warning } from 'vue-3-component-library'
import RepositoryFactory from '@/repositories/repositoryFactory'
import {CampRepository} from '@/repositories/campRepository'
import IEmptyCheck from '@/components/icons/IEmptyCheck.vue'
import useGroupAndYears from '@/composable/useGroupAndYears'
import { defineComponent, PropType, toRefs, ref } from 'vue'
import { Visum, VisumStates } from '@/serializer/Visum'
import IChecked from '@/components/icons/IChecked.vue'
import { Engagement } from '@/serializer/Engagement'
import store from '../../store/store'
import DcNotes from './DcNotes.vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'Engagement',
  components: {
    CustomButtonSmall,
    IEmptyCheck,
    IChecked,
    Warning,
    DcNotes
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
    const user = store.getters.user
    const isWarningDisplayed = ref<boolean>(false)
    const isSigning = ref<boolean>(false)
    const { visum } = toRefs(props)
    const { selectedGroup } = useGroupAndYears()

    const sign = () => {
      isSigning.value = true
      if (props.visum.engagement) {
        RepositoryFactory.get(EngagementRepository).signVisum(props.visum.engagement).then(() => { 
          isSigning.value = false
          hideWarning()
          getEngagementState()
        })
      }
    }

    const signAsDc = () => {
      isSigning.value = true
      if (props.visum.engagement) {
        RepositoryFactory.get(CampRepository).patchVisumApprovalGlobal(props.visum.id).then(() => { 
          isSigning.value = false
          hideWarning()
          getEngagementState()
        })
      }
    }

    const disapproval = () => {
      isSigning.value = true
      if (props.visum.engagement) {
        RepositoryFactory.get(CampRepository).patchVisumDisapproval(props.visum.id).then(() => { 
          isSigning.value = false
          hideWarning()
          getEngagementState()
        })
      }
    }

    const handler = () => {
      if (props.visum.engagement.groupLeaders && selectedGroup.value.isDistrictCommissioner) { 
        if (props.visum.state === VisumStates.SIGNABLE || props.visum.state === VisumStates.DATA_REQUIRED) {
          sign()
          signAsDc()
        }
        if (props.visum.state === VisumStates.NOT_SIGNABLE) {
          //DO DISAPPROVE CALL
        }
      } 
      else if (props.visum.state === VisumStates.SIGNABLE || props.visum.state === VisumStates.DATA_REQUIRED) { sign() } 
      if (props.visum.state === VisumStates.FEEDBACK_HANDLED) { 
        handleFeedback()
      }
      if (props.visum.state === VisumStates.NOT_SIGNABLE && selectedGroup.value.isDistrictCommissioner) {
        disapproval()
      }
    }

    const handleFeedback = () => {
      isSigning.value = true
      if (props.visum.id) {
        RepositoryFactory.get(CampRepository).patchVisumHandleFeedbackGlobal(props.visum.id).then(() => { 
          isSigning.value = false
          hideWarning()
          getEngagementState()
        })
      }
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

    const warningText = (): string => {
      if (props.visum.state === VisumStates.NOT_SIGNABLE) {
        return t('engagement.warning-text-dc-disapprove')
      }
      if (props.visum.state === VisumStates.FEEDBACK_HANDLED) {
        return t('engagement.warning-text-feedback-handled')
      }
      if (!props.visum.engagement.leaders) {
        return t('engagement.warning-text-leader')
      }
      if (props.visum.engagement.leaders && !props.visum.engagement.groupLeaders) {
        return t('engagement.warning-text-group-leader')
      }
      if (props.visum.engagement.leaders && props.visum.engagement.groupLeaders) {
        return t('engagement.warning-text-dc')
      }
      return ''
    }

    const warningButtonLeft = (): string => {
      if (props.visum.state === VisumStates.NOT_SIGNABLE) {
        return t('engagement.warning-left-button-dc-disapprove')
      }
      if (props.visum.state === VisumStates.FEEDBACK_HANDLED) {
        return t('engagement.warning-left-button-feedback-handled')
      }
      if (!props.visum.engagement.leaders) {
        return t('engagement.warning-left-button-leader')
      }
      if (props.visum.engagement.leaders && !props.visum.engagement.groupLeaders) {
        return t('engagement.warning-left-button-group-leader')
      }
      if (props.visum.engagement.leaders && props.visum.engagement.groupLeaders) {
        return t('engagement.warning-left-button-dc')
      }
      return ''
    }

    const warningButtonRight = (): string => {
      if (props.visum.state === VisumStates.NOT_SIGNABLE) {
        return t('engagement.warning-right-button-dc-disapprove')
      }
       if (props.visum.state === VisumStates.FEEDBACK_HANDLED) {
        return t('engagement.warning-right-button-feedback-handled')
      }
      if (!props.visum.engagement.leaders) {
        return t('engagement.warning-right-button-leader')
      }
      if (props.visum.engagement.leaders && !props.visum.engagement.groupLeaders) {
        return t('engagement.warning-right-button-group-leader')
      }
      if (props.visum.engagement.leaders && props.visum.engagement.groupLeaders) {
        return t('engagement.warning-right-button-dc')
      }
      return ''
    }

    return {
      isWarningDisplayed,
      warningButtonRight,
      warningButtonLeft,
      displayWarning,
      selectedGroup,
      hideWarning,
      VisumStates,
      warningText,
      isSigning,
      handler,
      visum,
      sign,
      user,
      t,
    }
  },
})
</script>
