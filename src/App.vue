<template>
  <div id="app">
    <scouts-dummy-bar />
    <base-page class="scouts-bar-padding">
      <div class="sticky top-0 pl-4 py-2 bg-white z-40 border border-lightGray">
        <bread-crumb class="md:px-5 md:mx-3" :home="'/kampvisum-home/'" :router="router" :route="route" />
      </div>
      <div class="d-flex">
        <navigation-side-bar class="mr-3" />
        <div class="w-100 md:px-5 md:mx-3 mt-3">
          <h1 class="ml-3 w-full h1">{{ $route.meta.titleKey ? t($route.meta.titleKey) : '' }}</h1>
          <router-view />
        </div>
      </div>
    </base-page>
  </div>
</template>

<script lang="ts">
import { BasePage, ScoutsDummyBar, defineRules, Breadcrumb } from 'vue-3-component-library'
import NavigationSideBar from './components/sideBars/NavigationSideBar.vue'
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import router from '@/router'

export default defineComponent({
  name: 'App',
  components: {
    'base-page': BasePage,
    'scouts-dummy-bar': ScoutsDummyBar,
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
      router,
      route,
      t,
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

  .scouts-bar-padding {
    padding-left: 66px;
  }
}
</style>
