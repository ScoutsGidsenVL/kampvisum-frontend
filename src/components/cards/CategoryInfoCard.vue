<template>
  <div @click="navigateTowardsCategory(category.categoryParent.name, visum, category.id)" class="p-3 cursor-pointer shadow-md rounded-md hover:bg-lighterGreen" style="height: 300px">
    <div class="z-2">
      <h2 class="mb-3 mt-0 text-xl font-semibold font-museo">{{ category.categoryParent.label }}</h2>
      <div v-if="visum.state === VisumStates.SIGNABLE && false" class="font-bold bg-lighterGreen p-2 -m-2" style="width:fit-content">DC</div>

      <div style="width:fit-content" @click.stop="navigateTowardsSubCategory(category, subCategory)" v-for="subCategory in category.subCategories" :key="subCategory" class="d-flex gap-3 my-2.5 items-center group">
        <!-- DC CHECKS -->
        <div v-if="visum.state === VisumStates.SIGNABLE && false" class="bg-lighterGreen p-2 -m-2">
          <i-checked v-if="subCategory.state === 'CHECKED'" />
          <i-empty-check v-if="subCategory.state === 'UNCHECKED'" />    
        </div>

        <!-- OTHER CHECKS-->
        <i-checked v-if="subCategory.state === 'CHECKED'" />
        <i-empty-check v-if="subCategory.state === 'UNCHECKED'" />
        <h4 class="group-hover:underline mb-0 ml-0 text-md font-museo font-medium">{{ subCategory.subCategoryParent.label }}</h4>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { useNavigation } from '../../composable/useNavigation'
import { Category } from '../../serializer/Category'
import IEmptyCheck from '../icons/IEmptyCheck.vue'
import { defineComponent, PropType } from 'vue'
import IChecked from '../icons/IChecked.vue'
import { Visum, VisumStates } from '@/serializer/Visum'
import { useRoute } from 'vue-router'
import router from '@/router'

export default defineComponent({
  name: 'CategoryInfoCard',
  components: { IEmptyCheck, IChecked },
  props: {
    category: {
      type: Object as PropType<Category>,
      required: true,
    },
    visum: {
      type: Object as PropType<Visum>,
      required: true,
    },
  },
  setup() {
    const { navigateTowardsCategory } = useNavigation()
    const route = useRoute()

    const navigateTowardsSubCategory = (category: Category) => {
      router.push('/kamp/' + route.params.campId.toString() + '/category/' + category.id)
    }

    return {
      navigateTowardsSubCategory,
      navigateTowardsCategory,
      route,
      VisumStates
    }
  },
})
</script>
