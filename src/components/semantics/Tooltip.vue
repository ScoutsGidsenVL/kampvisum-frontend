<template>
  <div class="custom-tooltip">
    <slot />
    <span class="custom-tooltiptext">{{tip}}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'tooltip',
  props: {
    tip: String
  },
})
</script>

<style scoped>
.custom-tooltip {
  position: relative;
  display: inline-block;
}

.custom-tooltip .custom-tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 150%;
  left: 50%;
  margin-left: -60px;
}

.custom-tooltip .custom-tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black transparent transparent transparent;
}

.custom-tooltip:hover .custom-tooltiptext {
  visibility: visible;
}
</style>
