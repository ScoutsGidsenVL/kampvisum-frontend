<template>
  <div @click="toggle(existingLocation)" class="p-3 cursor-pointer shadow-md rounded-md">
    <div class="flex justify-between items-center">
      <h4>
        {{existingLocation.name}}
      </h4>
      <div>
        <input v-model="existingLocation.isChecked" :disabled="!displayCheck" :class="displayCheck ? 'cursor-pointer' : '' " :value="true" type="checkbox" id="checked" name="checked">
      </div>
    </div>

    <div class="my-3" v-for="(location) in existingLocation.locations" :key="location">
      <div class="font-bold">{{ location.name }}</div>
      {{ location.address }}
    </div>
  </div>  
</template>

<script lang="ts">
import { PostLocation } from '@/serializer/PostLocation'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'ExistingLocationItem',
  props: {
    existingLocation: {
      type: Object as PropType<PostLocation>,
      required: true
    },
    displayCheck: {
      type: Boolean,
      default: true
    }
  },
  setup (props) {
    const toggle = (location: PostLocation) => {
      if (props.displayCheck) {
        location.isChecked = !location.isChecked
      }
    }
    return  {
      toggle
    }
  }
})
</script>
