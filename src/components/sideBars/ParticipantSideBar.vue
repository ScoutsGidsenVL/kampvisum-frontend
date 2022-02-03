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
            <custom-input :disabled="isPatching" :type="InputTypes.TEXT" rules="required" name="firstName" label="Voornaam" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :disabled="isPatching" :type="InputTypes.TEXT" rules="required" name="lastName" label="Achternaam" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :disabled="isPatching" :type="InputTypes.TEXT" rules="required" name="email" label="Email" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :disabled="isPatching" :type="InputTypes.TEXT" rules="required" name="phoneNumber" label="Gsm" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :disabled="isPatching" :type="InputTypes.TEXT" rules="required" name="city" label="Stad" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :disabled="isPatching" :type="InputTypes.TEXT" rules="required" name="postalCode" label="Postcode" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :disabled="isPatching" :type="InputTypes.TEXT" rules="required" name="street" label="Straat" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :disabled="isPatching" :type="InputTypes.TEXT" maxlength="5" rules="required" name="number" label="Nr" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :disabled="isPatching" :type="InputTypes.TEXT" maxlength="5" name="letterBox" label="Bus" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :disabled="isPatching" :type="InputTypes.DATE" rules="required" name="birthDate" label="Geboortedatum" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :disabled="isPatching" :type="InputTypes.TEXT_AREA" name="comment" label="Opmerking" />
          </div>
        </div>

        <div class="mt-5 py-4 sticky bottom-0 bg-white pl-3" style="margin-left: -20px; margin-right: -20px">
          <custom-button :isSubmitting="isPatching" :text="sideBarState.state === 'edit' ? 'Bewerk' : 'Voeg toe'" />
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
          <participant-filter @changedFilters="changedFilters($event)" />
        </div>
        <div class="p-4">
          <search-input :filter="filter" v-model:loading="loading" name="search" placeholder="Zoek op naam" :repository="ParticipantRepository" @fetchedOptions="fetchedSearchResults($event)" />
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
          <custom-button :disabled="!(fetchedMembers.some((f) => f.isChecked === true))" :isSubmitting="isPatching" text="VOEG TOE" />
        </div>
      </form>
    </base-side-bar>
  </div>
</template>

<script lang="ts">
import { BaseSideBar, sideBarState, InputTypes, CustomInput, CustomButton, option } from 'vue-3-component-library'
import { ParticipantCheckRepository } from '@/repositories/ParticipantCheckRepository'
import { ParticipantRepository } from '@/repositories/ParticipantRepository'
import { computed, defineComponent, PropType, ref, toRefs, watch } from 'vue'
import { MemberRepository } from '../../repositories/MemberRepository'
import MemberSidebarItem from '../semantics/MemberSidebarItem.vue'
import { useSelectionHelper } from '../../helpers/selectionHelper'
import RepositoryFactory from '@/repositories/repositoryFactory'
import SearchInput from '../inputs/SearchInput.vue'
import { Member } from '@/serializer/Member'
import { Check } from '@/serializer/Check'
import { Visum } from '@/serializer/Visum'
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import ParticipantFilter from '../semantics/ParticipantFilter.vue'
import { Filter } from '../../serializer/Filter'

export default defineComponent({
  name: 'ParticipantSideBar',
  components: {
    'base-side-bar': BaseSideBar,
    SearchInput,
    CustomInput,
    CustomButton,
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
    const selected = computed(() => (props.sideBarState.state === 'new' ? 'newParticipantSidebar' : 'searchParticipantSidebar'))
    const { resetForm, values, isSubmitting, handleSubmit } = useForm<Member>()
    const { displayCheck, checkForIdMatch } = useSelectionHelper()
    const fetchedMembers = ref<Member[]>([])
    const { sideBarState } = toRefs(props)
    const isPatching = ref<boolean>(false)
    const loading = ref<boolean>(false)
    const filter = ref<Filter>()

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
        console.log('r: ', r)
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
      t,
      changedFilters,
      filter
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
