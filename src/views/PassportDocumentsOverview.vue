<template>
  <passport-nav-header :visum="visum" :title="'Documenten'" />
  <div v-if="visum" id="documents-container" class="p-3 flex flex-col gap-5">

    <div v-for="category in visum.categorySet.categories" :key="category" >
        <!-- {{category.categoryParent}} -->
      <passport-menu :title="category.categoryParent.label">
        <template v-slot:title-icon>
          <i-calendar v-if="category.categoryParent.name === 'planning'" />
          <i-marker  v-if="category.categoryParent.name === 'logistics'"/>
          <i-shield v-if="category.categoryParent.name === 'safety'" />
          <i-euro v-if="category.categoryParent.name === 'budget'" />
          <i-users v-if="category.categoryParent.name === 'members_leaders'" />
          <i-puzzle v-if="category.categoryParent.name === 'communication_agreements'" />
        </template>

        <template v-slot:data>
          
          <div class="text-center" v-if="!checkIfFilesAvailable(category.subCategories)">
            {{t('checks.document-check.no-uploaded-files')}}
          </div>

          <div v-for="subCategory in category.subCategories" :key="subCategory">
            
            <div v-for="check in subCategory.checks" :key="check">
              <div v-if="check.checkParent.checkType.checkType === 'FileUploadCheck'">
                <div v-for="file in check.value" :key="file">
                  <file-item :canBeDeleted="true" :file="file" :check="check" @actionSuccess="actionSuccess($event)" />
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
import PassportMenu from '@/components/semantics/PassportMenu.vue'
import IPhoneGreen from '@/components/icons/IPhoneGreen.vue'
import ICalendar from '@/components/icons/ICalendar.vue'
import FileItem from '@/components/upload/FileItem.vue'
import { SubCategory } from '@/serializer/SubCategory'
import { useCampHelper } from '@/helpers/campHelper'
import IMarker from '@/components/icons/IMarker.vue'
import IShield from '@/components/icons/IShield.vue'
import IPuzzle from '@/components/icons/IPuzzle.vue'
import IUsers from '@/components/icons/IUsers.vue'
import ITime from '@/components/icons/ITime.vue'
import IEuro from '@/components/icons/IEuro.vue'
import { defineComponent, ref } from 'vue'
import { Visum } from '@/serializer/Visum'
import { Check } from '@/serializer/Check'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  components: {PassportOverviewItem, IPhoneGreen, ITime, PassportNavHeader, PassportMenu, ICalendar, IMarker, IShield, IEuro, IUsers, IPuzzle, FileItem},
  name: 'PassportDocumentsOverview',
  setup() {

    const { getCampByRouteParam } = useCampHelper()
    const visum = ref<Visum>()

    getCampByRouteParam().then((v: Visum) => {
      visum.value = v
    })

    const checkIfFilesAvailable = (subCategories: SubCategory[]) => {
      const areAvailable = ref<boolean>(false)
      subCategories.forEach((sub) => {
        if (sub.checks) {
          sub.checks.forEach((check: Check) => {
            if (check.checkParent?.checkType.checkType === 'FileUploadCheck' && (check.value.length !== 0)) {
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
      checkIfFilesAvailable
    }
  },
})
</script>
