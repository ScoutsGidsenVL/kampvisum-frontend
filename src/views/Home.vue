<template>
  <div class="home">
    <div>
      <h1>{{ t('welcome') }}</h1>
    </div>

    <!-- <HelloWorld />
    <div class="w-96">
      <CustomInput name="ricardo" label="ricardo" rules="required" />
    </div>
    <div>
      <Required rules="required" />
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import { HelloWorld, CustomInput, Required, Wow } from 'vue-3-component-library'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'Home',
  components: {
    // HelloWorld,
    // CustomInput,
    // Required,
    // Wow
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
