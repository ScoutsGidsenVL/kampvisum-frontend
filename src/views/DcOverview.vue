<template>
  <!-- <passport-nav-header :visum="visum" :title="t('passport.documents')" /> -->
  <!-- <div class="text-center">
    <loader color="lightGreen" size="20" :isLoading="isFetchingVisum" />
  </div> -->
  <div id="container" class="p-3 flex flex-col gap-5">
    <div class="flex flex-column gap-4">
      <dc-menu :group="{ groupId: 'X9002G' }">
        <template v-slot:data>
          <dc-menu-item></dc-menu-item>
        </template>
      </dc-menu>  
    </div>
  </div>
</template>

<script lang="ts">
import PassportNavHeader from '@/components/semantics/PassportNavHeader.vue'
import DcMenu from '@/components/semantics/DcMenu.vue'
import DcMenuItem from '@/components/semantics/DcMenuItem.vue'
import { useCampHelper } from '@/helpers/campHelper'
import { defineComponent, ref } from 'vue'
import { Visum } from '@/serializer/Visum'
import { useI18n } from 'vue-i18n'
import { Loader } from 'vue-3-component-library'

export default defineComponent({
  components: {Loader, PassportNavHeader, DcMenu, DcMenuItem},
  name: 'DcOverview',
  setup() {
    const isFetchingVisum = ref<boolean>(true)
    const { getCampByRouteParam } = useCampHelper()
    const visum = ref<Visum>()

    getCampByRouteParam().then((v: Visum) => {
      visum.value = v
      isFetchingVisum.value = false
    })

    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    return {
      t,
      visum,
      isFetchingVisum,
    }
  },
})
</script>
