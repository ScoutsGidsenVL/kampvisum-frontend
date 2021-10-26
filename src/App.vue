<template>
  <div id="app">
    <base-page>
      <div class="sticky top-0 pl-4 py-2 bg-white z-50 border border-lightGray">
        <bread-crumb :home="'/kampvisum-home/'" :router="router" :route="route" />
      </div>
      
      <div class="d-flex">
        <navigation-side-bar class="mr-3" />
        <div class="w-100">
          <page-title class="ml-3" :title="$route.meta.titleKey ? t($route.meta.titleKey) : ''" :homeUrl="$route.meta.homescreen ? $route.meta.homescreen : ''" />
          <router-view />
        </div>
      </div>
    </base-page>
  </div>
</template>

<script lang="ts">
import { BasePage, PageTitle, defineRules, Breadcrumb } from 'vue-3-component-library'
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import router from '@/router'
import NavigationSideBar from './components/sideBars/NavigationSideBar.vue'

export default defineComponent({
  name: 'App',
  components: {
    'base-page': BasePage,
    'page-title': PageTitle,
    'bread-crumb': Breadcrumb,
    NavigationSideBar,
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
  /* #app {
    padding-left: 4rem;
  } */

  body {
    margin: 0 !important;
  }
}
</style>
