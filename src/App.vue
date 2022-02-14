<template>
  <div id="app">
    <!-- DUMMY NEEDS TO GET REMOVED AND IS ONLY FOR STYLING PURPOSES -->
    <scouts-dummy-bar /> 
    <base-page class="scouts-bar-padding">
      <div class="sticky top-0 pl-4 py-2 bg-white z-40 border border-lightGray">
        <bread-crumb :isInternetActive="isInternetActive" class="md:px-5 md:mx-3" :home="'/kampvisum-home/'" :router="router" :route="route" />
      </div>
      <div class="d-flex">
        <navigation-side-bar class="xs:mr-4 md:mr-0" />
        <div class="w-100 md:px-5 md:mx-3 mt-3">
          <h1 class="ml-3 w-full h1">{{ $route.meta.titleKey ? $t($route.meta.titleKey) : '' }}</h1>
          <router-view />
        </div>
      </div>
    </base-page>
    <notification />
  </div>
</template>

<script lang="ts">
import { BasePage, ScoutsDummyBar, defineRules } from 'vue-3-component-library'
import NavigationSideBar from './components/sideBars/NavigationSideBar.vue'
import Breadcrumb from './components/semantics/Breadcrumb.vue'
import Notification from './components/semantics/Notification.vue'
import { useInternetHelper } from './helpers/internetHelper'
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'

export default defineComponent({
  name: 'App',
  components: {
    'base-page': BasePage,
    'scouts-dummy-bar': ScoutsDummyBar,
    'bread-crumb': Breadcrumb,
    NavigationSideBar,
    Notification,
  },
  setup() {

    const { checkIfInternetActive, isInternetActive } = useInternetHelper()

    const route = useRoute()

    checkIfInternetActive()

    defineRules()

    return {
      isInternetActive,
      router,
      route,
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
