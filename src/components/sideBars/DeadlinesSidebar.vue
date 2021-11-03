<template>
  <div class="bg-lightGray ml-3 rounded-md" :class="{ 'md:w-96 xs:w-11/12 xs:fixed xs:top-0 xs:right-0 xs:h-full': sidebar.state === SidebarState.OPEN, 'w-8 d-flex': sidebar.state === SidebarState.CLOSED }">
    <!-- WHEN CLOSED -->
    <div @click="openSideBar()" class="w-8 h-screen fixed flex-column pt-3 cursor-pointer" :class="{ 'd-none': sidebar.state === SidebarState.OPEN, 'd-flex': sidebar.state === SidebarState.CLOSED }">
      <div class="flex justify-center items-center w-100 stroke-current text-red" >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 xs:mr-1.5 md:mr-0" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>  
      </div>
      <div class="flex h-screen justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="-mt-80 h-6 w-6 stroke-current text-black" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
      </div>
    </div>
    
    <div class="h-screen" :class="{ 'd-flex p-3 flex-column': sidebar.state === SidebarState.OPEN, 'd-none fixed': sidebar.state === SidebarState.CLOSED }">
      <div class="w-100 flex justify-between cursor-pointer xs:mt-16 md:mt-0" @click="closeSideBar()">
        <div class="flex gap-3">
          <h2>
            Deadlines
          </h2>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-x-lg stroke-current stroke-1 text-black" viewBox="0 0 16 16">
          <path
            d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"
          />
        </svg>
      </div>

      <div class="pt-3">
        <deadline-info-card />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import DeadlineInfoCard from '@/components/cards/DeadlineInfoCard.vue'

export enum SidebarState {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED'
}

export type Sidebar = {
  state: SidebarState
}

export default defineComponent({
  name: 'DeadlinesSideBar',
  components: {
    'deadline-info-card': DeadlineInfoCard
  },
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
