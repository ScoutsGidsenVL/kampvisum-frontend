<template>
  <div>
      <div>
        <div class="flex xs:flex-col md:flex-row md:justify-between bg-gray pl-3 pr-3 border-b-2 border-midGray">
          <div class="flex gap-2 mt-2.5">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <p>Auto</p>
          </div>
          
          <div class="flex xs:justify-between md:justify-start gap-6 mt-3">
            <div class="align-middle flex gap-2 cursor-pointer">
              <p class="align-middle underline text-xs text-darkGray hover:text-black">Download</p>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 stroke-current text-green" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>

            <div class="flex gap-2 cursor-pointer">
              <p class="underline text-xs text-darkGray hover:text-black" >Verwijder</p>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 stroke-current text-red" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FileItem'
})
</script>
