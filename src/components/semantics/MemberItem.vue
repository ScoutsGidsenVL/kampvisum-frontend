<template>
  <div class="hover-edit xs:rounded-md xs:shadow-md md:border-b-2 flex flex-col md:flex-row gap-3 md:gap-0 justify-between p-2.5">
    <div class="flex gap-3 items-center">
      <i-person />
      <div>
        {{ participant.fullName }}
      </div>
      <i-pencil @click="openEditForm(participant)" v-if="!participant.isMember" class="pencil" />
    </div>

    <div class="flex justify-between md:gap-16 items-center">
      <div v-if="check.checkParent.isMultiple" @click="deleteFromList(participant)" class="hover:text-red underline cursor-pointer">
        verwijder
      </div>
      <div class="flex gap-3 items-center">
        <!-- <div class="flex gap-2 items-center font-bold">
          <input class="cursor-pointer" :value="true" v-model="participant.hasPaid" type="checkbox" id="paid" name="paid">
          <label class="cursor-pointer m-0" for="paid">betaald</label>
        </div> -->

        <!-- <div>
          <i-info :info="'to check if someone has paid or not.'" />
        </div> -->
      </div>
    </div>    
  </div>
</template>

<script lang="ts">
import { ParticipantCheckRepository } from '@/repositories/ParticipantCheckRepository'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { Member } from '../../serializer/Member'
import { defineComponent, PropType } from 'vue'
import IPerson from '../icons/IPerson.vue'
import IPencil from '../icons/IPencil.vue'
import { Check } from '@/serializer/Check'
import IInfo from '../icons/IInfo.vue'

export default defineComponent({
  name: 'MemberItem',
  components: {
    IPerson,
    IInfo,
    IPencil
  },
  props: {
    participant: {
      type: Object as PropType<Member>,
      required: true,
      default: () => { return {} }
    },
    check: {
      type: Object as PropType<Check>,
      required: true
    },
  },
  setup (props, { emit }) {

    const deleteFromList = async (p: Member) => {
      if (props.check.id) {
        await RepositoryFactory.get(ParticipantCheckRepository)
          .removeParticipantFromList(props.check.id, p.id)
          .then(() => {
            emit('actionSuccess', 'DELETE')
          })
      }
    }

    const openEditForm = (m: Member) => {
      emit('openSidebarToEdit', m)
    } 

    return {
      deleteFromList,
      openEditForm
    }
  }
})
</script>

<style lang="scss" scoped>
  .pencil {
      visibility: hidden;
      cursor: pointer;
  }

  .hover-edit:hover {
    .pencil {
      visibility: visible;
    }
  }
</style>
