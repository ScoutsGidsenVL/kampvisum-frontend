<template>
  <div class="flex flex-col gap-5" v-if="isForbidden">
    <div class="text-xl text-center">
      {{t('forbidden')}}
    </div>
    <div class="flex justify-center h-screen">
      <img class="h-3/5" src="https://www.scoutsengidsenvlaanderen.be/sites/default/files/images/site403.png" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import { useNotification } from '@/composable/useNotification'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'forbidden',
  setup() {
    const { isForbidden } = useNotification()
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })
    return {
      isForbidden,
      t
    }
  },
})
</script>

