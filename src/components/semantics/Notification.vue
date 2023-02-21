<template>
<transition name="fade">
  <div v-if="isDisplayingNotification" class="fixed xs:mx-3 xs:top-3 md:bottom-10 md:right-10 z-50 rounded-lg text-white p-3" :style="'background-color: ' + color">
    {{ message }}
  </div>
</transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useNotification } from '../../composable/useNotification'

export default defineComponent({
  name: 'Notification',
  setup () {
    const { isDisplayingNotification, message, color } = useNotification()
    return {
      isDisplayingNotification,
      message,
      color
    }
  }
})
</script>

<style scoped>
.fade-enter-to, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
