<template>
  <span class="italic font-bold">filters</span>
  <div class="border-2 p-2 rounded-md">
      <div class="md:hidden float-right">
        <cross v-if="filter.gender || filter.ageMin || filter.ageMax" @click="clearFilters()" class="cursor-pointer" />
      </div>
      <div class="flex xs:flex-col md:gap-4 xs:gap-2">
        <div class="flex" style="md:margin-left: 110px">
          <div class="flex xs:flex-col pt-3 gap-4 -mt-4">
            <!-- <input @input="filtersChanged()" v-model="filter.ageMin" :placeholder="t('location-overview.filters.')" type="number" style="width:115px" class="appearance-none border rounded py-2 pl-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"> -->
            <!-- <input @input="filtersChanged()" v-model="filter.ageMax" :placeholder="t('location-overview.participant-sidebar.filter.max-age')" type="number" style="width:120px" class="appearance-none border rounded py-2 pl-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"> -->
            <!-- <input @input="filtersChanged()" v-model="filter.ageMax" :placeholder="t('location-overview.participant-sidebar.filter.max-age')" type="number" style="width:120px" class="appearance-none border rounded py-2 pl-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"> -->
          </div>
          <div class="ml-3 xs:hidden">
            <cross v-if="filter.gender || filter.ageMin || filter.ageMax" @click="clearFilters()" class="cursor-pointer" />
          </div>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import IChevonDown from '../icons/IChevonDown.vue'
import { defineComponent, ref, watch } from 'vue'
import { Filter } from '../../serializer/Filter'
import Cross from '../icons/Cross.vue'
import { useI18n } from 'vue-i18n'
import IChevonUp from '../icons/IChevonUp.vue'
import { usePhoneHelper } from '@/helpers/phoneHelper'

export default defineComponent({
  components: { Cross, IChevonDown, IChevonUp },
  name: 'LocationFilter',
  props: {
  },
  setup (props, { emit }) {
const { checkIfIsMobileSize } = usePhoneHelper()

    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    const filter = ref<any>({ year: '', ageMin: '', ageMax: '', type: '' })

    watch(() => filter.value.gender, () => {
      emit('changedFilters', filter.value)
    })
    
    const filtersChanged = () => {
      emit('changedFilters', filter.value)
    }

    const clearFilters = () => {
      filter.value.gender = ''
      filter.value.ageMin = ''
      filter.value.ageMax = ''
      emit('changedFilters', filter.value)
    }

    return {
      checkIfIsMobileSize,
      clearFilters,
      filter,
      t
    }
  }
})
</script>
