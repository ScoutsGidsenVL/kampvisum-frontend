<template>
  <div v-if="info.length > 0" class="cursor-pointer" @click="openInfo()">
    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.8066 2.69995C9.87942 -0.230768 5.13073 -0.233682 2.19997 2.69341C-0.73076 5.62057 -0.73371 10.3693 2.19345 13.3001C5.12055 16.2308 9.86932 16.2337 12.8001 13.3066C15.7308 10.3795 15.7337 5.63068 12.8066 2.69995ZM8.5472 12.7591C8.5472 12.8748 8.45342 12.9685 8.33776 12.9685H6.66228C6.54663 12.9685 6.45285 12.8748 6.45285 12.7591V6.53932C6.45285 6.4236 6.54663 6.32989 6.66228 6.32989H8.33776C8.45342 6.32989 8.5472 6.42356 8.5472 6.53932V12.7591ZM7.50002 5.46071C6.83028 5.46071 6.28536 4.91586 6.28536 4.24608C6.28536 3.57637 6.83024 3.03141 7.50002 3.03141C8.1698 3.03141 8.71469 3.57633 8.71469 4.24608C8.71469 4.91586 8.16973 5.46071 7.50002 5.46071Z" fill="black"/>
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useInfoBarHelper } from '@/helpers/infoBarHelper'

export default defineComponent({
  name: 'IPerson',
  props: {
    info: String
  },
  setup (props: { info: any }) {

    const { setInfo } = useInfoBarHelper()

    const openInfo = () => {
      setInfo(props.info)
      // context.emit('openSidebar')
    }
    return {
      openInfo
    }
  }
})
</script>
