<template>
  <div>
    <div class="px-3 md:py-1 xs:py-1 border border-lightGray shadow-sm flex justify-between xs:flex-col xs:gap-7">
      <router-link :to="backLink" style="width: fit-content" class="xs:text-base flex gap-2 items-center text-green font-aglet font-light cursor-pointer hover:underline mb-0">
        <i-left-arrow />
        {{ t('page-footer.back') }}
      </router-link>

      <div class="flex gap-10 xs:flex-col xs:gap-1">
        <router-link
          v-if="previousCategory"
          :to="'/kamp/' + props.visum.id.toString() + '/category/' + previousCategory.id"
          class="xs:text-base flex gap-2 items-center text-green font-aglet font-light cursor-pointer hover:underline mb-0"
        >
          {{ t('page-footer.previous') }}
        </router-link>
        <router-link
          v-if="nextCategory"
          :to="'/kamp/' + props.visum.id.toString() + '/category/' + nextCategory.id"
          class="xs:text-base flex gap-2 items-center text-green font-aglet font-light cursor-pointer hover:underline mb-0"
        >
          {{ t('page-footer.next') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'
import ILeftArrow from '../icons/ILeftArrow.vue'
import { useRoute } from 'vue-router'
import { Visum } from '@/serializer/Visum'
import { Category } from '@/serializer/Category'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local',
})

const props = defineProps({
  visum: {
    type: Object as PropType<Visum>,
    required: true,
  },
})

const route = useRoute()
const categoryId = computed(() => route.params.id?.toString() ?? '')
const backLink = computed(() => '/kamp/' + route.params.campId)
const currentCategoryIndex = computed(() => props.visum.categorySet.categories.findIndex((category: Category) => category.id === categoryId.value))
const previousCategory = computed(() => {
  if (currentCategoryIndex.value <= 0) {
    return null
  }
  return props.visum.categorySet.categories[currentCategoryIndex.value - 1]
})
const nextCategory = computed(() => {
  if (currentCategoryIndex.value < 0 || currentCategoryIndex.value >= props.visum.categorySet.categories.length - 1) {
    return null
  }
  return props.visum.categorySet.categories[currentCategoryIndex.value + 1]
})
</script>
