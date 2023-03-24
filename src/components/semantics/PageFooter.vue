<template>
  <div>
    <div class="px-3 md:py-1 xs:py-1 border border-lightGray shadow-sm flex justify-between xs:flex-col xs:gap-7">
      <h6 style="width: fit-content" @click="navigateTowardsVisum(route.params.campId)"
        class="xs:text-base flex gap-2 items-center text-green font-aglet font-light cursor-pointer hover:underline mb-0">
        <i-left-arrow />
        {{t('page-footer.back')}}
      </h6>

      <div class="flex gap-10 xs:flex-col xs:gap-1">
        <h6 v-if="!isFirstCategory()" @click="navigate(NavigateOptions.PREVIOUS)"
          class="xs:text-base flex gap-2 items-center text-green font-aglet font-light cursor-pointer hover:underline mb-0">
          {{t('page-footer.previous')}}
        </h6>
        <h6 v-if="!isLastCategory()" @click="navigate(NavigateOptions.NEXT)"
          class="xs:text-base flex gap-2 items-center text-green font-aglet font-light cursor-pointer hover:underline mb-0">
          {{t('page-footer.next')}}
        </h6>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useNavigation } from '@/composable/useNavigation'
import { PropType } from 'vue'
import ILeftArrow from '../icons/ILeftArrow.vue'
import { useRoute } from 'vue-router'
import { Visum } from '@/serializer/Visum'
import { Category } from '@/serializer/Category'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local',
})

enum NavigateOptions {
  PREVIOUS = 'PREVIOUS',
  NEXT = 'NEXT'
}

const props = defineProps({
  visum: {
    type: Object as PropType<Visum>,
    required: true
  }
})

const { navigateTowardsCategory } = useNavigation()
const route = useRoute()
const { navigateTowardsVisum } = useNavigation()
const categoryId = route.params.id

const isFirstCategory = (): boolean => {
  return props.visum.categorySet.categories[0].id === categoryId;
}

const isLastCategory = (): boolean => {
  return props.visum.categorySet.categories.slice(-1)[0]?.id === categoryId;
}

const navigate = (option: string) => {
  let index = props.visum.categorySet.categories.findIndex((category: Category) => category.id === categoryId)
  index = option === NavigateOptions.NEXT ? index + 1 : index - 1
  const previousCategory: Category = props.visum.categorySet.categories[index];
  if (previousCategory.id) {
    navigateTowardsCategory(previousCategory.categoryParent.name, props.visum, previousCategory.id)
  }
}
</script>
