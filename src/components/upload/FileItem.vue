<template>
  <div v-if="file">
    <div>
      <div class="flex xs:flex-col md:flex-row md:justify-between bg-white pl-3 pr-3 border-b-2 border-midGray">
        <div class="flex gap-2 mt-2.5">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <p class="max-w-xs truncate">{{ file.name }}</p>
        </div>
        <!-- {{ file.id }} -->
        <div class="flex xs:justify-between md:justify-start gap-6 mt-3">
          <div @click="downloadFile(file.id)" class="align-middle flex gap-2 cursor-pointer">
            <p class="align-middle underline text-xs text-darkGray hover:text-black">{{t('checks.document-check.download')}}</p>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 stroke-current text-green" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </div>

          <div v-if="!canBeChecked && canBeDeleted" @click="deleteFromList(file)" class="flex gap-2 cursor-pointer">
            <p class="underline text-xs text-darkGray hover:text-black">{{t('checks.document-check.remove')}}</p>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 stroke-current text-red" fill="none" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
          <div v-if="canBeChecked">
            <div @click="toggleCheck(file)" v-if="!file.isChecked" class="flex text-xs gap-2 cursor-pointer">
              <p>{{t('checks.document-check.select')}}</p>
              <svg v-if="!file.isChecked" width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.5 14.25C10.9518 14.25 13.75 11.4518 13.75 8C13.75 4.54822 10.9518 1.75 7.5 1.75C4.04822 1.75 1.25 4.54822 1.25 8C1.25 11.4518 4.04822 14.25 7.5 14.25Z"
                  stroke="#6C757D"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>

            <div @click="toggleCheck(file)" v-if="file.isChecked" class="flex text-xs gap-2 cursor-pointer">
              <p class="text-green underline">{{t('checks.document-check.selected')}}</p>
              <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13.75 7.42498V7.99998C13.7492 9.34774 13.3128 10.6591 12.5058 11.7386C11.6989 12.8181 10.5646 13.6078 9.2721 13.9899C7.97964 14.3721 6.59829 14.3262 5.33404 13.8591C4.0698 13.392 2.99041 12.5288 2.25685 11.3981C1.52329 10.2675 1.17487 8.93002 1.26355 7.58517C1.35223 6.24033 1.87325 4.96018 2.74892 3.93565C3.6246 2.91111 4.80799 2.19709 6.12262 1.90007C7.43725 1.60304 8.81267 1.73894 10.0438 2.28748"
                  stroke="#7B8F1C"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path d="M13.75 3L7.5 9.25625L5.625 7.38125" stroke="#7B8F1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { FileCheckRepository } from '@/repositories/FileCheckRepository'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { FileRepository } from '@/repositories/FileRepository'
import { FileItem } from '@/serializer/FileItem'
import { defineComponent, PropType } from 'vue'
import { Check } from '@/serializer/Check'
import { useI18n } from 'vue-i18n'
import { useInternetHelper } from '@/helpers/internetHelper'
import { useOfflineData } from '@/composable/useOfflineData'
import useGroupAndYears from '@/composable/useGroupAndYears'

export default defineComponent({
  name: 'FileItem',
  props: {
    canBeChecked: Boolean,
    file: {
      type: Object as PropType<FileItem>,
      required: true,
    },
    check: {
      type: Object as PropType<Check>,
      required: true,
    },
    canBeDeleted: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { emit }) {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    const { isInternetActive } = useInternetHelper()
    const { getFile } = useOfflineData()
    const { selectedGroup } = useGroupAndYears()

    const downloadFile = (id: string) => {
      if (isInternetActive.value) {
        RepositoryFactory.get(FileRepository)
        .getById(selectedGroup.value.groupAdminId, id)
          .then((presignedUrl: string) => {
          console.log('PRE SIGNED URL:', presignedUrl)
          window.open(presignedUrl, '_blank');          
        })
      } else {
        getFile(id).then((file: any) => {
          const url = window.URL.createObjectURL(new Blob([file.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', file.name);
          document.body.appendChild(link);
          link.click();
        })
      }
    }

    const toggleCheck = (file: FileItem) => {
      file.isChecked = !file.isChecked
    }

    const deleteFromList = async (file: FileItem) => {
      if (props.check.id) {
        await RepositoryFactory.get(FileCheckRepository)
          .removeFileFromList(selectedGroup.value.groupAdminId, props.check.id, file.id)
          .then(() => {
            emit('actionSuccess', 'DELETE')
          })
      }
    }

    return {
      deleteFromList,
      downloadFile,
      toggleCheck,
      t
    }
  },
})
</script>
