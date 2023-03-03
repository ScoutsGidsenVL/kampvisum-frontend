<template>
  <div v-if="group" class="shadow-md rounded-md">
    <div @click="toggle()" class="cursor-pointer flex items-center p-3 bg-lighterGreen">
      <!-- TITLE -->
      <div class="w-full flex items-center gap-3">
        <slot name="title-icon" />
        <span class="text-lg font-bold">{{ group.groupId }}</span>
      </div>

      <!-- CHEVONS -->
      <div class="text-right">
        <i-chevon-down v-if="!isMenuOpen" />
        <i-chevon-up v-if="isMenuOpen" />
      </div>
    </div>

    <!-- ITEMS -->
    <div v-show="isMenuOpen">
      <div class="w-full border-b py-2 grid grid-cols-5 gap-4 px-2 font-bold text-lg">
        <div>
          {{ t('dc-overview.name') }}
        </div>
        <div>
          {{ t('dc-overview.dates') }}
        </div>
        <div>
          {{ t('dc-overview.sections') }}
        </div>
        <div>
          {{ t('dc-overview.camp-registration') }}
        </div>
        <div>
          {{ t('dc-overview.camp-status') }}
        </div>
      </div>
      <slot name="data" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import IChevonDown from '@/components/icons/IChevonDown.vue'
import IChevonUp from '@/components/icons/IChevonUp.vue'
import ICalendar from '@/components/icons/ICalendar.vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  components: { IChevonDown, IChevonUp, ICalendar },
  name: 'PassportMenu',
  props: {
    group: {
      type: Object as PropType<{ groupId: string }>
    }
  },
  setup() {
    window.scrollTo({ top: 0, behavior: 'auto' })
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    const isMenuOpen = ref<boolean>(true)

    const toggle = () => {
      isMenuOpen.value = !isMenuOpen.value
    }

    return {
      t,
      toggle,
      isMenuOpen
    }
  }
})
</script>
