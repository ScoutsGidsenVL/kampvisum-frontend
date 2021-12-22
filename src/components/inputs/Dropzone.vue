<template>
  <div class="flex flex-col w-full">
    <div
      ref="dropzoneDiv"
      class="bg-white w-full h-75-screen bg-white inline-block border-dashed border-4 border-black rounded p-5 cursor-pointer"
      :class="{
        'flex  justify-center items-center cursor-pointer': fileCount === 0,
        'justify-items-center grid grid-cols-1 md:grid-cols-2 place-content-start gap-4 ':
          fileCount !== 0,
      }"
    >
      <div
        v-show="fileCount === 0"
        class="inline-block w-9/12 text-center"
        @click="() => dropzoneDiv && dropzoneDiv.click()"
      >
        <span class="w-full inline-block mb-2">
          <svg
            width="27"
            height="33"
            viewBox="0 0 27 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="inline-block"
          >
            <path
              d="M16.875 0H3.375C1.51875 0 0.0168754 1.485 0.0168754 3.3L0 29.7C0 31.515 1.50187 33 3.35812 33H23.625C25.4813 33 27 31.515 27 29.7V9.9L16.875 0ZM20.25 26.4H6.75V23.1H20.25V26.4ZM20.25 19.8H6.75V16.5H20.25V19.8ZM15.1875 11.55V2.475L24.4688 11.55H15.1875Z"
              fill="#74D7F4"
              fill-opacity="0.7"
            />
          </svg>
        </span>
        <span class="text-xs text-black">
          Drag your documents here, or browse for documents manually.
        </span>
      </div>
    </div>
    <button
      v-if="doUpload"
      type="button"
      class="py-2 mt-3 px-4 w-full bg-black text-white font-semibold text-center shadow-sm hover:shadow-xl disabled:opacity-50"
      tabindex="-1"
      :disabled="fileCount === 0"
      @click="doUpload"
    >
      BESTANDEN UPLOADEN
      <!-- {{ $tm('upload.button') }} -->
    </button>
  </div>
  <!-- Template for the preview of files -->
  <div class="hidden">
    <div
      ref="dropzonePreviewDiv"
      class="dz-preview dz-file-preview w-28 mi-h-28 flex flex-col justify-center items-center hover:bg-gray p-3 rounded relative"
    >
      <a
        data-dz-remove
        class="cursor-pointer absolute flex justify-center items-center top-2 right-2 bg-black rounded-full w-6 h-6 shadow hover:shadow-xl"
      >
        <svg
          width="9"
          height="11"
          viewBox="0 0 7 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.5 3V8H1.5V3H5.5ZM4.75 0H2.25L1.75 0.5H0V1.5H7V0.5H5.25L4.75 0ZM6.5 2H0.5V8C0.5 8.55 0.95 9 1.5 9H5.5C6.05 9 6.5 8.55 6.5 8V2Z"
            fill="white"
          />
        </svg>
      </a>
      <svg
        width="32"
        height="39"
        viewBox="0 0 32 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M31 35.7749C31 36.9828 29.9722 38 28.7516 38H3.24839C2.02784 38 1 36.9828 1 35.7749V3.22509C1 2.01718 2.02784 1 3.24839 1H24.5118L31 7.42096V35.7749Z"
          fill="white"
          stroke="#BFC5E0"
          stroke-miterlimit="10"
        />
      </svg>

      <div class="dz-filename text-black font-body text-sm mt-3 w-full">
        <span
          class="inline-block w-full text-center break-words"
          data-dz-name
        ></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { inject, onMounted, ref, defineComponent, PropType, watch } from 'vue'
  import { progressType, useUpload } from '../../composable/useUpload'
  import Dropzone from 'dropzone'

  export default defineComponent({
    name: 'Upload',
    components: {
    },
    props: {
      progress: {
        type: [String, Number, Object] as PropType<progressType>,
        require: false,
        default: undefined,
      },
    },
    emits: ['update:progress'],
    setup({}, { emit }) {
      const dropzoneDiv = ref<HTMLDivElement | undefined>(undefined)
      const dropzonePreviewDiv = ref<HTMLDivElement | undefined>(undefined)
      // const auth = inject<authPluginType | undefined>('Auth')
      const { uploadIsComplete } = useUpload()
      const uploading = ref<boolean>(false)
      const doUpload = ref<() => void | undefined>()
      const fileCount = ref<number>(0)

      onMounted(async () => {
        if (dropzoneDiv.value && dropzonePreviewDiv) {
          const myDropzone = new Dropzone(dropzoneDiv.value, {
            url: 'backendUrl' + '/upload',
            headers: {},
            autoProcessQueue: false,
            acceptedFiles: 'application/pdf,.csv',
            previewTemplate: dropzonePreviewDiv.value?.outerHTML,
            uploadMultiple: true,
            parallelUploads: 99,
            maxFiles: 99,
          })

          myDropzone.on('totaluploadprogress', (progressDropzone: any) => {
            const progress: progressType = {
              status: 'inProgress',
              progress: Math.round(progressDropzone),
              successFiles: 0,
              errorFiles: 0,
            }

            uploading.value && emit('update:progress', progress)
          })

          const updateFileCount = () => {
            if (myDropzone) {
              fileCount.value = myDropzone?.files.length
            }
          }

          myDropzone.on('addedfile', (value: any) => {
            updateFileCount()
          })

          myDropzone.on('removedfile', (value: any) => {
            updateFileCount()
          })

          myDropzone.on(
            'completemultiple',
            (files: { status: 'error' | 'success' }[]) => {
              uploading.value = false
              myDropzone.removeAllFiles()

              const progress: progressType = {
                status: 'success',
                progress: 0,
                successFiles: 0,
                errorFiles: 0,
              }

              files.forEach((file: { status: 'error' | 'success' }) => {
                if (file.status === 'error') {
                  progress.status = 'hasError'
                  progress.errorFiles = progress.errorFiles + 1
                }

                if (file.status === 'success') {
                  progress.status = 'success'
                  progress.successFiles = progress.successFiles + 1
                }
              })
              emit('update:progress', progress)
              uploadIsComplete()
            }
          )

          doUpload.value = () => {
            uploading.value = true
            myDropzone.processQueue()
          }
        }
      })

      return {
        doUpload,
        fileCount,
        dropzoneDiv,
        dropzonePreviewDiv,
      }
    },
  })
</script>
<style scoped>
  .dz-preview a {
    display: none;
  }
  .dz-preview:hover a {
    display: flex;
  }
</style>
