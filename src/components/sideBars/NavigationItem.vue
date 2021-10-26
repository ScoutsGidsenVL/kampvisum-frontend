<template>
  <div>
    <div class="py-2 d-flex justify-between">
      <div>
        <strong class="xs:text-xs md:text-md">
          {{text}}
        </strong>
      </div>
      <div class="ml-3 cursor-pointer" @click="toggleDrawer()">
        <svg v-if="drawer.state === DrawerState.CLOSED" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
        <svg v-if="drawer.state === DrawerState.OPEN" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
        </svg>
      </div>
    </div>
    <div v-if="drawer.state === DrawerState.OPEN" class="ml-3">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export enum DrawerState {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED'
}

export type Drawer = {
  state: DrawerState
}

export default defineComponent({
  name: 'NavigationItem',
  props: {
    text: String
  },
  setup () {
    const drawer = ref<Drawer>({state: DrawerState.CLOSED})
    const toggleDrawer = () => {
      if (drawer.value.state === DrawerState.OPEN) {
        drawer.value.state = DrawerState.CLOSED
        return;
      }
      if (drawer.value.state === DrawerState.CLOSED) {
        drawer.value.state = DrawerState.OPEN
        return;
      }
    }

    return {
      toggleDrawer,
      DrawerState,
      drawer
    }
  }
})
</script>
