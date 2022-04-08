<template>
  <div class="flex flex-col gap-5" v-if="selectedGroup.groupAdminId !== '' && (!selectedGroup.isSectionLeader && !selectedGroup.isGroupLeader && !selectedGroup.isDistrictCommissioner)">
    <div class="text-xl text-center">
      {{t('forbidden')}}
    </div>
    <div class="flex justify-center h-screen">
      <img class="h-3/5" src="https://www.scoutsengidsenvlaanderen.be/sites/default/files/images/site403.png" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import useGroupAndYears from '@/composable/useGroupAndYears'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'forbidden',
  setup() {
    const { selectedGroup } = useGroupAndYears()
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })
    return {
      selectedGroup,
      t
    }
  },
})
</script>

