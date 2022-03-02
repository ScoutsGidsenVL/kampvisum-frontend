<template>
  <div>
    <h2 class="font">
      {{ t('pages.settings.deadlines.title') }}
    </h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'DeadlineSettings',
  setup () {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })
    return {
      t
    }
  }
})
</script>
