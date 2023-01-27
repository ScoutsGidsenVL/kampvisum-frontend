<template>
  <div>
    <base-side-bar
      width="max-w-2xl"
      :is-display="sideBarState.state !== 'hide'"
      :is-edit="sideBarState.state === 'edit'"
      :isOverflowHidden="true"
      @hideSidebar="closeSideBar"
      :selection="selected"
      maxWidth="max-w-2xl"
      name="MemberSidebar"
      title="Lid"
    >
    <form
        class="flex flex-col h-full"
        id="memberForm"
        ref="formDiv"
        @submit.prevent="onSubmit"
      >
        <div class="px-4 pt-4 pb-1">
          <participant-filter ref="filterChild" @changedFilters="changedFilters($event)" />
        </div>

        <div @click="filterChild.closeFilterMenu" class="p-4 mx-1">
          <search-input :filter="filter" @changedFilters='changedFilters($event)' v-model:loading="loading" name="search" :placeholder="t('checks.participant-check.search')" :repository="MemberRepository" @fetchedOptions="fetchedSearchResults($event)" />
        </div>

        <div v-if="fetchedMembers.length > 0 && check.value.participantCheckType === 'M'" class="flex justify-end px-4 pb-3">
          <div @click="selectAllFetchedMembers()" class="bg-green text-white px-2 py-1 cursor-pointer" style="width: fit-content">
            {{t('sidebars.member-sidebar.select-all')}}
          </div>
        </div>

        <div v-if="loading" class="text-center py-5">
          <loader color="lightGreen" size="10" :isLoading="loading" />
        </div>

        <div v-if="filterChild && (!filterChild.isFilterMenuOpen || checkIfIsMobileSize() === false)" class="mx-1 mb-72 overflow-y-auto">
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
          <custom-button-small :disabled="!(fetchedMembers.some((f) => f.isChecked === true))" :isSubmitting="isPatching" :text="t('checks.participant-check.add-without-plus')" />
        </div>
    </form>
    </base-side-bar>
  </div>
</template>

<script lang="ts">
import { ParticipantCheckRepository } from '@/repositories/ParticipantCheckRepository'
import { BaseSideBar, sideBarState, InputTypes, Loader } from 'vue-3-component-library'
import { MemberRepository } from '../../repositories/MemberRepository'
import { computed, defineComponent, PropType, ref, toRefs } from 'vue'
import MemberSidebarItem from '../semantics/MemberSidebarItem.vue'
import { useSelectionHelper } from '../../helpers/selectionHelper'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { CustomButtonSmall } from 'vue-3-component-library'
import SearchInput from '../inputs/SearchInput.vue'
import { Member } from '@/serializer/Member'
import { Check } from '@/serializer/Check'
import { Visum } from '@/serializer/Visum'
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import ParticipantFilter from '../semantics/ParticipantFilter.vue'
import { Filter } from '../../serializer/Filter'
import { usePhoneHelper } from '@/helpers/phoneHelper'
import { BaseMember } from '@/serializer/BaseMember'
import { useNotification } from '@/composable/useNotification'

export default defineComponent({
  name: 'LocationCreateSideBar',
  components: {
    'base-side-bar': BaseSideBar,
    SearchInput,
    MemberSidebarItem,
    CustomButtonSmall,
    ParticipantFilter,
    Loader
  },
  props: {
    sideBarState: {
      type: Object as PropType<sideBarState<any>>,
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
    const filterChild = ref<any>(null)
    const selected = computed(() => (props.sideBarState.state === 'list' ? 'BestaandCamp' : 'NieuwCamp'))
    const { displayCheck, checkForIdMatch } = useSelectionHelper()
    const fetchedMembers = ref<Member[]>([])
    const { sideBarState } = toRefs(props)
    const isPatching = ref<boolean>(false)
    const loading = ref<boolean>(false)
    const isInit = ref<boolean>(false)
    const { handleSubmit} = useForm()
    const { checkIfIsMobileSize } = usePhoneHelper()
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })
    const filter = ref<Filter>({ gender: '', ageMin: '', ageMax: '', type: props.check.value.participantCheckType })

    const changedFilters = (f: Filter) => {
      filter.value = f
    }

    const closeSideBar = () => {

      context.emit('update:sideBarState', { state: 'hide' })
    }

    const { triggerNotification } = useNotification()

    const onSubmit = async () => {
      let isNoEmail: boolean = false
      
      fetchedMembers.value.forEach((member: BaseMember) => {
        if (member.isChecked) {
        } 
        if ((member.isChecked && !member.email) && (props?.check?.checkParent?.name === 'members_leaders_responsible_main' || props?.check?.checkParent?.name === 'members_leaders_responsible_adjunct')) {
          isNoEmail = true
          triggerNotification(`${t('checks.participant-check.no-email-part-1')} ${member.fullName} ${t('checks.participant-check.no-email-part-2')}`)
        }
      })

      if (isNoEmail === false) {
        handleSubmit(async () => {
          patchMembers(fetchedMembers.value)
        })()
      }
      isNoEmail = false
    }

    const patchMembers = async (data: Member[]) => {
      isPatching.value = true
      await RepositoryFactory.get(ParticipantCheckRepository)
        .update(props.check.endpoint, data)
        .then((res) => {
          if (res !== false) {
            context.emit('actionSuccess', 'PATCH')
          }
          isPatching.value = false
          closeSideBar()
        })
    }

    const fetchedSearchResults = (results: Member[]) => {
      const finalResult: any = []
      //ALSO CHECK ALREADY ADDED MEMBERS IN SEARCH RESULTS
      results.forEach((member: Member) => {
        if (!props.check.value.participants.some((res: any) => res.id.replaceAll('-', '') === member.id.replaceAll('-', ''))) {
          finalResult.push(member)
        }
      })

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
      finalResult.forEach((r: Member) => {
        if (!(fetchedMembers.value.some((f: Member) => checkForIdMatch(f,r)))) {
          fetchedMembers.value.push(r)
        }
      })
    }

    const selectAllFetchedMembers = () => {
      fetchedMembers.value.forEach((fetchedMember: any) => {
        fetchedMember.isChecked = true
      })
    }

    const fetchInitMembers = async () => {
      const finalResult: any = []
      loading.value = true
        await RepositoryFactory.get(MemberRepository)
        .search('', '').then((results) => {
          results.forEach((member: Member) => {
            if (!props.check.value.participants.some((res: any) => res.id.replaceAll('-', '') === member.id.replaceAll('-', ''))) {
              finalResult.push(member)
            }
          })
          fetchedMembers.value = finalResult
          loading.value = false
        })
    }

    if (props.check.value.participantCheckType === 'M') {
      fetchInitMembers()
    }

    return {
      selectAllFetchedMembers,
      fetchedSearchResults,
      MemberRepository,
      fetchedMembers,
      changedFilters,
      sideBarState,
      closeSideBar,
      displayCheck,
      InputTypes,
      isPatching,
      selected,
      onSubmit,
      loading,
      filter,
      t,
      filterChild,
      checkIfIsMobileSize,
      isInit
    }
  },
})
</script>

<style lang="scss">
/* width */
::-webkit-scrollbar {
  width: 6.5px;
  padding-left: 20px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #ececec;
  border-radius: 10px;
  padding-left: 20px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #212529;
  border-radius: 10px;
  padding-left: 20px;
}
</style>
