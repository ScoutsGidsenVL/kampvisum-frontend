<template>
  <div id="app" class="pb-10">
    <base-page>
      <div class="container mt-8 mb-4 pt-2">
        <bread-crumb :home="'/kampvisum-home/'" :router="router" :route="route" />
        <page-title :title="$route.meta.titleKey ? t($route.meta.titleKey) : ''" :homeUrl="$route.meta.homescreen ? $route.meta.homescreen : ''" />
        <router-view />
      </div>
    </base-page>
  </div>
</template>

<script lang="ts">
import { BasePage, PageTitle, defineRules, Breadcrumb } from 'vue-3-component-library'
// import BreadCrumb from './components/breadcrumb/Breadcrumb.vue'
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import router from '@/router'

export default defineComponent({
  name: 'App',
  components: {
    'base-page': BasePage,
    'page-title': PageTitle,
    'bread-crumb': Breadcrumb,
  },
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    const route = useRoute()

    defineRules()

    return {
      t,
      route,
      router,
    }
  },
})
</script>

<style scoped>
@import url('https://use.typekit.net/frt5hnw.css');

@media (min-width: 992px) {
  #app {
    padding-left: 4rem;
  }
}
</style>
