<template>
<!-- --------------------------- DESKTOP CHECK DESIGN --------------------------- -->
<div v-if="!checkIfIsMobileSize()">
  <div style="width: fit-content" class="items-center cursor-pointer flex gap-2.5 py-1">
    <div @click="toggle()" class="desktop-hover-trigger cursor-pointer flex gap-2.5 py-1 items-center">
      <div class="z-20 flex">
        <div class="rounded-full bg-white h-6 w-6 -mr-6"></div>
        <svg v-if="simpleCheck.value === StatusState.CHECKED" class="fill-current text-green" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.393 7.5l-5.643 5.784-2.644-2.506-1.856 1.858 4.5 4.364 7.5-7.643-1.857-1.857z"
          />
        </svg>
        <i-empty-check v-if="simpleCheck.value === StatusState.EMPTY" />
        <svg v-if="simpleCheck.value === StatusState.NOT_APPLICABLE" width="24" height="24" viewBox="0 0 103 103" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="51.5" cy="51.5" r="46" stroke="#DC7700" stroke-width="11" />
          <line x1="19" y1="51.5" x2="84" y2="51.5" stroke="#DC7700" stroke-width="11" />
        </svg>
      </div>

      <div class="bg-lightGray -ml-6 z-10 rounded-r-full desktop-hover-target">
        <div class="flex gap-2 items-center">
          <tooltip :tip="t('checks.ok')">
            <svg @click="select(StatusState.CHECKED)" class="fill-current text-green desktop-iconSize" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.393 7.5l-5.643 5.784-2.644-2.506-1.856 1.858 4.5 4.364 7.5-7.643-1.857-1.857z"
              />
            </svg>
          </tooltip>
          <tooltip :tip="t('checks.not-relevant')">
            <svg @click="select(StatusState.NOT_APPLICABLE)" class="desktop-iconSize" viewBox="0 0 103 103" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="51.5" cy="51.5" r="46" stroke="#DC7700" stroke-width="11" />
              <line x1="19" y1="51.5" x2="84" y2="51.5" stroke="#DC7700" stroke-width="11" />
            </svg>
          </tooltip>
          <tooltip :tip="t('checks.empty')">
            <i-empty-check @click="select(StatusState.EMPTY)" class="desktop-iconSize" />
          </tooltip>
        </div>
      </div>
    </div>
    <div class="ml-3 font-museo text-md font-normal">
      <p class="">
        {{ check.checkParent.label }}
      </p>
    </div>
    <div v-if="check.checkParent.explanation">
      <i-info :info="check.checkParent.explanation" />
    </div>
  </div>
</div>

<!-- --------------------------- MOBILE CHECK DESIGN --------------------------- -->
<div v-if="checkIfIsMobileSize()">
<div class="hover-trigger cursor-pointer hover:bg-lightGray rounded-md p-2 -ml-2 ht2">
  <div>
    <div class="flex items-center">
      <!-- STATE INDICATION -->
      <div>
        <svg v-if="simpleCheck.value === StatusState.CHECKED" class="fill-current text-green" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.393 7.5l-5.643 5.784-2.644-2.506-1.856 1.858 4.5 4.364 7.5-7.643-1.857-1.857z"
          />
        </svg>
        <i-empty-check v-if="simpleCheck.value === StatusState.EMPTY" />
        <svg v-if="simpleCheck.value === StatusState.NOT_APPLICABLE" width="24" height="24" viewBox="0 0 103 103" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="51.5" cy="51.5" r="46" stroke="#DC7700" stroke-width="11" />
          <line x1="19" y1="51.5" x2="84" y2="51.5" stroke="#DC7700" stroke-width="11" />
        </svg>
      </div>
      <!-- LABEL -->
      <div class="ml-3 font-museo text-md check-label">
        <p>
          {{ check.checkParent.label }}
        </p>
      </div>
      <!-- INFO -->
      <div class="ml-1.5">
        <i-info :info="check.checkParent.explanation" />
      </div>
    </div>
    <!-- OPTIONS -->
    <div id="check-hover" class="hover-target mt-1.5 pl-0.5">
      <div @click="select(StatusState.CHECKED)" class="mb-0.5 flex gap-4 underline hover:text-green">
        <svg class="fill-current text-green iconSize" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.393 7.5l-5.643 5.784-2.644-2.506-1.856 1.858 4.5 4.364 7.5-7.643-1.857-1.857z"
          />
        </svg>
        <div>
          {{t('checks.ok')}}
        </div>
      </div>
      <div @click="select(StatusState.NOT_APPLICABLE)" class="mb-0.5 flex gap-4 underline hover:text-green">
        <svg class="iconSize" viewBox="0 0 103 103" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="51.5" cy="51.5" r="46" stroke="#DC7700" stroke-width="11" />
          <line x1="19" y1="51.5" x2="84" y2="51.5" stroke="#DC7700" stroke-width="11" />
        </svg>
        <div>
          {{t('checks.not-relevant')}}
        </div>
      </div>
      <div @click="select(StatusState.EMPTY)" class=" mb-0.5 flex gap-4 underline hover:text-green">
      <i-empty-check class="iconSize" />
      <div>
          {{t('checks.empty')}}
      </div>
      </div>
    </div>
  </div>
  </div>
</div>
</template>

<script lang="ts">
import { SimpleCheckRepository } from '../../../repositories/SimpleCheckRepository'
import { useNotification } from '../../../composable/useNotification'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { Check, CheckDeserializer } from '@/serializer/Check'
import Tooltip from '@/components/semantics/Tooltip.vue'
import { SimpleCheck } from '@/serializer/SimpleCheck'
import { defineComponent, ref, PropType } from 'vue'
import IInfo from '../../icons/IInfo.vue'
import IEmptyCheck from '@/components/icons/IEmptyCheck.vue'
import { useI18n } from 'vue-i18n'
import { usePhoneHelper } from '@/helpers/phoneHelper'
import useGroupAndYears from '@/composable/useGroupAndYears'

export enum StatusState {
  CHECKED = 'CHECKED',
  EMPTY = 'EMPTY',
  NOT_APPLICABLE = 'NOT_APPLICABLE',
}

export type Status = {
  state: StatusState
}

export default defineComponent({
  name: 'Check',
  components: {
    IInfo,
    Tooltip,
    IEmptyCheck,
  },
  props: {
    check: {
      type: Object as PropType<Check>,
      required: true,
    },
    isSimpleCheck: Boolean,
  },
  setup(props) {
    const { selectedGroup } = useGroupAndYears()
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })
    
    const simpleCheck = ref<SimpleCheck>(CheckDeserializer(props.check))
    const { triggerNotification } = useNotification()

    const patchCheck = async (simpleCheck: SimpleCheck) => {
      await RepositoryFactory.get(SimpleCheckRepository)
        .update(selectedGroup.value.groupAdminId, simpleCheck.endpoint, simpleCheck)
        .then(() => {
          triggerNotification(t('checks.notification-updated'))
        })
    }

    const toggle = () => {
      if (props.isSimpleCheck) {
        switch (simpleCheck.value.value) {
          case StatusState.EMPTY:
            simpleCheck.value.value = StatusState.CHECKED
            break
          case StatusState.CHECKED:
            simpleCheck.value.value = StatusState.EMPTY
            break
          default:
            simpleCheck.value.value = StatusState.EMPTY
            break
        }
      }
    }

    const { checkIfIsMobileSize } = usePhoneHelper()


    const select = (v: StatusState) => {
      simpleCheck.value.value = v
      patchCheck(simpleCheck.value)
      if (checkIfIsMobileSize()) { 
        // @ts-ignore
        document.getElementById("check-hover").style.display = "none"
      }
    }

    return {
      checkIfIsMobileSize,
      simpleCheck,
      StatusState,
      toggle,
      select,
      t
    }
  },
})
</script>

<style lang="scss" scoped>
.hover-trigger .hover-target {
  display: none;
}

.hover-trigger:hover .hover-target {
  display: block;
}

.hover-trigger:hover .check-label {
  font-weight: bold;
}

.ht2:hover {
  border-left: 5px solid black;
}

.iconSize {
  margin-top: 2px;
  width: 19px;
  height: 19px;
}

.check-label {
  font-weight: normal;
}

// -----------

.desktop-hover-trigger .desktop-hover-target {
  width: 0px;
  height: 25px;
  transition: 0.5s;
}

.desktop-hover-trigger:hover .desktop-hover-target {
  width: 110px;
  transition: 0.5s;
  padding-left: 20px;
  .desktop-iconSize {
    display: block;
  }
}

.desktop-iconSize {
  display: none;
  margin-top: 2px;
  width: 21px;
  height: 21px;
}

.desktop-iconSize:hover {
  margin-top: 0px;
  width: 24px;
  height: 24px;
}
</style>
