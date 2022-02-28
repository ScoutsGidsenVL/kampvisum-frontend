<template>
  <div>
    <div @click="toggleDrawer()" class="py-2 d-flex justify-between">
      <div>
        <strong @click="navigate()" class="xs:text-xs md:text-md cursor-pointer px-2" :class="highlight ? 'text-white bg-green rounded-full' : ''">
          {{text}}
        </strong>
      </div>
      <div v-if="!link" class="ml-3 cursor-pointer">
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
import { defineComponent, ref, PropType } from 'vue'
import router from '@/router'
import { Visum } from '@/serializer/Visum'
import { useRoute } from 'vue-router'

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
    text: String,
    link: String,
    visum: {
      type: Object as PropType<Visum>,
      required: false,
    },
    highlight: Boolean,
  },
  setup (props) {
    const route = useRoute()
    const drawer = ref<Drawer>({ state: DrawerState.CLOSED})
  
  if (props.visum) {
    if (props.visum.id === route.params.campId) {
      drawer.value.state = DrawerState.OPEN
    } else {
      drawer.value.state = DrawerState.CLOSED
    }
  } else {
      drawer.value.state = DrawerState.CLOSED
  }

    const toggleDrawer = () => {
      if (!props.link) {
        if (drawer.value.state === DrawerState.OPEN) {
          drawer.value.state = DrawerState.CLOSED
          return;
        }
        if (drawer.value.state === DrawerState.CLOSED) {
          drawer.value.state = DrawerState.OPEN
          return;
        }
      }
    }

    const navigate = () => {
      router.push(props.link ? props.link : '')
    }

    return {
      toggleDrawer,
      DrawerState,
      navigate,
      drawer,
      route
    }
  }
})
</script>
