<template>
<div>
      <!-- keuring -->
      <div @click="updateVisumState()" style="width: fit-content" class="flex gap-3 items-center p-3 bg-black text-white mt-3 cursor-pointer">
        <div>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 26.5C20.9036 26.5 26.5 20.9036 26.5 14C26.5 7.09644 20.9036 1.5 14 1.5C7.09644 1.5 1.5 7.09644 1.5 14C1.5 20.9036 7.09644 26.5 14 26.5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

          <svg v-if="false" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 26.5C20.9036 26.5 26.5 20.9036 26.5 14C26.5 7.09644 20.9036 1.5 14 1.5C7.09644 1.5 1.5 7.09644 1.5 14C1.5 20.9036 7.09644 26.5 14 26.5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12.375 15.9149L20.3692 8L23 10.5411L17.6875 15.7706L12.375 21L6 15.0282L8.62935 12.4857L12.375 15.9149Z" fill="white"/>
          </svg>

        </div>
        <h1 class="text-xl mb-0 mt-0">kamp goedkeuren</h1>
      </div>

      <!-- engagement -->
      <div v-if="selectedGroup.isDistrictCommissioner || selectedGroup.isLeader || selectedGroup.isGroupLeader" class="md:w-1/3 xs:w-96 bg-lighterGreen mt-3 p-3 shadow-md">
        <h1 class="text-xl mb-0 mt-0">Kamp engagement</h1>
        
        <div class="mt-3 flex gap-2 flex-col">
          <div class="flex gap-2 items-center">
            <i-checked /> Leiding 
          </div>

          <div class="flex gap-2 items-center">
            <i-checked /> Groepsleiding
          </div>

          <div class="flex text-grey gap-2 items-center opacity-50">
            <i-empty-check /> DC
          </div>
        </div>
      </div>

      <pre>
        {{selectedGroup}}
      </pre>

    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import IChecked from '@/components/icons/IChecked.vue'
import IEmptyCheck from '@/components/icons/IEmptyCheck.vue'
import useGroupAndYears from '@/composable/useGroupAndYears'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { EngagementRepository } from '@/repositories/EngagementRepository'
import { Engagement } from '@/serializer/Engagement'
import { Visum } from '@/serializer/Visum'

export default defineComponent({
  name: 'Engagement',
  components: {
    IChecked,
    IEmptyCheck,
  },
  props: {
    visum: {
      type: Object as PropType<Visum>,
      required: true
    }
  },
  setup (props:any) {
    const { selectedGroup } = useGroupAndYears()
    const updateVisumState = () => {
    }

    RepositoryFactory.get(EngagementRepository)
      .getById(props.visum.engagement.id)
      .then((response: Engagement) => {
        console.log('GET ENGAGEMENT STATUS: ', response)
      })

    return  {
      selectedGroup,
      updateVisumState
    }
  }
})
</script>
