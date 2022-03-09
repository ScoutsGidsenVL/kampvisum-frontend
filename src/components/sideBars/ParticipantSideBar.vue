<template>
  <div>
    <base-side-bar
      width="max-w-2xl"
      maxWidth="max-w-2xl"
      :isOverflowHidden="true"
      :selection="selected"
      :is-display="sideBarState.state !== 'hide'"
      :is-edit="sideBarState.state === 'edit'"
      name="ParticipantSidebar"
      title="Lid"
      :options="options"
      @options="changeSideBar"
      @hideSidebar="closeSideBar"
    >
      <!-- CREATE -->
      <form
        id="ParticipantForm"
        ref="formDiv"
        :class="{ 'd-flex': sideBarState.state === 'new' || sideBarState.state === 'edit', 'd-none': sideBarState.state === 'search' }"
        class="flex-col relative overflow-y-scroll h-full px-4 pt-3"
        @submit.prevent="onSubmit"
      >
        <div class="mt-4">
          <div class="w-100">
            <custom-input :disabled="isPatching" :type="InputTypes.TEXT" rules="required" name="firstName" :label="t('sidebars.participant-sidebar.firstName')" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :disabled="isPatching" :type="InputTypes.TEXT" rules="required" name="lastName" :label="t('sidebars.participant-sidebar.lastName')" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :disabled="isPatching" :type="InputTypes.TEXT" name="email" :label="t('sidebars.participant-sidebar.email')" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :disabled="isPatching" :type="InputTypes.TEXT" name="phoneNumber" :label="t('sidebars.participant-sidebar.phone')" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :disabled="isPatching" :type="InputTypes.TEXT" name="city" :label="t('sidebars.participant-sidebar.city')" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :disabled="isPatching" :type="InputTypes.TEXT" name="postalCode" :label="t('sidebars.participant-sidebar.postcode')" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :disabled="isPatching" :type="InputTypes.TEXT" name="street" :label="t('sidebars.participant-sidebar.street')" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :disabled="isPatching" :type="InputTypes.TEXT" maxlength="5" name="number" :label="t('sidebars.participant-sidebar.nr')" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :disabled="isPatching" :type="InputTypes.TEXT" maxlength="5" name="letterBox" :label="t('sidebars.participant-sidebar.mailbox')" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :disabled="isPatching" :type="InputTypes.DATE" rules="required" name="birthDate" :label="t('sidebars.participant-sidebar.birthdate')" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :disabled="isPatching" :type="InputTypes.TEXT_AREA" name="comment" :label="t('sidebars.participant-sidebar.comment')" />
          </div>
        </div>

        <div class="mt-5 py-4 sticky bottom-0 bg-white pl-3" style="margin-left: -20px; margin-right: -20px">
          <custom-button-small :isSubmitting="isPatching" :text="sideBarState.state === 'edit' ? t('sidebars.participant-sidebar.edit') : t('sidebars.participant-sidebar.add')" />
        </div>
      </form>
      <!-- SEARCH -->
      <form
        id="SearchForm"
        ref="searchFormDiv"
        :class="{ 'd-none': sideBarState.state === 'new' || sideBarState.state === 'edit', 'd-flex': sideBarState.state === 'search' }"
        class="flex-col h-full"
        @submit.prevent="onSubmit"
      >
        <div class="px-4 pt-4 pb-1">
          <participant-filter ref="filterChild2" @changedFilters="changedFilters($event)" />
        </div>
        <div @click="filterChild2.closeFilterMenu" class="p-4">
          <search-input :filter="filter" v-model:loading="loading" name="search" :placeholder="t('sidebars.participant-sidebar.search')" :repository="ParticipantRepository" @fetchedOptions="fetchedSearchResults($event)" />
        </div>
        <div class="mx-1 mb-72 overflow-y-auto">
          <div class="mx-4">
            <div
              v-for="(member, index) in fetchedMembers"
              :key="member"
              :class="{ 'border-t-2 border-black': index === 0 }"
              class="py-1 w-full shadow-md border-b-2 border-black bg-white p-2 inline-block text-left d-flex flex-col justify-content-between"
            >
              <member-sidebar-item :displayCheck="displayCheck(check.checkParent.isMultiple, member, fetchedMembers)" :member="member" />
            </div>
          </div>
        </div>
        <div class="mt-5 py-4 px-4 absolute bottom-0 bg-white w-full">
          <CustomButtonSmall :disabled="!(fetchedMembers.some((f) => f.isChecked === true))" :isSubmitting="isPatching" :text="t('sidebars.participant-sidebar.add')" />
        </div>
      </form>
    </base-side-bar>
  </div>
</template>

<script lang="ts">
import { BaseSideBar, InputTypes, CustomInput, CustomButtonSmall, option } from 'vue-3-component-library'
import { ParticipantCheckRepository } from '@/repositories/ParticipantCheckRepository'
import { computed, defineComponent, PropType, ref, toRefs, watch } from 'vue'
import { ParticipantRepository } from '@/repositories/ParticipantRepository'
import { MemberRepository } from '../../repositories/MemberRepository'
import MemberSidebarItem from '../semantics/MemberSidebarItem.vue'
import { useSelectionHelper } from '../../helpers/selectionHelper'
import ParticipantFilter from '../semantics/ParticipantFilter.vue'
import RepositoryFactory from '@/repositories/repositoryFactory'
import SearchInput from '../inputs/SearchInput.vue'
import { Filter } from '../../serializer/Filter'
import { Member } from '@/serializer/Member'
import { Check } from '@/serializer/Check'
import { Visum } from '@/serializer/Visum'
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ParticipantSideBar',
  components: {
    'base-side-bar': BaseSideBar,
    SearchInput,
    CustomInput,
    CustomButtonSmall,
    MemberSidebarItem,
    ParticipantFilter,
  },
  props: {
    sideBarState: {
      type: Object as PropType<any>,
      required: true,
      default: () => {
        'hide'
      },
    },
    check: {
      type: Object as PropType<Check>,
      required: true
    },
    visum: {
      type: Object as PropType<Visum>,
      required: true,
    },
  },
  emits: ['update:sideBarState', 'actionSuccess'],
  setup(props, context) {
    const filterChild2 = ref<any>(null)
    const selected = computed(() => (props.sideBarState.state === 'new' ? 'newParticipantSidebar' : 'searchParticipantSidebar'))
    const { resetForm, values, isSubmitting, handleSubmit } = useForm<Member>()
    const { displayCheck, checkForIdMatch } = useSelectionHelper()
    const fetchedMembers = ref<Member[]>([])
    const { sideBarState } = toRefs(props)
    const isPatching = ref<boolean>(false)
    const loading = ref<boolean>(false)
    const filter = ref<Filter>({ gender: '', ageMin: '', ageMax: '', type: props.check.value.participantCheckType })

    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    const options = ref<option[]>([
      { text: 'Zoek', value: 'search' },
      { text: 'Nieuw', value: 'new' },
    ])

    const closeSideBar = () => {
      context.emit('update:sideBarState', { state: 'hide' })
      resetForm()
    }

    const onSubmit = async () => {
      // await validate().then((validation: any) => scrollToFirstError(validation, 'addNewCamp'))
      if (props.sideBarState.state === 'search') {
        patchMembers(fetchedMembers.value)
      }

      if (props.sideBarState.state === 'edit') {
          await updateParticipant(values)
      }

      handleSubmit(async (values: Member) => {
        if (props.sideBarState.state === 'new') {
          values.groupGroupAdminId = props.visum.groupGroupAdminId
          await postParticipant(values)
        }
      })()
    }

    const updateParticipant = async (member: Member) => {
      if (member.id && props.sideBarState) {
        isPatching.value = true
        await RepositoryFactory.get(ParticipantRepository)
          .update(member.id, member)
          .then(() => {
            context.emit('actionSuccess', 'UPDATE')
            isPatching.value = false
            closeSideBar()
          })
      }
    }

    const patchMembers = async (members: Member[]) => {
      isPatching.value = true
      await RepositoryFactory.get(ParticipantCheckRepository)
        .update(props.check.endpoint, members)
        .then(() => {
          context.emit('actionSuccess', 'PATCH')
          isPatching.value = false
          closeSideBar()
        })
    }

    const postParticipant = async (participant: Member) => {
      await RepositoryFactory.get(ParticipantRepository)
        .create(participant)
        .then((m: Member) => {
          context.emit('actionSuccess', 'POST')
          m.isChecked = true
          patchMembers([m])
        })
    }

    const fetchedSearchResults = (results: Member[]) => {
      //ALSO CHECK ALREADY ADDED MEMBERS IN SEARCH RESULTS
      props.check.value.participants.forEach((alreadyAddedMember: Member) => {
        results.forEach((member: Member) => {
          if (member.id === alreadyAddedMember.id) {
            member.isChecked = true
          }
        })
      });
      
      loading.value = false
      //KEEP THE CHECKED MEMBERS
      let checkedMembers: Member[] = []

      fetchedMembers.value.forEach((fetchedMember: Member) => {
        if (fetchedMember.isChecked) {
          checkedMembers.push(fetchedMember)
        }
      })

      //SET CHECKED MEMBERS
      fetchedMembers.value = checkedMembers

      //ADD FETCHED RESULTS ONLY IF IT'S NOT ALREADY CHECKED
      results.forEach((r: Member) => {
        if (!(fetchedMembers.value.some((f: Member) => checkForIdMatch(f,r)))) {
          fetchedMembers.value.push(r)
        }
      })
    }

    const changeSideBar = (options: 'newParticipantSidebar' | 'searchParticipantSidebar') => {
      if (options === 'newParticipantSidebar') {
        context.emit('update:sideBarState', { state: 'new' })
      }

      if (options === 'searchParticipantSidebar') {
        context.emit('update:sideBarState', { state: 'search' })
      }
    }

    const changedFilters = (f: Filter) => {
      filter.value = f
    }

    watch(() => props.sideBarState, () => {
      if (props.sideBarState.entity) {
      let m: Member = props.sideBarState.entity
      values.id = m.id
      values.firstName = m.firstName
      values.lastName = m.lastName
      values.email = m.email
      values.phoneNumber = m.phoneNumber
      values.city = m.city
      values.postalCode = m.postalCode
      values.street = m.street
      values.number = m.number
      values.letterBox = m.letterBox
      values.birthDate = m.birthDate
      values.comment = m.comment
      }
    })

    return {
      ParticipantRepository,
      fetchedSearchResults,
      MemberRepository,
      fetchedMembers,
      changedFilters,
      changeSideBar,
      isSubmitting,
      sideBarState,
      closeSideBar,
      displayCheck,
      InputTypes,
      isPatching,
      selected,
      onSubmit,
      loading,
      options,
      values,
      filter,
      t,
      filterChild2
    }
  },
})
</script>

<style lang="scss" scoped>
/* width */
::-webkit-scrollbar {
  width: 5px;
  margin-left: 20x;
  padding-left: 20px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #ececec;
  border-radius: 10px;
  margin-left: 20x;
  padding-left: 20px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #212529;
  border-radius: 10px;
  margin-left: 20x;
  padding-left: 20px;
}
</style>
