<template>
  <div class="cursor-pointer shadow-md rounded-md">
    <div @click="toggle()" class="flex items-center p-3 bg-lighterGreen">
      <!-- TITLE -->
      <div class="w-full flex items-center gap-3">
        <slot name="title-icon" />
        <span class="text-lg">{{title}}</span> 
      </div>

      <!-- CHEVONS -->
      <div class="text-right">
        <i-chevon-down  v-if="!isMenuOpen" />
        <i-chevon-up v-if="isMenuOpen" />
      </div>
    </div>

    <!-- ITEMS -->
    <div v-if="isMenuOpen">
      <passport-menu-item>
        <template v-slot:data>
          <slot name="data" />
        </template>
      </passport-menu-item>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import IChevonDown from '@/components/icons/IChevonDown.vue'
import IChevonUp from '@/components/icons/IChevonUp.vue'
import ICalendar from '@/components/icons/ICalendar.vue'
import { useI18n } from 'vue-i18n'
import PassportMenuItem from './PassportMenuItem.vue'

export default defineComponent({
  components: { IChevonDown, IChevonUp, ICalendar, PassportMenuItem},
  name: 'PassportMenu',
  props: {
    title: String
  },
  setup () {
    window.scrollTo({ top: 0, behavior: 'auto' })
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    const isMenuOpen = ref<boolean>(false)

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
