<template>
  <div v-if="selectedGroup.isSectionLeader || selectedGroup.isGroupLeader || selectedGroup.isDistrictCommissioner">
    <!-- keuring -->
    <div class="xs:w-100 md:w-80 mt-3">
      <custom-button-small class="w-100" :extraStyle="'w-100'" @click="sign()" :isSubmitting="false" :text="'kamp goedkeuren'">
      </custom-button-small>
    </div>

    <!-- engagement -->
    <div class="md:w-1/3 xs:w-96 bg-lighterGreen mt-3 p-3 shadow-md">
      <h1 class="text-xl mb-0 mt-0">{{t('engagement.title')}}</h1>

      <div class="mt-3 flex gap-2 flex-col">
        <!-- LEADER -->
        <div class="flex gap-2 items-center" :class="!visum.engagement.leaders ? 'opacity-50' : ''">
          <i-empty-check v-if="!visum.engagement.leaders" />
          <i-checked v-else />
          <strong>Leiding</strong>
          {{ visum.engagement.leaders?.firstName }} {{ visum.engagement.leaders?.lastName }}
        </div>

        <!-- GROUP LEADER -->
        <div class="flex gap-2 items-center" :class="!visum.engagement.groupLeaders ? 'opacity-50' : ''">
          <i-empty-check v-if="!visum.engagement.groupLeaders" />
          <i-checked v-else />
          <strong>Groepsleiding</strong>
          {{ visum.engagement.groupLeaders?.firstName }} {{ visum.engagement.groupLeaders?.lastName }}
        </div>

        <!-- DC -->
        <div class="flex text-grey gap-2 items-center" :class="!visum.engagement.districtCommisioner ? 'opacity-50' : ''">
          <i-empty-check v-if="!visum.engagement.districtCommisioner" />
          <i-checked v-else />
          <strong>DC</strong>
          {{ visum.engagement.districtCommisioner?.firstName }} {{ visum.engagement.districtCommisioner?.lastName }}
        </div>
      </div>
    </div>

    <pre class="mt-5">
        {{ visum.engagement }}
      </pre
    >
  </div>
</template>

<script lang="ts">
import { EngagementRepository } from '@/repositories/EngagementRepository'
import RepositoryFactory from '@/repositories/repositoryFactory'
import IEmptyCheck from '@/components/icons/IEmptyCheck.vue'
import useGroupAndYears from '@/composable/useGroupAndYears'
import { CustomButtonSmall } from 'vue-3-component-library'
import { defineComponent, PropType, toRefs } from 'vue'
import IChecked from '@/components/icons/IChecked.vue'
import { Engagement } from '@/serializer/Engagement'
import { Visum } from '@/serializer/Visum'
import { useI18n } from 'vue-i18n'



export default defineComponent({
  name: 'Engagement',
  components: {
    IChecked,
    IEmptyCheck,
    CustomButtonSmall
  },
  props: {
    visum: {
      type: Object as PropType<Visum>,
      required: true,
    },
  },
  setup(props: any) {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    const { visum } = toRefs(props)
    const { selectedGroup } = useGroupAndYears()
    const sign = () => {
      RepositoryFactory.get(EngagementRepository).signVisum(props.visum)
    }

    RepositoryFactory.get(EngagementRepository)
      .getById(props.visum.engagement.id)
      .then((response: Engagement) => {
        console.log('GET ENGAGEMENT STATUS: ', response)
      })

    return {
      selectedGroup,
      visum,
      sign,
      t
    }
  },
})
</script>
