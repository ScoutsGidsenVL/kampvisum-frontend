<template>
  <div v-if="group" class="shadow-md rounded-md">
    <div @click="toggle()" class="cursor-pointer flex items-center p-3 bg-lighterGreen">
      <!-- TITLE -->
      <div class="w-full flex items-center gap-3">
        <slot name="title-icon" />
        <span class="text-lg font-bold">{{ group.groupAdminId }}</span>
      </div>

      <!-- CHEVONS -->
      <div class="text-right">
        <i-chevon-down v-if="!isMenuOpen" />
        <i-chevon-up v-if="isMenuOpen" />
      </div>
    </div>

    <!-- ITEMS -->
    <div v-show="isMenuOpen">
      <div v-show="!checkIfIsMobileSize()" class="w-full border-b py-2 grid grid-cols-5 gap-4 px-2 font-bold text-lg">
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
      <dc-menu-item v-for="(camp, index) in group?.value" :key="index" :camp="camp"></dc-menu-item>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, PropType } from 'vue'
import IChevonDown from '@/components/icons/IChevonDown.vue'
import IChevonUp from '@/components/icons/IChevonUp.vue'
import { useI18n } from 'vue-i18n'
import { usePhoneHelper } from '@/helpers/phoneHelper'
import DcMenuItem from '@/components/semantics/DcMenuItem.vue'

const props = defineProps({
  group: Object as PropType<any>
})
const isMenuOpen = ref<boolean>(false)
const { checkIfIsMobileSize } = usePhoneHelper()
const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local',
})

window.scrollTo({ top: 0, behavior: 'auto' })

const toggle = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>
