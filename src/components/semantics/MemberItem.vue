<template>
  <div class="xs:rounded-md xs:shadow-md md:border-b-2 flex flex-col md:flex-row gap-3 md:gap-0 justify-between p-2.5">
    <div class="flex gap-3 items-center">
      <i-person />
      <div>
        {{ member.fullName }}
      </div>
    </div>

    <div class="flex justify-between md:gap-16 items-center">
      <div @click="deleteFromList(member)" class="hover:text-red underline cursor-pointer">
        verwijder
      </div>

      <div class="flex gap-3 items-center">
        <div class="flex gap-2 items-center font-bold">
          <input class="cursor-pointer" :value="true" v-model="member.hasPaid" type="checkbox" id="paid" name="paid">
          <label class="cursor-pointer m-0" for="paid">betaald</label>
        </div>

        <div>
          <i-info :info="'to check if someone has paid or not.'" />
        </div>
      </div>
    </div>    
  </div>
</template>

<script lang="ts">
import { MemberCheckRepository } from '@/repositories/MemberCheckRepository'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { Member } from '../../serializer/Member'
import { defineComponent, PropType } from 'vue'
import IPerson from '../icons/IPerson.vue'
import IInfo from '../icons/IInfo.vue'
import { ParticipantRepository } from '@/repositories/ParticipantRepository'

export default defineComponent({
  name: 'MemberItem',
  components: {
    IPerson,
    IInfo
  },
  props: {
    member: {
      type: Object as PropType<Member>,
      required: true,
      default: () => { return {} }
    }
  },
  setup (props, { emit }) {

    const deleteFromList = async (member: Member) => {
      await RepositoryFactory.get(ParticipantRepository)
        .removeById(member.id)
        .then(() => {
          emit('actionSuccess', 'DELETE')
        })
    }

    return {
      deleteFromList
    }
  }
})
</script>
