<template>
  <div @click="navigateTowardsVisum(visum)" class="p-3 shadow-md rounded-md"
    :class="isInternetActive ? 'cursor-pointer hover:bg-lighterGreen' : ''">
    <div class="z-2">
      <div class="flex justify-between">
        <h3 class="text-lg text-green mb-1 font-normal">
          <span>
            {{ getSectionsTitle(visum) }}
          </span>
        </h3>
        <div class="d-flex gap-3 mt-1">
          <slot name="buttons" />
        </div>
      </div>
      <h2 class="mb-3 mt-1 text-xl font-semibold font-museo">{{ visum.name }}</h2>
      <div style="width:fit-content"
        @click.stop="navigateTowardsCategory(category.categoryParent.name, visum, category.id)"
        v-for="category in visum.categorySet.categories" :key="category" class="d-flex gap-3 my-2.5 items-center group">
        <div style="min-width: 24px">
          <svg v-if="category.state === 'CHECKED'" class="mt-1 fill-current text-green" xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.393 7.5l-5.643 5.784-2.644-2.506-1.856 1.858 4.5 4.364 7.5-7.643-1.857-1.857z" />
          </svg>
          <svg v-if="category.state === 'UNCHECKED'" class="fill-current text-darkGray" xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M 12 2 c 5.514 0 10 4.486 10 10 s -4.486 10 -10 10 s -10 -4.486 -10 -10 s 4.486 -10 10 -10 z m 0 -2 c -6.627 0 -12 5.373 -12 12 s 5.373 12 12 12 s 12 -5.373 12 -12 s -5.373 -12 -12 -12 z z" />
          </svg>
        </div>
        <h4 class="mb-0 ml-0 xs:text-base text-md font-museo font-medium"
          :class="isInternetActive ? 'group-hover:underline' : ''">
          {{ category.categoryParent.label }}
        </h4>
      </div>
      <camp-global-status-label :visum="visum" />
      <custom-button class="w-100 bg-green cursor-pointer" @click.stop="navigateTowardsPassport(visum.id)"
        :extraStyle="'w-100'" :text="t('passport.view-passport')">
      </custom-button>
    </div>
</div>
</template>

<script lang="ts">
import { CustomButtonSmall } from 'vue-3-component-library'
import { useSectionsHelper } from '../../helpers/sectionsHelper'
import { useNavigation } from '../../composable/useNavigation'
import { defineComponent, PropType } from 'vue'
import { VisumOverview } from '../../serializer/Visum'
import { useRoute } from 'vue-router'
import router from '@/router'
import useVisum from '@/composable/useVisum'
import CampGlobalStatusLabel from '@/components/semantics/CampGlobalStatusLabel.vue'
import { useI18n } from 'vue-i18n'
import { useInternetHelper } from '@/helpers/internetHelper'

export default defineComponent({
  name: 'CampInfoCard',
  components: {
    CampGlobalStatusLabel,
    'custom-button': CustomButtonSmall,
  },
  props: {
    visum: {
      type: Object as PropType<VisumOverview>,
      required: true,
    },
  },
  setup() {
    const { isInternetActive } = useInternetHelper()
    const route = useRoute()
    const { navigateTowardsCategory, navigateTowardsPassport } = useNavigation()
    const { getSectionsTitle } = useSectionsHelper()
    const { navigateTowardsVisum } = useVisum()

    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    return {
      navigateTowardsCategory,
      navigateTowardsPassport,
      navigateTowardsVisum,
      getSectionsTitle,
      route,
      isInternetActive,
      t
    }
  },
})
</script>
