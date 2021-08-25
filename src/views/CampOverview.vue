<template>
  <div v-if="camp">
    <h1>{{ camp.name }}</h1>

    <div class="cursor-pointer" @click="navigateTowardsCampPlanning(camp)">
      <h3>PLANNING</h3>
    </div>
  </div>
</template>

<script lang="ts">
import RepositoryFactory from '@/repositories/repositoryFactory'
import { CampRepository } from '@/repositories/campRepository'
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Camp } from '../serializer/Camp'
import router from '@/router'

export default defineComponent({
  name: 'CampOverview',
  setup() {
    const route = useRoute()
    const camp = ref<Camp>()
    console.log('ID: ', route.params.id.toString())
    const getCamp = async () => {
      await RepositoryFactory.get(CampRepository)
        .getById(route.params.id.toString())
        .then((c: Camp) => {
          camp.value = c
        })
    }

    const navigateTowardsCampPlanning = () => {
      router.push('/kamp/' + route.params.id.toString() + '/planning/' + '123HJK123KLM')
    }

    getCamp()

    return {
      camp,
      navigateTowardsCampPlanning,
    }
  },
})
</script>
