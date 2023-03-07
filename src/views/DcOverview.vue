<template>
  <div class="text-center">
    <loader color="lightGreen" size="20" :isLoading="!groups" />
  </div>
  <div id="container" class="p-3 flex flex-col gap-5">
    <div class="flex flex-column gap-4">
      <dc-menu v-for="(group, index) in groups" :key="index" :group="group" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import DcMenu from '@/components/semantics/DcMenu.vue'
import { useI18n } from 'vue-i18n'
import { Loader } from 'vue-3-component-library'
import { DcOverviewRepository } from '@/repositories/DcOverviewRepository'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { ref } from 'vue'

const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local',
})

const groups = ref<any>([])

RepositoryFactory.get(DcOverviewRepository).getSingle().then((result) => {
  groups.value = result
})
</script>
