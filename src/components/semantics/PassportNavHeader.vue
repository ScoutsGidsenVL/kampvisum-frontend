<template>
  <div class="px-4 py-1 flex items-center gap-4 text-green">
    <i-left-arrow @click="navigateTowardsPassport(visum.id)" class="cursor-pointer font-semibold font-museo"/>
    <h4 @click="navigateTowardsPassport(visum.id)" class="hover:underline pt-2.5 font-semibold font-museo cursor-pointer">{{title}}</h4>
  </div>
  <hr>
</template>

<script lang="ts">
import ILeftArrow from '@/components/icons/ILeftArrow.vue'
import { useNavigation } from '@/composable/useNavigation'
import { defineComponent, PropType } from 'vue'
import { Visum } from '@/serializer/Visum'

export default defineComponent({
  components: {ILeftArrow},
  name: 'PassportNavHeader',
  props: {
    title: String,
    visum: {
      type: Object as PropType<Visum>,
      required: true,
    },
  },
  setup (props) {
    const { navigateTowardsPassport } = useNavigation()
    
    return {
      navigateTowardsPassport
    }
  }
})
</script>
