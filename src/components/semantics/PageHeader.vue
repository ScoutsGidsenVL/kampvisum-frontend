<template>
  <div>
    <div class="px-3 md:py-3 xs:py-1 border border-lightGray shadow-sm">
      <h1 class="xs:text-xl">{{ title }}</h1>
      <h4 style="width: fit-content" @click="navigateTowardsVisum(route.params.campId)" v-if="subTitle" class="xs:text-base flex gap-2 items-center text-green font-aglet font-light cursor-pointer hover:underline">
        <i-left-arrow />
        {{ subTitle }}
      </h4>
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
  props: {
    title: {
      type: String,
      required: true,
      default: 'default title',
    },
    subTitle: String,
  },
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
