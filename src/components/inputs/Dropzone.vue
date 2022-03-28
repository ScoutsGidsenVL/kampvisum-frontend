<template>
  <div class="flex flex-col pb-2 font-semibold italic">
    <span class="text-sm">
    </span>
  </div>
  <div class="flex flex-col w-full">
    <div
      ref="dropzoneDiv"
      class="bg-white w-full h-75-screen bg-white inline-block border-dashed border-4 border-black rounded cursor-pointer"
      :class="{
        'flex  justify-center items-center cursor-pointer p-3': fileCount === 0,
        'grid grid-cols-1 md:grid-cols-4 place-content-start p-3 gap-4 ':
          fileCount !== 0,
      }"
    >
      <div
        v-show="fileCount === 0"
        class="inline-block w-9/12 text-center"
        @click="() => dropzoneDiv && dropzoneDiv.click()"
      >
        <span class="w-full inline-block mb-2 fill-green">
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
              fill="#7b8f1c"
              fill-opacity="0.7"
            />
          </svg>
        </span>
        <span class="text-xs text-black">
          {{t('checks.document-check.instruction')}}<br>
          {{t('checks.document-check.allowed-files')}}<br>
          Max: {{maxFileize}} MB
        </span>
      </div>
    </div>
    <button
      v-if="doUpload"
      type="button"
      class="py-2 mt-3 px-4 w-full bg-black text-white font-semibold text-center shadow-sm hover:shadow-xl disabled:opacity-50"
      tabindex="-1"
      :disabled="fileCount === 0"
      @click="doUpload()"
    >
      {{t('checks.document-check.upload-files')}}
    </button>

    <div v-if="uploading" class="mt-3 text-center">
      <loader color="lightGreen" size="10" :isLoading="uploading" />
    </div>

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
  import { progressType, useUpload } from '../../composable/useUpload'
  import RepositoryFactory from '../../repositories/repositoryFactory'
  import { FileRepository } from '../../repositories/FileRepository'
  import { onMounted, ref, defineComponent, PropType } from 'vue'
  import MasterConfig from '@/models/config/masterConfig'
  import { FileItem } from '@/serializer/FileItem'
  import {Loader} from 'vue-3-component-library'
  import store from '@/store/store'
  import Dropzone from 'dropzone'
  const delay = require('delay');
  import { useI18n } from 'vue-i18n'
import { useNotification } from '@/composable/useNotification'
  
  export default defineComponent({
    name: 'Upload',
    components: {
      Loader
    },
    props: {
      progress: {
        type: [String, Number, Object] as PropType<progressType>,
        require: false,
        default: undefined,
      },
    },
    emits: ['update:progress', 'uploadedFile'],
    setup({}, { emit }) {
    const { triggerNotification } = useNotification()
      
      const { t } = useI18n({
        inheritLocale: true,
        useScope: 'local',
      })
      const fileCount = ref<number>(0)
      const uploading = ref<boolean>(false)
      const { uploadIsComplete } = useUpload()
      const doUpload = ref<() => void | undefined>()
      const config: MasterConfig = store.getters.config
      const dropzoneDiv = ref<HTMLDivElement | undefined>(undefined)
      const baseUrl = `${config.api.baseUrl}/${config.api.apiSuffix}`
      const dropzonePreviewDiv = ref<HTMLDivElement | undefined>(undefined)
      const listOfAllowed = '.jpg, .jpeg, .png, .webp, .odt, .ods, .odp, .docx, application/pdf, .pptx, .xlsx, .doc'
      const maxFileize = 20
      onMounted(async () => {
        if (dropzoneDiv.value && dropzonePreviewDiv) {
          const myDropzone = new Dropzone(dropzoneDiv.value, {
            url: `${baseUrl}files/`,
            headers: {},
            autoProcessQueue: false,
            acceptedFiles: listOfAllowed,
            previewTemplate: dropzonePreviewDiv.value?.outerHTML,
            uploadMultiple: true,
            parallelUploads: 99,
            maxFiles: 99,
            maxFilesize: maxFileize
          })

          myDropzone.on("error", function(file: any, message: any) { 
            triggerNotification(message)
          });

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
            myDropzone.files.forEach(async (f: any) => {
              await delay(100)
              uploadFile(f).finally(() => uploading.value = false)
            })

            myDropzone.removeAllFiles()
          }

          const uploadFile = async (file: any) => {
            await RepositoryFactory.get(FileRepository).uploadFile(file).then((responseFile: FileItem) => {
              try {
                emit('uploadedFile', responseFile)
                console.log('TRY',)
              } catch (error) {
                console.log('CATCH - FILE UPLOAD ERROR: ', error)
              }
            })
          }
        }
      })

      return {
        dropzonePreviewDiv,
        dropzoneDiv,
        uploading,
        fileCount,
        doUpload,
        t,
        listOfAllowed,
        maxFileize
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
