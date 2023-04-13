<template>
  <span class="italic font-bold">filters</span>
  <div class="border-2 p-2 rounded-md">
    <div v-if="isFilterMenuOpen">
      <div class="md:hidden float-right">
        <cross v-if="filter.year || filter.startDate || filter.endDate || filter.groupNumber" @click="clearFilters()" class="cursor-pointer" />
      </div>
      <div class="flex xs:flex-col xs:gap-2">
        <div class="flex" style="md:margin-left: 110px">
          <div class="flex xs:flex-col pt-3 gap-4 -mt-4 xs:w-full">
            <!-- YEAR -->
            <div class="flex flex-col">
              <span class="text-base font-bold" >{{t('location-overview.filters.year')}}</span>
              <input  v-model="filter.year" class="appearance-none border rounded py-2 pl-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <!-- STARTDATE -->
            <div class="flex flex-col">
              <span class="text-base font-bold" >{{t('location-overview.filters.start-date')}}</span>
              <input type="date"  v-model="filter.startDate" class="appearance-none border rounded py-2 pl-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>

            <div class="flex flex-col">
              <span class="text-base font-bold" >{{t('location-overview.filters.end-date')}}</span>
              <input type="date"  v-model="filter.endDate" class="appearance-none border rounded py-2 pl-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">            
            </div>

            <div class="flex flex-col">
              <span class="text-base font-bold" >{{t('location-overview.filters.group-number')}}</span>
              <input  v-model="filter.groupNumber" class="appearance-none border rounded py-2 pl-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">            
            </div>
            <div class="flex flex-col justify-end pb-2">
              <custom-button-small :disabled="!filter.groupNumber" class="w-100" :class="!filter.groupNumber ? 'opacity-50' : ''" :extraStyle="'w-100'" @click="filtersChanged()" :isSubmitting="false" :text="t('location-overview.filters.search')"></custom-button-small>
            </div>
            <div class="flex flex-col justify-end pb-3">
              <cross v-if="filter.year || filter.startDate || filter.endDate || filter.groupNumber" @click="clearFilters()" class="cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
      </div>
      <div v-if="checkIfIsMobileSize()" @click="toggleFilterMenu()" class="my-1 flex justify-center">
        <i-chevon-down v-if="!isFilterMenuOpen" />
        <i-chevon-up v-if="isFilterMenuOpen" />
      </div>
  </div>
</template>

<script lang="ts">
import IChevonDown from '../icons/IChevonDown.vue'
import { defineComponent, ref } from 'vue'
import { LocationFilter } from '../../serializer/Filter'
import { CustomButtonSmall } from 'vue-3-component-library'
import Cross from '../icons/Cross.vue'
import { useI18n } from 'vue-i18n'
import IChevonUp from '../icons/IChevonUp.vue'
import { usePhoneHelper } from '@/helpers/phoneHelper'



export default defineComponent({
  components: { Cross, IChevonDown, IChevonUp, CustomButtonSmall },
  name: 'LocationFilter',
  props: {
  },
  setup (props, { emit }) {
    const { checkIfIsMobileSize } = usePhoneHelper()
    const d = new Date()
    let year = d.getFullYear();

    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    const isFilterMenuOpen = ref<boolean>(true)

    const filter = ref<LocationFilter>({ year: year.toString(), startDate: '', endDate: '', groupName: '', groupNumber: '', country: '' })
    
    const filtersChanged = () => {
      emit('changedFilters', filter.value)
    }

    const clearFilters = () => {
      filter.value = { year: '', startDate: '', endDate: '', groupName: '', groupNumber: '', country: '' }
      emit('changedFilters', filter.value)
    }

    const toggleFilterMenu = () => {
      isFilterMenuOpen.value = !isFilterMenuOpen.value
    }

    return {
      checkIfIsMobileSize,
      filtersChanged,
      toggleFilterMenu,
      isFilterMenuOpen,
      clearFilters,
      filter,
      t
    }
  }
})
</script>
