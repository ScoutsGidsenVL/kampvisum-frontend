<template>
  <div id="app" class="pb-10">
    <base-page>
      <div v-if="$route.meta.titleKey" class="container mt-8 mb-4 pt-2">
        <page-title :title="t($route.meta.titleKey)" :homeUrl="$route.meta.homescreen" />
        <router-view />
      </div>
    </base-page>
  </div>
</template>

<script lang="ts">
import { BasePage, PageTitle } from 'vue-3-component-library'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { defineRules } from '@/veeValidate/rules'

export default defineComponent({
  name: 'App',
  components: {
    'base-page': BasePage,
    'page-title': PageTitle,
  },
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    defineRules()

    return { t }
  },
})
</script>

<style scoped>
@media (min-width: 992px) {
  #app {
    padding-left: 4rem;
  }
}
</style>
