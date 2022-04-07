<template>
  <div class="flex justify-center h-screen" v-if="!selectedGroup.isSectionLeader && !selectedGroup.isGroupLeader && !selectedGroup.isDistrictCommissioner">
    <img class="h-3/4" src="https://www.scoutsengidsenvlaanderen.be/sites/default/files/images/site403.png" alt="" />
  </div>
</template>

<script lang="ts">
import useGroupAndYears from '@/composable/useGroupAndYears'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'forbidden',
  setup () {
    const { selectedGroup } = useGroupAndYears()
    return {
      selectedGroup
    }
  }
})
</script>

