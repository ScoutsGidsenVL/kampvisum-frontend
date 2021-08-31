<template>
  <div v-if="camp">
    <h1>{{ camp.name }}</h1>

    <h4 class="text-green inline" v-for="(section, index) in camp.sections" :key="section">
      {{ camp.sections.length > 1 && index != camp.sections.length - 1 ? section.name + ' & ' : section.name }}
    </h4>

    <hr />

    <div class="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
      <div v-for="category in camp.categories" :key="category">
        <category-info-card :category="category" />
      </div>
    </div>

    <div class="cursor-pointer mt-10 bg-gray" @click="navigateTowardsCampPlanning(camp)">
      <h3>go to planning of the camp</h3>
    </div>

  </div>
</template>

<script lang="ts">
import CategoryInfoCard from '../components/cards/CategoryInfoCard.vue'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { CampRepository } from '@/repositories/campRepository'
import { defineComponent, ref } from 'vue'
import { Camp } from '../serializer/Camp'
import { useRoute } from 'vue-router'
import router from '@/router'

export default defineComponent({
  name: 'CampOverview',
  components: {
    'category-info-card': CategoryInfoCard,
  },
  setup() {
    const route = useRoute()
    const camp = ref<Camp>()
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

    const categories = ['Planning', 'Logistiek', 'Communicatie', 'Veiligheid', 'Leden & leiding', 'Budget']

    return {
      camp,
      navigateTowardsCampPlanning,
      categories,
    }
  },
})
</script>
