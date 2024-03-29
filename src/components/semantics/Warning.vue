<template>
  <div v-if="isDisplayed" class="h-full w-full fixed top-0 left-0 overflow-x-hidden bg-black bg-opacity-20 z-40">
    <div class="flex h-screen justify-center items-center">
      <div class="align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div v-if="isLoading" class="h-full w-full fixed top-0 left-0 overflow-x-hidden bg-black bg-opacity-20">
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <loader size="10" :isLoading="isLoading" color="white" />
          </div>
        </div>

        <div class="bg-white px-4 pb-4 sm:p-6 sm:pb-4" :class="leftButton || rightButton ? 'pt-5' : 'mt-2'">
          <div class="sm:flex sm:items-start">
            <div :class="title && 'mt-2'" class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-lightRed sm:mx-0 sm:h-10 sm:w-10 mb-5 sm:mb-0">
              <svg class="h-6 w-6 text-red" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div class="text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg text-left leading-6 font-medium text-darkGray" id="modal-title">
                {{ title }}
              </h3>
              <div>
                <p class="text-sm text-left text-darkGray">
                  {{ text }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="leftButton || rightButton" class="bg-gray px-4 py-3 flex sm:flex-row-reverse gap-3 flex-col">
          <custom-button v-if="rightButton" @click="rightButtonClicked()" class="inline-flex justify-center" :extraStyle="'w-32'" :text="rightButton" />
          <custom-button v-if="leftButton" @click="leftButtonClicked()" class="inline-flex justify-center" :extraStyle="'w-32'" :text="leftButton" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { CustomButton, Loader } from 'vue-3-component-library'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Warning',
  components: {
    'custom-button': CustomButton,
    loader: Loader
  },
  props: {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    isDisplayed: {
      type: Boolean,
      required: true
    },
    color: {
      type: String,
      required: false,
      default: 'red'
    },
    leftButton: {
      type: String,
      required: false
    },
    rightButton: {
      type: String,
      required: false
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ['leftButtonClicked', 'rightButtonClicked'],
  setup(props, context) {
    const rightButtonClicked = () => {
      context.emit('rightButtonClicked', true)
    }

    const leftButtonClicked = () => {
      context.emit('leftButtonClicked', true)
    }

    return {
      rightButtonClicked,
      leftButtonClicked
    }
  }
})
</script>
