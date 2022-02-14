<template>
  <div class="grid grid-cols-4 p-2 border-b border-black text-black">
    <div>{{groupSection.name.name}}</div>
    <div class="text-center">{{genderLabel(groupSection.name.gender)}}</div>
    <div>{{ageGroupLabel(groupSection.name.ageGroup)}}</div>
    
    <div class="flex justify-end gap-5">
      <div>
        <i-pencil @click="edit(groupSection)" class="text-green cursor-pointer" />
      </div>
      <div>
        <cross @click="remove(groupSection)" class="text-red cursor-pointer" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useSectionsHelper } from '@/helpers/sectionsHelper'
import { defineComponent, PropType } from 'vue'
import { Section } from '@/serializer/Section'
import IPencil from '../icons/IPencil.vue'
import Cross from '../icons/Cross.vue'

export default defineComponent({
  name: 'SectionItem',
  components:{
    Cross, 
    IPencil,
  },
  emits: ['removeSection', 'editSection'],
  props: {
    groupSection: {
      type: Object as PropType<Section>,
      required: true
    }
  },
  setup (props, { emit }) {
    const { genderLabel, ageGroupLabel } = useSectionsHelper()
    const remove = (section: Section) => {
      emit('removeSection', section)
    }
    const edit = (section: Section) => {
      emit('editSection', section)
    }
    return {
      genderLabel,
      edit, 
      remove,
      ageGroupLabel
    }
  }
})
</script>
