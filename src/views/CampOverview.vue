<template>
    <div>
      <pre>
        {{camp}}
      </pre>
    </div>
</template>

<script lang="ts">
import RepositoryFactory from '@/repositories/repositoryFactory'
import { CampRepository } from '@/repositories/campRepository'
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Camp } from '../serializer/Camp'

export default defineComponent({
  name: 'CampOverview',
  setup () {
    const route = useRoute()
    const camp = ref<Camp>()

    const getCamp = async () => {
      await RepositoryFactory.get(CampRepository)
        .getById(route.params.id.toString())
        .then((c: Camp) => {
          camp.value = c
        })
    }

    getCamp()

    return {
      camp
    }
  }
})
</script>
