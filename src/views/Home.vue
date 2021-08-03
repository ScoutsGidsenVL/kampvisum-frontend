<template>
  <div class="home">
    <!-- <HelloWorld /> -->
    <div>
      <!-- <MyName name="ricardo" /> -->
    </div>
    <div class="w-96">
      <CustomInput name="ricardo" label="ricardo" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { HelloWorld, MyName, CustomInput } from 'vue-3-component-library'

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
    MyName,
    CustomInput,
  },
})
</script>
