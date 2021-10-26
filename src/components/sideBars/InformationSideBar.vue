<template>
  <div class="bg-lighterGreen z-40" :class="{ 'md:w-1/3 xs:w-11/12 fixed top-0 right-0 h-full': sidebar.state === SidebarState.OPEN, 'w-8 d-flex': sidebar.state === SidebarState.CLOSED }">


      <!-- WHEN CLOSED -->
      <div @click="openSideBar()" class="w-8 h-screen fixed flex-column pt-3 cursor-pointer" :class="{ 'd-none': sidebar.state === SidebarState.OPEN, 'd-flex': sidebar.state === SidebarState.CLOSED }">
        <div class="flex justify-center w-100" >
          <svg class="mt-0.5" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.0754 2.93327C13.1726 -0.974358 6.84097 -0.978243 2.93329 2.92454C-0.974347 6.82743 -0.97828 13.1591 2.92461 17.0667C6.8274 20.9744 13.1591 20.9783 17.0668 17.0754C20.9744 13.1726 20.9783 6.8409 17.0754 2.93327ZM11.3963 16.3455C11.3963 16.4998 11.2712 16.6247 11.117 16.6247H8.88304C8.72884 16.6247 8.60379 16.4998 8.60379 16.3455V8.05243C8.60379 7.89813 8.72884 7.77318 8.88304 7.77318H11.117C11.2712 7.77318 11.3963 7.89808 11.3963 8.05243V16.3455ZM10 6.61427C9.10703 6.61427 8.38047 5.88781 8.38047 4.99477C8.38047 4.10182 9.10699 3.37521 10 3.37521C10.8931 3.37521 11.6196 4.10177 11.6196 4.99477C11.6196 5.88781 10.893 6.61427 10 6.61427Z" fill="#7B8F1C"/>
          </svg>
        </div>
        <div class="h-screen flex flex-wrap justify-center content-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 sticky" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </div>
      </div>
    
    <!-- <div v-if="sidebar.state === SidebarState.OPEN" class="h-full w-full fixed top-0 left-0 overflow-x-hidden bg-black bg-opacity-20 z-40" @click="closeSideBar()"></div> -->

    <div class="h-screen fixed" :class="{ 'd-flex p-4 flex-column': sidebar.state === SidebarState.OPEN, 'd-none': sidebar.state === SidebarState.CLOSED }">
      <div class="w-100 pt-5 flex justify-between cursor-pointer" @click="closeSideBar()">
        <div class="flex gap-3">
          <strong>
            Info
          </strong>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg mt-1" viewBox="0 0 16 16">
          <path
            d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"
          />
        </svg>
      </div>
      <slot />
      <div class="mt-">
        Ga verder met de planning van je kamp. In het Kampvisum vind je alles terug dat je zeker in orde moet brengen.​ 
        <br>
        <br>
        Je bent niet alleen. Kom eens buiten samen volgens de huidige maatregelen om bepaalde zaken samen verder uit te werken. 
        <br>
        <br>
        Of vraag hulp aan de districtcommissarissen bij twijfel. Tip: geef al wat meer aandacht aan spelletjes en inkleding. Als dit nu al klaar is kan je in juni meer tijd vrij maken voor praktische aanpassingen naargelang de maatregelen.
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, watch } from 'vue'

export enum SidebarState {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED'
}

export type Sidebar = {
  state: SidebarState
}

export default defineComponent({
  name: 'InformationSideBar',
  props: {
    sidebar: {
      type: Object as PropType<Sidebar>,
      required: true,
    },
    isOverflowHidden: Boolean
  },
  setup(props, context) {

    const closeSideBar: () => void = () => {
      context.emit('closeSidebar')
    }

    const openSideBar: () => void = () => {
      context.emit('openSidebar')
    }

    watch(props.sidebar, (value: Sidebar) => {
      if (props.isOverflowHidden === true) {
        if (value.state == SidebarState.OPEN) {
          // document.body.classList.add('overflow-hidden')
        } else {
          // document.body.classList.remove('overflow-hidden')
        }
      }
    })

    return {
      closeSideBar,
      SidebarState,
      openSideBar
    }
  }
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
</style>