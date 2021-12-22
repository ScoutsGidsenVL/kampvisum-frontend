<template>
  <div>
    <file-item />
    <file-item />
    <div>
      <div class="mt-2">
        <custom-button @click="openLocationCreateSidebar()" class="mt-4" text="+ voeg document(en) toe" />
      </div>
    </div>
  </div>
  <documents-create-sidebar title="Documenten" v-model:sideBarState="createSidebar" @actionSuccess="actionSuccess($event)" />
</template>

<script lang="ts">
import FileItem from './FileItem.vue'
import { defineComponent, ref } from 'vue'
import { CustomButton } from 'vue-3-component-library'
import DocumentsCreateSidebar from '../sideBars/DocumentsCreateSidebar.vue'

export default defineComponent({
  name: 'OverviewFiles',
  components: {
    'file-item': FileItem,
    'custom-button': CustomButton,
    DocumentsCreateSidebar
  },
  setup () {
    // const { value: selectedFile } = useField<any>('file', 'fileSize', {})
    // const selectedFile = ref<any>()

    // const selectFile = (data: any) => {
    //   selectedFile.value = data.target.files[0]
    // }

    const createSidebar = ref<any>({state: 'hide'})

    const openLocationCreateSidebar = (): void => {
      createSidebar.value = {state: 'new'}
    }

    const actionSuccess = (action: string) => {
      if (action === 'POST') {
        console.log('Kamp is succesvol aangemaakt')
      }
      if (action === 'UPDATE') {
        console.log('Kamp is succesvol bewerkt')
      }
      // get locations again to update the data in the map
    }

    return {
      openLocationCreateSidebar,
      createSidebar
    }
  }
})
</script>
