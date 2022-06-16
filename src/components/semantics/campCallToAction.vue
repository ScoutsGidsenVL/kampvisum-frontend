<template>
  <div class="mt-3 md:col-span-2 xs:col-span-1 text-center" style="max-width: 261px">
    <div class="bg-green text-white rounded-sm">
      <h1 class="px-3" :class="(!isdisplayCallToAction) ? 'text-md mb-1 pt-1' : 'text-xl pt-3 mb-3'" >{{t('pages.kampvisum-overview.call-to-action-title')}}</h1>
      
      <div v-if="isdisplayCallToAction || visums.length === 0" v-html="t('pages.kampvisum-overview.call-to-action')" class="px-3 pb-3 text-left"></div>

      <div v-if="visums.length > 0"  @click="toggleIsdisplayCallToAction()" class="text-center border-t py-0.5 cursor-pointer">
        <div style="width:fit-content" class="m-auto" v-if="isdisplayCallToAction">
          <i-chevon-up />
        </div>
        <div style="width:fit-content" class="m-auto" v-if="!isdisplayCallToAction">
          <i-chevon-down />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import IChevonDown from '../icons/IChevonDown.vue'
import IChevonUp from '../icons/IChevonUp.vue'
import useVisum from '@/composable/useVisum'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  components: { IChevonUp, IChevonDown },
  name: 'CallToAction',
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
      visums,
      t,
    }
  },
})
</script>
