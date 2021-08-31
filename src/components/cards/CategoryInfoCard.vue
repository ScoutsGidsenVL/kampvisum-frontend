<template>
  <div @click="navigateTowardsCategory(category)" class="p-3 cursor-pointer shadow-md rounded-md hover:bg-lighterGreen">
    <div class="z-2">
      <h2 class="mb-3 mt-0">{{ category.name }}</h2>
      <div v-for="category in subCategories" :key="category" class="d-flex gap-3 my-2.5 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M 12 2 c 5.514 0 10 4.486 10 10 s -4.486 10 -10 10 s -10 -4.486 -10 -10 s 4.486 -10 10 -10 z m 0 -2 c -6.627 0 -12 5.373 -12 12 s 5.373 12 12 12 s 12 -5.373 12 -12 s -5.373 -12 -12 -12 z z"
          />
        </svg>
        <!-- <svg class="mt-1 fill-current text-green" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.393 7.5l-5.643 5.784-2.644-2.506-1.856 1.858 4.5 4.364 7.5-7.643-1.857-1.857z"/></svg> -->
        <h4 @click.stop="navigateTowardsSubCategory()" class="hover:underline mb-0 ml-0">{{ category }}</h4>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Category } from '../../serializer/Category'
import router from '@/router'

export default defineComponent({
  name: 'CategoryInfoCard',
  components: {},
  props: {
    category: {
      type: Object as PropType<Category>,
      required: true,
    },
  },
  setup() {
    const navigateTowardsCategory = (category: Category) => {
      router.push('/category/' + category.uuid)
    }

    const navigateTowardsSubCategory = () => {
      console.log('navigate to subcategory page by id')
    }

    const subCategories = ['Planning', 'Logistiek', 'Veiligheid']
    return {
      navigateTowardsCategory,
      navigateTowardsSubCategory,
      subCategories,
    }
  },
})
</script>
