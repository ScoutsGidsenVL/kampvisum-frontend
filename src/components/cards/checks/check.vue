<template>
  <div style="width: fit-content" class="cursor-pointer flex gap-2.5 py-1">
    <div @click="toggle()" class="cursor-pointer flex gap-2.5 py-1">
      <div>
        <svg v-if="simpleCheck.value === StatusState.CHECKED" class="fill-current text-green" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.393 7.5l-5.643 5.784-2.644-2.506-1.856 1.858 4.5 4.364 7.5-7.643-1.857-1.857z"/></svg>
        <svg v-if="simpleCheck.value === StatusState.UNCHECKED" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M 12 2 c 5.514 0 10 4.486 10 10 s -4.486 10 -10 10 s -10 -4.486 -10 -10 s 4.486 -10 10 -10 z m 0 -2 c -6.627 0 -12 5.373 -12 12 s 5.373 12 12 12 s 12 -5.373 12 -12 s -5.373 -12 -12 -12 z z"/></svg>
        <svg v-if="simpleCheck.value === StatusState.NOT_APPLICABLE" width="24" height="24" viewBox="0 0 103 103" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="51.5" cy="51.5" r="46" stroke="#DC7700" stroke-width="11"/>
          <line x1="19" y1="51.5" x2="84" y2="51.5" stroke="#DC7700" stroke-width="11"/>
        </svg>
      </div>
      <div>
        <p>
          {{check.checkParent.label}}
        </p>
      </div>
    </div>

    <div class="mt-2">
      <i-info :info="check.checkParent.explanation" />
    </div>
 </div>
</template>

<script lang="ts">
import { SimpleCheckRepository } from '../../../repositories/SimpleCheckRepository'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { Check, CheckDeserializer } from '@/serializer/Check'
import { SimpleCheck } from '@/serializer/SimpleCheck'
import { defineComponent, ref, PropType } from 'vue'
import IInfo from '../../icons/IInfo.vue'

export enum StatusState {
  CHECKED = 'CHECKED',
  UNCHECKED = 'UNCHECKED',
  NOT_APPLICABLE = 'NOT_APPLICABLE'
}

export type Status = {
  state: StatusState
}

export default defineComponent({
  name: 'Check',
  components: {
    IInfo
  },
  props: {
    check: {
      type: Object as PropType<Check>,
      required: true
    },
    isSimpleCheck: Boolean
  },
  setup (props) {
    const simpleCheck = ref<SimpleCheck>(CheckDeserializer(props.check))

    const patchCheck = async (simpleCheck: SimpleCheck) => {
      await RepositoryFactory.get(SimpleCheckRepository)
        .update(simpleCheck.endpoint, simpleCheck)
        .then((p: any) => {
          console.log('PATCH RESPONSE: ', p)
        })
    }

    const toggle = () => {
      if (props.isSimpleCheck) {
        switch (simpleCheck.value.value) {
          case StatusState.UNCHECKED:
            simpleCheck.value.value = StatusState.CHECKED
            break;
          case StatusState.CHECKED:
            simpleCheck.value.value = StatusState.UNCHECKED
            break;
        
          default:
            simpleCheck.value.value = StatusState.UNCHECKED
            break;
        }
      }

      if (!props.isSimpleCheck) {
        switch (simpleCheck.value.value) {
          case StatusState.UNCHECKED:
            simpleCheck.value.value = StatusState.CHECKED
            break;
          case StatusState.CHECKED:
            simpleCheck.value.value = StatusState.NOT_APPLICABLE
            break;
          case StatusState.NOT_APPLICABLE:
            simpleCheck.value.value = StatusState.UNCHECKED
            break;
        
          default:
            simpleCheck.value.value = StatusState.UNCHECKED
            break;
        }
        patchCheck(simpleCheck.value)
      }
    }

    return {
      simpleCheck,
      toggle,
      StatusState
    }
  }
})
</script>
