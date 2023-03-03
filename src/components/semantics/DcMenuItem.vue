<template>
  <div class="w-full border-b py-2 grid grid-cols-5 gap-4 px-2">
    <div>
      Zomerkamp
    </div>
    <div>
      08 mrt 2023 - 10 mrt 2023
    </div>
    <div>
      kapoenen & kabouters en welpen & jonggivers & givers
    </div>
    <div>
      OP TIJD
    </div>
    <div>
      IN OPBOUW
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  components: {},
  name: 'DcMenuItem',
  setup() {
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
