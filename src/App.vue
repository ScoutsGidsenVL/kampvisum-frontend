<template>
  
  <div v-if="isLoggedIn" id="app">
    <!-- DUMMY NEEDS TO GET REMOVED AND IS ONLY FOR STYLING PURPOSES -->
    <scouts-dummy-bar v-show="!checkIfIsMobileSize()" />
    <base-page class="scouts-bar-padding">
      <div>
        <div class="sticky top-0 pl-4 bg-white z-41 border border-lightGray">
          <bread-crumb :isInternetActive="isInternetActive" class="md:px-5 md:mx-3" :home="'/kampvisum-home/'"
            :router="router" :route="route" />
        </div>
        <div class="d-flex">
          <navigation-side-bar class="xs:mr-4 md:mr-0" />
          <div class="w-100 md:px-5 md:mx-3 mt-3">
            <h1 class="pl-3 w-full h1">{{ $route.meta.titleKey ? $t($route.meta.titleKey) : '' }}</h1>
            <router-view :key="$route.path" />
          </div>
        </div>
        <div class="xs:pl-3.5">
          <custom-footer class="bottom-0 w-100 mt-60" />
        </div>
      </div>
    </base-page>
    <notification />
  </div>
  <div v-else class="flex h-screen -mt-40">
    <div class="m-auto">
      <loader color="lightGreen" size="20" :isLoading="true" />
    </div>
  </div>
</template>

<script lang="ts">
import { BasePage, ScoutsDummyBar, defineRules } from 'vue-3-component-library'
import NavigationSideBar from './components/sideBars/NavigationSideBar.vue'
import Breadcrumb from './components/semantics/Breadcrumb.vue'
import Notification from './components/semantics/Notification.vue'
import { useInternetHelper } from './helpers/internetHelper'
import { defineComponent } from 'vue'
import router from '@/router'
import CustomFooter from './components/semantics/CustomFooter.vue'
import { usePhoneHelper } from './helpers/phoneHelper'
import { Loader } from 'vue-3-component-library'
import { isLoggedIn } from './helpers/authHelper'

export default defineComponent({
  name: 'App',
  components: {
    'base-page': BasePage,
    'scouts-dummy-bar': ScoutsDummyBar,
    'bread-crumb': Breadcrumb,
    NavigationSideBar,
    Notification,
    CustomFooter,
    Loader
  },
  setup() {
    const { checkIfInternetActive, isInternetActive } = useInternetHelper()
    checkIfInternetActive()

    defineRules()

    const { checkIfIsMobileSize } = usePhoneHelper()

    return {
      isInternetActive,
      router,
      checkIfIsMobileSize,
      isLoggedIn
    }
  },
})
</script>

<style>
@import url('https://use.typekit.net/frt5hnw.css');

.font-museo {
  font-family: museo-sans, -apple-system, system-ui, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
}

.font-aglet {
  font-family: aglet-slab, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
}

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
