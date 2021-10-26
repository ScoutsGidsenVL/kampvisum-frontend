<template>
  <div v-if="camp" class="p-3">
    <h1>{{ camp.name }}</h1>

    <h4 v-if="sidebar" class="text-green inline">
      {{ getSectionsTitle(camp) }}
    </h4>
    
    <hr />

    <div class="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
      <div v-for="category in camp.categories" :key="category">
          <category-info-card :category="category" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CategoryInfoCard from '../components/cards/CategoryInfoCard.vue'
import { useCampHelper } from '../helpers/campHelper'
import { useSectionsHelper } from '../helpers/sectionsHelper'
import { defineComponent, ref } from 'vue'
import { Camp } from '../serializer/Camp'

export default defineComponent({
  name: 'CampOverview',
  components: {
    'category-info-card': CategoryInfoCard,
  },
  setup() {
    const camp = ref<Camp>()
    const { getCampByRouteParam } = useCampHelper()
    const { getSectionsTitle } = useSectionsHelper()


    getCampByRouteParam().then((c: Camp) => {
      camp.value = c
    })
    
    return {
      getSectionsTitle,
      camp
    }
  },
})
</script>
