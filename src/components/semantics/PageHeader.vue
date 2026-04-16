<template>
  <div>
    <div class="px-3 md:py-3 xs:py-1 border border-lightGray shadow-sm">
      <h1 class="xs:text-xl">{{ title }}</h1>
      <router-link v-if="subTitle" :to="backLink" style="width: fit-content" class="xs:text-base flex gap-2 items-center text-green font-aglet font-light cursor-pointer hover:underline mb-0">
        <i-left-arrow />
        Terug naar overzicht
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
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
  setup() {
    const route = useRoute()
    const backLink = '/kamp/' + route.params.campId
    return {
      backLink,
      route,
    }
  },
})
</script>
