<template>
<span class="italic font-bold">filters</span>
  <div class="border-2 p-2 rounded-md">
    <div class="md:hidden float-right">
      <cross v-if="filter.gender || filter.ageMin || filter.ageMax" @click="clearFilters()" class="cursor-pointer" />
    </div>
    <div class="flex xs:flex-col md:gap-4 xs:gap-2">
      <div v-for="option in options" :key="option" class="flex items-center gap-1 mr-0.5">
        <input class="cursor-pointer" type="radio" :id="option.value" :value="option.value" v-model="filter.gender">
        <label class="cursor-pointer mb-0" :for="option.value">{{option.label}}</label>
      </div>
      <div class="flex" style="margin-left: 110px">
        <div class="flex xs:flex-col pt-3 gap-4 -mt-4">
          <input @input="changedAge()" v-model="filter.ageMin" placeholder="Min leeftijd" type="number" style="width:115px" class="appearance-none border rounded py-2 pl-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <input @input="changedAge()" v-model="filter.ageMax" placeholder="Max leeftijd" type="number" style="width:120px" class="appearance-none border rounded py-2 pl-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="ml-3 xs:hidden">
          <cross v-if="filter.gender || filter.ageMin || filter.ageMax" @click="clearFilters()" class="cursor-pointer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { Filter } from '../../serializer/Filter'
import Cross from '../icons/Cross.vue'
  const delay = require('delay');

export default defineComponent({
  components: { Cross },
  name: 'ParticipantFilter',
  props: {
  },
  setup (props, { emit }) {
    const options = ref<any>([{value: 'M', label: 'Man'}, {value: 'F', label: 'Vrouw'}, {value: 'X', label: 'Andere'}])
    const filter = ref<Filter>({ gender: '', ageMin: '', ageMax: '' })
    let debounce: any

    watch(() => filter.value.gender, () => {
      emit('changedFilters', filter.value)
    })
    
    const changedAge = () => {
      emit('changedFilters', filter.value)
    }

    const clearFilters = () => {
      filter.value.gender = ''
      filter.value.ageMin = ''
      filter.value.ageMax = ''
      emit('changedFilters', filter.value)
    }

    return {
      filter,
      options,
      clearFilters,
      changedAge
    }
  }
})
</script>
