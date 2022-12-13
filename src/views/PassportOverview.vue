<template>
  <div v-if="visum" class="p-3">
    <h1>{{ visum.camp.name }}</h1>


    <h4 class="inline text-green font-aglet font-light">
      {{ getSectionsTitle(visum.camp) }}
    </h4>

    <div v-if="isInternetActive">
      <div v-if="!idbVisum" class="mt-3 bg-orange hover:bg-lightOrange text-center py-2 cursor-pointer">
        <div @click="setVisumOffline()">{{t('passport.download-camp-offline')}}</div>
      </div>

      <div v-if="visum && idbVisum" class="mt-3 text-center py-2">
        <div v-if="!isObjEq(visum, idbVisum)" @click="syncVisumOffline()" class="bg-orange hover:bg-lightOrange cursor-pointer">{{t('passport.sync-camp-offline')}}</div>
        <div v-if="isObjEq(visum, idbVisum)" class="bg-lightGreen">{{t('passport.success-camp-offline')}}</div>
      </div>
    </div>

    <div class="border border-lightGray p-3 flex items-center gap-2 my-3">
      <i-time /> <div v-if="remainingDays">Nog {{remainingDays}} dagen kamp</div> <div v-else>{{t('passport.no-end-date')}}</div>
    </div>

    <passport-overview-item :title="t('passport.documents')" :navText="'Alle documenten'" :navUrl="'documenten'" :visum="visum" />
    <passport-overview-item :title="t('passport.locations')" :navText="'Alle locaties'" :navUrl="'locaties'" :visum="visum" />
    <passport-overview-item :title="t('passport.members')" :navText="'Alle leden'" :navUrl="'leden'" :visum="visum" />

    <div class="border border-lightGray p-3 flex gap-2 items-center mt-3">
      <i-phone-green />
      <a href="tel: +3232311620">+32 3 231 16 20</a>
    </div>
  </div>
</template>

<script lang="ts">
import PassportOverviewItem from '@/components/semantics/PassportOverviewItem.vue'
import { useSectionsHelper } from '@/helpers/sectionsHelper'
import { useCampHelper } from '@/helpers/campHelper'
import { Visum } from '@/serializer/Visum'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import IPhoneGreen from '@/components/icons/IPhoneGreen.vue'
import ITime from '@/components/icons/ITime.vue'
import { useOfflineData } from '@/composable/useOfflineData'
import { useInternetHelper } from '@/helpers/internetHelper'
import { Category } from '@/serializer/Category'
import { SubCategory } from '@/serializer/SubCategory'
import { Check } from '@/serializer/Check'
const { DateTime } = require("luxon");
import axios from 'axios'

export default defineComponent({
  components: {PassportOverviewItem, IPhoneGreen, ITime},
  name: 'PassportOverview',
  setup() {
    const { getSectionsTitle } = useSectionsHelper()
    const { getCampByRouteParam } = useCampHelper()
    const { addVisum, getVisums, getVisum, updateVisum, addFile } = useOfflineData()
    const { isInternetActive } = useInternetHelper()

    const visum = ref<any>()
    const idbVisum = ref<any>(null)

    const remainingDays = ref<string>('0')

    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    window.scrollTo({ top: 0, behavior: 'auto' })

    getCampByRouteParam().then((v: Visum) => {
      visum.value = v
      daysRemaining()
      // getVisum(visum.value.id).then((result) => {
      //   idbVisum.value = result
      // })
    })

    function daysRemaining() {
      var endDate = visum.value.categorySet.categories[0].subCategories[0].checks[0].value.endDate
      if (endDate) {
        var eventdate = DateTime.fromISO(endDate);
        var todaysdate = DateTime.now();
        remainingDays.value = Math.ceil(eventdate.diff(todaysdate, 'days').values.days).toString();
      } else {
        remainingDays.value = ''
      }
    }

    const setVisumOffline = () => {
      addVisum(JSON.parse(JSON.stringify(visum.value))).then(() => {
        getVisum(visum.value.id).then((result) => {
          idbVisum.value = result
          saveVisumOffline()
        })
      })
    }

    const saveVisumOffline = () => {
      updateVisum(JSON.parse(JSON.stringify(visum.value))).then((res: any) => {
        res.data.categorySet.categories.forEach((category: Category) => {
        if (category.subCategories) {
          category.subCategories.forEach((subCategory: SubCategory) => {
            if (subCategory.checks) {
              subCategory.checks.forEach((check: Check) => {
                if (check.checkParent && check.checkParent.checkType.checkType === 'FileUploadCheck') {
                  check.value.forEach((file: any) => {
                    axios({
                        url: file.url,
                        method: 'GET',
                        responseType: 'blob',
                      }).then((response: any) => {
                      addFile(file.id, { name: file.name, data: response.data})
                    })
                  })
                }
              })
            }
          })
        }
      })

        getVisum(visum.value.id).then((result) => {
          idbVisum.value = result
        })
      })
    }

    const syncVisumOffline = () => {
      saveVisumOffline()
    }

    function replacer(key: any, value: any) {
      // Filtering out properties
      if (key === 'url' || key === 'file') {
        return undefined;
      }
      return value;
    }

    const isObjEq = (val1:any, val2:any) => {
      if (JSON.stringify(val1, replacer) === JSON.stringify(val2, replacer)) {
        return true
      } else {
        return false
      }
    }


    return {
      t,
      visum,
      getSectionsTitle,
      remainingDays,
      setVisumOffline,
      getVisums,
      idbVisum,
      isInternetActive,
      syncVisumOffline,
      isObjEq
    }
  },
})
</script>
