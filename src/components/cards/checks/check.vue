<template>
<div class="hover-trigger cursor-pointer hover:bg-lightGray rounded-md p-2 -ml-2 ht2">
  <div>
    <div class="flex">
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
      <div>
        <i-info :info="check.checkParent.explanation" />
      </div>
    </div>
    <!-- OPTIONS -->
    <div class="hover-target">
      <div @click="select(StatusState.CHECKED)" class="flex gap-4 hover:underline">
        <svg class="fill-current text-green iconSize" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.393 7.5l-5.643 5.784-2.644-2.506-1.856 1.858 4.5 4.364 7.5-7.643-1.857-1.857z"
          />
        </svg>
        <div>
          Checked
        </div>
      </div>
      <div @click="select(StatusState.NOT_APPLICABLE)" class="flex gap-4 hover:underline">
        <svg class="iconSize" viewBox="0 0 103 103" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="51.5" cy="51.5" r="46" stroke="#DC7700" stroke-width="11" />
          <line x1="19" y1="51.5" x2="84" y2="51.5" stroke="#DC7700" stroke-width="11" />
        </svg>
        <div>
          Niet relevant
        </div>
      </div>
      <div @click="select(StatusState.EMPTY)" class="flex gap-4 hover:underline">
      <i-empty-check class="iconSize" />
      <div>Leeg</div>
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
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })
    const simpleCheck = ref<SimpleCheck>(CheckDeserializer(props.check))
    const { triggerNotification } = useNotification()

    const patchCheck = async (simpleCheck: SimpleCheck) => {
      await RepositoryFactory.get(SimpleCheckRepository)
        .update(simpleCheck.endpoint, simpleCheck)
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

    const select = (v: StatusState) => {
      simpleCheck.value.value = v
      patchCheck(simpleCheck.value)
    }

    return {
      simpleCheck,
      StatusState,
      toggle,
      select,
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
  width: 24px;
  height: 24px;
}

.check-label {
  font-weight: normal;
}
</style>
