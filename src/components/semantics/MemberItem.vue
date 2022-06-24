<template>
  <div class="hover-edit xs:rounded-md xs:shadow-md md:border-b-2 flex flex-col md:flex-row gap-3 md:gap-0 justify-between p-2.5 bg-white">
    <div class="flex justify-between">
      <div class="flex gap-3 items-center">
        <i-person />
        <div>
          {{ participant.fullName }}
        </div>
        <div v-if="participant.inactiveMember || !participant.isMember" class="bg-red font-bold text-white rounded-full px-2">
          {{t('checks.participant-check.inActiveMember')}}
        </div>
        <div v-if="!isMin21(participant) && check.checkParent.name === 'members_leaders_responsible_21_year_old'" class="bg-red font-bold text-white rounded-full px-2">
          {{t('checks.participant-check.not-21')}}
        </div>
        <i-pencil @click="openEditForm(participant)" v-if="!participant.isMember" class="pencil" />
      </div>
      <div v-if="check.checkParent.isMultiple && checkIfIsMobileSize()" @click="deleteFromList(participant)" class="hover:text-red underline cursor-pointer">
        <i-trash />
      </div>
    </div>
    <div class="flex xs:flex-row-reverse justify-between md:gap-16 items-center">
      <div v-if="(check.checkParent.isMultiple && !checkIfIsMobileSize())" @click="deleteFromList(participant)" class="hover:text-red underline cursor-pointer">
        <i-trash />
      </div>
      <div v-if="!(check.checkParent.checkType.checkType === 'ParticipantCheck')" class="flex gap-3 items-center">
        <div class="flex gap-2 items-center font-bold">
          <input :disabled="isPatchingPayment"  class="cursor-pointer" :value="true" v-model="participant.hasPaid" type="checkbox" id="paid" name="paid">
          <label class="cursor-pointer m-0" for="paid">{{t('checks.participant-check.paid')}}</label>
        </div>
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
import { defineComponent, PropType, watch, ref } from 'vue'
import IPerson from '../icons/IPerson.vue'
import IPencil from '../icons/IPencil.vue'
import { Check } from '@/serializer/Check'
import ITrash from '../icons/ITrash.vue'
import IInfo from '../icons/IInfo.vue'
import { useI18n } from 'vue-i18n'
import { usePhoneHelper } from '@/helpers/phoneHelper'

export default defineComponent({
  name: 'MemberItem',
  components: {
    IPerson,
    IInfo,
    IPencil,
    ITrash,
  },
  props: {
    participant: {
      type: Object as PropType<Member>,
      required: true,
      default: () => {
        return {}
      },
    },
    check: {
      type: Object as PropType<Check>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { checkIfIsMobileSize } = usePhoneHelper()
    const deleteFromList = async (p: Member) => {
      if (props.check.id) {
        await RepositoryFactory.get(ParticipantCheckRepository)
          .removeParticipantFromList(props.check.id, p.id)
          .then(() => {
            emit('actionSuccess', 'DELETE')
          })
      }
    }

    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    const openEditForm = (m: Member) => {
      emit('openSidebarToEdit', m)
    }

    const isPatchingPayment = ref<boolean>(false)

    watch(() => props.participant.hasPaid, () => {
      if (props.check.id && !isPatchingPayment.value) {
        isPatchingPayment.value = true
        RepositoryFactory.get(ParticipantCheckRepository)
          .toggleHasPaid(props.check.id, props.participant.wrapperId)
          .then(() => {
            isPatchingPayment.value = false
          })
      }
    })


    const isMin21 = (participant: Member) => {
      const currentYear = new Date().getFullYear();
      var x = currentYear - Number(participant.birthDate.slice(0,4))
      if (x >= 21 ) {
        return true
      } else {
        return false
      }
    }

    return {
      checkIfIsMobileSize,
      isPatchingPayment,
      deleteFromList,
      openEditForm,
      t,
      isMin21
    }
  },
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
