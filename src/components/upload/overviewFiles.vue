<template>
  <div>
    <file-item />
    <file-item />
    <div>
      <div class="mt-2">
        <label style="width: fit-content" class="flex items-center py-2 bg-black text-white rounded-lg shadow-sm tracking-wide border border-blue cursor-pointer hover:text-lightGreen">
          <div class="flex gap-3 items-center px-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4" />
            </svg>
            <span class="text-base leading-normal">Voeg document toe</span>
          </div>            
          <input ref="file" @change="selectFile($event)" type="file" name="file" id="file" class="hidden" />
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import FileItem from './FileItem.vue'
import { defineComponent, ref } from 'vue'
import { CustomButton } from 'vue-3-component-library'

export default defineComponent({
  name: 'OverviewFiles',
  components: {
    'file-item': FileItem,
    'custom-button': CustomButton
  },
  setup () {
    // const { value: selectedFile } = useField<any>('file', 'fileSize', {})
    const selectedFile = ref<any>()

    const selectFile = (data: any) => {
      selectedFile.value = data.target.files[0]
    }

    return {
      selectedFile,
      selectFile
    }
  }
})
</script>
