<template>
  <div class="home">

    <!-- <HelloWorld />

    <div class="w-96">
      <CustomInput name="ricardo" label="ricardo" rules="required" />
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { HelloWorld, CustomInput } from 'vue-3-component-library'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'KampvisumHome',
  components: {
    HelloWorld,
    CustomInput,
  },
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    return { t }
  },
})
</script>
