<template>
  <div v-if="true" class="bg-red p-2 flex items-center gap-3">
    <i-important />
    <div>
      <h1 class="text-md font-light m-0 text-white font-aglet">
        {{t('pages.settings.deadlines.important')}}
      </h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IImportant from '../icons/IImportant.vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'Message',
  components: {
    IImportant,
  },
  setup () {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })
    return { t }
  }
})
</script>
