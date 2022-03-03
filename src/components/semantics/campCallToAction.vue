<template>
  <div class="mt-3 col-span-2">
    <div style="width: fit-content" class="bg-green text-white rounded-sm">
      <h1 class="px-3" :class="(!isdisplayCallToAction) ? 'text-md mb-1 pt-1' : 'text-xl pt-3 mb-3'" >{{t('pages.kampvisum-overview.call-to-action-title')}}</h1>
      
      <div v-if="isdisplayCallToAction || visums.length === 0" v-html="t('pages.kampvisum-overview.call-to-action')" class="px-3 pb-3"></div>

      <div v-if="visums.length > 0"  @click="toggleIsdisplayCallToAction()" class="text-center border-t py-0.5 cursor-pointer">
        <div style="width:fit-content" class="m-auto" v-if="isdisplayCallToAction">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
        </div>
        <div style="width:fit-content" class="m-auto" v-if="!isdisplayCallToAction">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref, PropType } from 'vue'
import useVisum from '@/composable/useVisum'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'MemberItem',
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })
    const { visums } = useVisum()
    const isdisplayCallToAction = ref<boolean>(false)
    const  toggleIsdisplayCallToAction = () => {
      isdisplayCallToAction.value = !isdisplayCallToAction.value
    }

    return {
      toggleIsdisplayCallToAction,
      isdisplayCallToAction,
      t,
      visums
    }
  },
})
</script>
