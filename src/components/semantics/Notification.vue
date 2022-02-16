<template>
<transition name="fade">
  <div v-if="isDisplayingNotification" class="fixed xs:mx-3 xs:top-3 md:bottom-10 md:right-10 z-50 rounded-lg bg-green text-white p-3">
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
    const { isDisplayingNotification, message } = useNotification()
    return {
      isDisplayingNotification,
      message
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
