<template>
  <div class="home">
    <HelloWorld />
    <div>
      <MyName name="ricardo" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { HelloWorld, MyName } from 'vue-3-component-library'

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
    MyName,
  },
})
</script>
