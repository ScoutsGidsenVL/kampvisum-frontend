<template>
  <div style="width:fit-content" class="items-center cursor-pointer flex gap-2.5 py-1">
    <div @click="toggle()" class="hover-trigger cursor-pointer flex gap-2.5 py-1 items-center">
      <div class="z-20 flex">
        <div class="rounded-full bg-white h-6 w-6 -mr-6"></div>
        <svg v-if="simpleCheck.value === StatusState.CHECKED" class="fill-current text-green" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.393 7.5l-5.643 5.784-2.644-2.506-1.856 1.858 4.5 4.364 7.5-7.643-1.857-1.857z"/></svg>
        <svg v-if="simpleCheck.value === StatusState.UNCHECKED" width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.99996 18.3333C14.6023 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39762 14.6023 1.66666 9.99996 1.66666C5.39759 1.66666 1.66663 5.39762 1.66663 10C1.66663 14.6024 5.39759 18.3333 9.99996 18.3333Z" stroke="#C63024" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12.5 7.5L7.5 12.5" stroke="#C63024" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7.5 7.5L12.5 12.5" stroke="#C63024" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        <svg v-if="simpleCheck.value === StatusState.NOT_APPLICABLE" width="24" height="24" viewBox="0 0 103 103" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="51.5" cy="51.5" r="46" stroke="#DC7700" stroke-width="11"/>
          <line x1="19" y1="51.5" x2="84" y2="51.5" stroke="#DC7700" stroke-width="11"/>
        </svg>
      </div>

      <div class="bg-lightGray -ml-6 z-10 rounded-r-full hover-target">
        <div class="flex gap-2 items-center">
          <tooltip tip="Checked">
            <svg @click="select(StatusState.CHECKED)"  class="fill-current text-green iconSize" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.393 7.5l-5.643 5.784-2.644-2.506-1.856 1.858 4.5 4.364 7.5-7.643-1.857-1.857z"/></svg>
          </tooltip>
          <tooltip tip="Niet relevant">
            <svg @click="select(StatusState.NOT_APPLICABLE)"  class="iconSize" viewBox="0 0 103 103" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="51.5" cy="51.5" r="46" stroke="#DC7700" stroke-width="11"/>
              <line x1="19" y1="51.5" x2="84" y2="51.5" stroke="#DC7700" stroke-width="11"/>
            </svg>
          </tooltip>
          <tooltip tip="Niet checked">
            <svg @click="select(StatusState.UNCHECKED)" class="iconSize" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.99996 18.3333C14.6023 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39762 14.6023 1.66666 9.99996 1.66666C5.39759 1.66666 1.66663 5.39762 1.66663 10C1.66663 14.6024 5.39759 18.3333 9.99996 18.3333Z" stroke="#C63024" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12.5 7.5L7.5 12.5" stroke="#C63024" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>          
              <path d="M7.5 7.5L12.5 12.5" stroke="#C63024" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </tooltip>
        </div>
      </div>
    </div>
    <div class="ml-3">
      <p>
        {{check.checkParent.label}}
      </p>
    </div>
    <div>
      <i-info :info="check.checkParent.explanation" />
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
    IInfo,
    Tooltip
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
    const { triggerNotification } = useNotification()


    const patchCheck = async (simpleCheck: SimpleCheck) => {
      await RepositoryFactory.get(SimpleCheckRepository)
        .update(simpleCheck.endpoint, simpleCheck)
        .then((p: any) => {
          console.log('PATCH RESPONSE: ', p)
          triggerNotification()
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
    }

    const select = (v: StatusState) => {
      simpleCheck.value.value = v
      patchCheck(simpleCheck.value)
    }

    return {
      simpleCheck,
      StatusState,
      toggle,
      select
    }
  }
})
</script>

<style lang="scss" scoped>
.hover-trigger .hover-target {
    width: 0px;
    height: 25px;
    transition: 0.5s;
}

.hover-trigger:hover .hover-target {
    width: 110px;
    transition: 0.5s;
    padding-left: 20px;
    .iconSize {
      display:block;
    }

}

.iconSize {
  display:none;
  margin-top: 2px;
  width: 21px;
  height: 21px;
}

.iconSize:hover {
  margin-top: 0px;
  width: 24px;
  height: 24px;
}
</style>