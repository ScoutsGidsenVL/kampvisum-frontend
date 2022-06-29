<template>
  <div class="bg-lighterGreen md:z-20 md:mt-3 -mb-60" :class="{ 'md:w-99 xs:w-full xs:fixed xs:top-0 xs:right-0 xs:h-full': sidebar.state === SidebarState.OPEN, 'w-8 d-flex': sidebar.state === SidebarState.CLOSED, 'xs:z-50': sidebar.state === SidebarState.OPEN}">
    <!-- WHEN CLOSED -->
    <div
      @click="openSideBar()"
      class="w-8 h-screen-90 fixed flex-column pt-7 cursor-pointer top-custom"
      :class="{ 'd-none': sidebar.state === SidebarState.OPEN, 'd-flex': sidebar.state === SidebarState.CLOSED }"
    >
      <div class="flex justify-center w-100">
        <svg style="margin-top: 10px; margin-left: 4px" class="mr-1" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M17.0754 2.93327C13.1726 -0.974358 6.84097 -0.978243 2.93329 2.92454C-0.974347 6.82743 -0.97828 13.1591 2.92461 17.0667C6.8274 20.9744 13.1591 20.9783 17.0668 17.0754C20.9744 13.1726 20.9783 6.8409 17.0754 2.93327ZM11.3963 16.3455C11.3963 16.4998 11.2712 16.6247 11.117 16.6247H8.88304C8.72884 16.6247 8.60379 16.4998 8.60379 16.3455V8.05243C8.60379 7.89813 8.72884 7.77318 8.88304 7.77318H11.117C11.2712 7.77318 11.3963 7.89808 11.3963 8.05243V16.3455ZM10 6.61427C9.10703 6.61427 8.38047 5.88781 8.38047 4.99477C8.38047 4.10182 9.10699 3.37521 10 3.37521C10.8931 3.37521 11.6196 4.10177 11.6196 4.99477C11.6196 5.88781 10.893 6.61427 10 6.61427Z"
            fill="#7B8F1C"
          />
        </svg>
      </div>
      <div class="h-screen flex flex-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 sticky mt-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
      </div>
    </div>

    <div class="h-screen" :class="{ 'd-flex xs:w-98 md:w-99 p-3 xs:mt-4 md:mt-0 md:top-56 flex-column': sidebar.state === SidebarState.OPEN, 'd-none': sidebar.state === SidebarState.CLOSED }">
      <div class="md:fixed md:w-98">
        <div class="xs:w-4/5 flex justify-between">
          <div class="flex gap-3">
            <i-info-green :info="'setting the info in the information sidebar and open the information sidebar'" />
            <strong class="text-lg"> Info </strong>
          </div>
          <svg @click="closeSideBar()" xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="cursor-pointer bi bi-x-lg stroke-current stroke-1 text-black" viewBox="0 0 16 16">
            <path
              d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"
            />
          </svg>
        </div>
        <slot />
        <div v-html="info" class="break-words mt-4 text-justify"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { SidebarState, useInfoBarHelper } from '@/helpers/infoBarHelper'
import IInfoGreen from '../icons/IInfoGreen.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'InformationSideBar',
  components: {
    IInfoGreen,
  },
  props: {
    isOverflowHidden: Boolean,
  },
  setup() {
    const { info, setInfo, sidebar } = useInfoBarHelper()

    const closeSideBar: () => void = () => {
      setInfo()
      sidebar.value.state = SidebarState.CLOSED
    }

    const openSideBar: () => void = () => {
      sidebar.value.state = SidebarState.OPEN
    }

    if (info.value) {
      closeSideBar()
    }

    return {
      closeSideBar,
      SidebarState,
      openSideBar,
      sidebar,
      info,
    }
  },
})
</script>

<style scoped>
header {
  background: #f9f9f9 url(/bg-texture-small.jpg) no-repeat;
  background-size: cover;
  box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%);
  display: block;
  position: sticky;
  top: 0;
}

.group-search__title:before {
  animation: backgroundReveal 0s 0s both;
}

.group-search__title:after {
  animation: backgroundReveal 0s 0s both;
}

.group-search__title span {
  animation: fadeIn 0s 0s both;
}

.custom-background {
  background: #f9f9f9 url(/bg-texture-small.jpg);
}
.my-background {
  background-color: red;
}

.top-custom {
  top: 150;
}

.h-screen-90 {
  height: 90vh;
}
</style>
