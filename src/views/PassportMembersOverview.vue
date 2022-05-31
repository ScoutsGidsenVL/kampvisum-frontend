<template>
  <passport-nav-header :visum="visum" :title="'Leden'" />
  <div v-if="visum" id="locations-container" class="px-3">
    <div v-for="category in visum.categorySet.categories" :key="category" >
      <!-- LEDEN -->
      <passport-menu 
        v-if="category.categoryParent.name === 'members_leaders'" 
        :title="'Leden'"
      >
        <template v-slot:title-icon>
          <i-users />
        </template>
        <template v-slot:data>
          <div v-for="subCategory in category.subCategories" :key="subCategory">
            <div v-for="check in subCategory.checks" :key="check">
              <div v-if="check.value?.participantCheckType === 'M'">
                <div v-for="participant in check.value.participants" :key="participant">
                  <div>
                    {{participant.firstName}} {{participant.lastName}} {{participant.birthDate}}
                  </div>
                  <div>
                    {{participant.fullAddress}}
                  </div>
                  <div>
                    {{participant.email}} {{participant.phoneNumber}} 
                  </div>
                  <hr>
                </div>
              </div>
            </div>
          </div>
        </template>
      </passport-menu>    

      <!-- FOURIERS -->
      <passport-menu 
        class="mt-3"
        v-if="category.categoryParent.name === 'members_leaders'" 
        :title="'Fouriers'"
      >
        <template v-slot:title-icon>
          <i-users />
        </template>
        <template v-slot:data>
          <div v-for="subCategory in category.subCategories" :key="subCategory">
            <div v-for="check in subCategory.checks" :key="check">
              <div v-if="check.value?.participantCheckType === 'C'">
                <div v-for="participant in check.value.participants" :key="participant">
                  <div>
                    {{participant.firstName}} {{participant.lastName}} {{participant.birthDate}}
                  </div>
                  <div>
                    {{participant.fullAddress}}
                  </div>
                  <div>
                    {{participant.email}} {{participant.phoneNumber}} 
                  </div>
                  <hr>
                </div>
              </div>
            </div>
          </div>
        </template>
      </passport-menu>  
    </div>
  </div>
</template>

<script lang="ts">
import PassportOverviewItem from '@/components/semantics/PassportOverviewItem.vue'
import PassportNavHeader from '@/components/semantics/PassportNavHeader.vue'
import LocationListItem from '@/components/semantics/LocationListItem.vue'
import PassportMenu from '@/components/semantics/PassportMenu.vue'
import IPhoneGreen from '@/components/icons/IPhoneGreen.vue'
import { SubCategory } from '@/serializer/SubCategory'
import { useCampHelper } from '@/helpers/campHelper'
import IShield from '@/components/icons/IShield.vue'
import IMarker from '@/components/icons/IMarker.vue'
import ITime from '@/components/icons/ITime.vue'
import { defineComponent, ref } from 'vue'
import { Visum } from '@/serializer/Visum'
import { Check } from '@/serializer/Check'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  components: {
    PassportOverviewItem, 
    PassportNavHeader, 
    PassportMenu, 
    IPhoneGreen, 
    IShield, 
    ITime, 
    IMarker,
    LocationListItem
  },
  name: 'PassportMembersOverview',
  setup() {

    const { getCampByRouteParam } = useCampHelper()
    const visum = ref<Visum>()

    getCampByRouteParam().then((v: Visum) => {
      visum.value = v
    })

    const checkIfLocationsAvailable = (subCategories: SubCategory[]) => {
      const areAvailable = ref<boolean>(false)
      subCategories.forEach((sub) => {
        if (sub.checks) {
          sub.checks.forEach((check: Check) => {
            if ((check.checkParent?.checkType.checkType === 'members_leaders') && (check.value.locations.length !== 0)) {
              areAvailable.value = true
            }
          })
        }
      })

      return areAvailable.value
    }

    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    return {
      t,
      visum,
      checkIfLocationsAvailable
    }
  },
})
</script>
