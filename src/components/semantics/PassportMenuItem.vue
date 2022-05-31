<template>
  <div class="px-2 py-3 border-t-2 border-lightGray">
    <slot name="data" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  components: {},
  name: 'PassportMenuItem',
  props: {
    title: String
  },
  setup () {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    return {
      t,
    }
  }
})
</script>
