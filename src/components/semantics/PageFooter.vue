<template>
  <div>
    <div class="px-3 md:py-1 xs:py-1 border border-lightGray shadow-sm">
      <h6 style="width: fit-content" @click="navigateTowardsVisum(route.params.campId)" class="xs:text-base flex gap-2 items-center text-green font-aglet font-light cursor-pointer hover:underline mb-0">
        <i-left-arrow />
        Terug naar overzicht
      </h6>
    </div>
  </div>
</template>

<script lang="ts">
import { useNavigation } from '@/composable/useNavigation'
import { defineComponent } from 'vue'
import ILeftArrow from '../icons/ILeftArrow.vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: { ILeftArrow },
  name: 'PageHeader',
  setup () {
    const route = useRoute()
    const { navigateTowardsVisum } = useNavigation()
    return {
      navigateTowardsVisum,
      route
    }
  }
})
</script>
