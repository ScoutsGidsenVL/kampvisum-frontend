<template>
  <passport-nav-header :visum="visum" :title="t('passport.locations')" />
  <div class="text-center">
    <loader color="lightGreen" size="20" :isLoading="isFetchingVisum" />
  </div>
  <div v-if="visum" id="locations-container" class="p-3 flex flex-col gap-3">

    <div v-for="category in visum.categorySet.categories" :key="category" >
      <passport-menu 
        v-if="category.categoryParent.name === 'logistics' || category.categoryParent.name === 'safety'" 
        :title="category.categoryParent.label"
      >
        <template v-slot:title-icon>
          <i-marker  v-if="category.categoryParent.name === 'logistics'"/>
          <i-shield v-if="category.categoryParent.name === 'safety'" />
        </template>

        <template v-slot:data>
          <div  v-if="category.categoryParent.name === 'logistics' || category.categoryParent.name === 'safety'">
            <div v-if="!checkIfLocationsAvailable(category.subCategories)" class="text-center">
              {{t('checks.location-check.no-locations')}}
            </div>
          </div>

          <div v-for="subCategory in category.subCategories" :key="subCategory">
            <div v-for="check in subCategory.checks" :key="check">
              <div v-for="(location) in check.value.locations" :key="location">
                <location-list-item :location="location" />
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
import PassportMenu from '@/components/semantics/PassportMenu.vue'
import IPhoneGreen from '@/components/icons/IPhoneGreen.vue'
import { useCampHelper } from '@/helpers/campHelper'
import IShield from '@/components/icons/IShield.vue'
import IMarker from '@/components/icons/IMarker.vue'
import ITime from '@/components/icons/ITime.vue'
import { defineComponent, ref } from 'vue'
import { Visum } from '@/serializer/Visum'
import { useI18n } from 'vue-i18n'
import LocationListItem from '@/components/semantics/LocationListItem.vue'
import { SubCategory } from '@/serializer/SubCategory'
import { Check } from '@/serializer/Check'
import { Loader } from 'vue-3-component-library'

export default defineComponent({
  components: {
    Loader,
    PassportOverviewItem, 
    PassportNavHeader, 
    PassportMenu, 
    IPhoneGreen, 
    IShield, 
    ITime, 
    IMarker,
    LocationListItem
  },
  name: 'PassportLocationsOverview',
  setup() {
    const isFetchingVisum = ref<boolean>(true)

    const { getCampByRouteParam } = useCampHelper()
    const visum = ref<Visum>()

    getCampByRouteParam().then((v: Visum) => {
      visum.value = v
      isFetchingVisum.value = false
    })

    const checkIfLocationsAvailable = (subCategories: SubCategory[]) => {
      const areAvailable = ref<boolean>(false)
      subCategories.forEach((sub) => {
        if (sub.checks) {
          sub.checks.forEach((check: Check) => {
            if ((check.checkParent?.checkType.checkType === 'CampLocationCheck' || check.checkParent?.checkType.checkType === 'LocationCheck') && (check.value.locations.length !== 0)) {
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
      checkIfLocationsAvailable,
      isFetchingVisum
    }
  },
})
</script>
