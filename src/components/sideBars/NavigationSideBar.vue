<template>
  <div class=" w-auto h-screen z-40">
    <div class="d-flex h-screen" :class="{ 'md:w-96 xs:w-100': sidebar.state === SidebarState.OPEN, 'w-0': sidebar.state === SidebarState.CLOSED }">
      <div class="fixed d-flex" :class="{ 'md:w-96 xs:w-100': sidebar.state === SidebarState.OPEN, 'w-0': sidebar.state === SidebarState.CLOSED }">
        <div class="w-100 border-r-2 border-lightGray flex-column bg-gray h-screen px-4" :class="{ 'd-none': sidebar.state === SidebarState.CLOSED, 'd-flex': sidebar.state === SidebarState.OPEN }">
          
          <div class="mt-4 d-flex justify-between mb-3">
            <svg width="47" height="36" viewBox="0 0 32 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.6099 0.437012L3.08984 24.2465H28.4577L11.802 0.437012" stroke="black" stroke-width="3" stroke-miterlimit="10"/>
              <path d="M10.8374 24.2466L15.7814 17.1641L20.4238 24.2466H10.8374Z" fill="#231F20" stroke="#231F20" stroke-miterlimit="10"/>
              <path d="M0 24.2466H32" stroke="#231F20" stroke-width="3" stroke-miterlimit="10"/>
            </svg>
            <h1 class="text-2xl mt-1.5">Kampkaft</h1>
          </div>

          <div class="top-44 w-auto">
            <navigation-item text="Jonggivers" />
            <navigation-item text="Jonggivers" />
            <navigation-item text="Jonggivers" />
            <navigation-item text="Jonggivers" />
          </div>
        </div>
        
        <!-- SMALL TOGGLE BAR -->
        <div @click="toggleSideBar()" class="w-6 bg-lightGray h-screen flex flex-wrap justify-center content-center cursor-pointer">
          <svg v-if="sidebar.state === SidebarState.CLOSED" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-current text-black" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-current text-black" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Sidebar, SidebarState } from './InformationSideBar.vue'
import NavigationItem from './NavigationItem.vue'

export default defineComponent({
  components: { NavigationItem },
  name: 'NavigationSideBar',
  setup() {

    const sidebar = ref<Sidebar>({ state: SidebarState.CLOSED })

    const toggleSideBar: () => void = () => {
      if (sidebar.value.state === SidebarState.OPEN) {
        sidebar.value.state = SidebarState.CLOSED
        // document.body.classList.remove('overflow-hidden')
        return;
      }
      if (sidebar.value.state === SidebarState.CLOSED) {
        sidebar.value.state = SidebarState.OPEN
        // document.body.classList.add('overflow-hidden')
        return;
      }
    }

    return {
      toggleSideBar,
      sidebar,
      SidebarState
    }
  }
})
</script>
