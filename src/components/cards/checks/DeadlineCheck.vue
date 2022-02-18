<template>
  <div style="width: fit-content" class="items-center cursor-pointer flex gap-2.5 py-1">
    <div class="hover-trigger cursor-pointer flex gap-2.5 py-1 items-center">
      <div class="z-20 flex">
        <div class="rounded-full bg-white h-6 w-6 -mr-6"></div>
        <svg v-if="flag.flag" class="fill-current text-green" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.393 7.5l-5.643 5.784-2.644-2.506-1.856 1.858 4.5 4.364 7.5-7.643-1.857-1.857z"
          />
        </svg>
        <i-empty-check v-if="!flag.flag" />
      </div>

      <div class="bg-lightGray -ml-6 z-10 rounded-r-full hover-target">
        <div class="flex gap-2 items-center">
          <tooltip tip="Checked">
            <svg @click="toggle(flag, true)" class="fill-current text-green iconSize" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.393 7.5l-5.643 5.784-2.644-2.506-1.856 1.858 4.5 4.364 7.5-7.643-1.857-1.857z"
              />
            </svg>
          </tooltip>

          <tooltip tip="Leeg">
            <i-empty-check @click="toggle(flag, false)" class="iconSize" />
          </tooltip>
        </div>
      </div>
    </div>
    <p class="ml-2.5">{{ flag.flagParent.label }}</p>
  </div>
</template>

<script lang="ts">
import IEmptyCheck from '@/components/icons/IEmptyCheck.vue'
import Tooltip from '@/components/semantics/Tooltip.vue'
import { Flag } from '@/serializer/Flag'
import { defineComponent, PropType} from 'vue'

export default defineComponent({
  name: 'Check',
  components: {
    Tooltip,
    IEmptyCheck,
  },
  props: {
    flag: {
      type: Object as PropType<Flag>,
      required: true
    },
    isUpdatingFlag: Boolean
  },
  setup(props, { emit }) {
    const toggle = (flag: Flag, state: boolean) => {
      if (!props.isUpdatingFlag) {
        flag.flag = state
        emit('toggle', flag)
      }
    }
    return {
      toggle,
    }
  },
})
</script>

<style lang="scss" scoped>
.hover-trigger .hover-target {
  width: 0px;
  height: 25px;
  transition: 0.5s;
}

.hover-trigger:hover .hover-target {
  width: 75px;
  transition: 0.5s;
  padding-left: 20px;
  .iconSize {
    display: block;
  }
}

.iconSize {
  display: none;
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
