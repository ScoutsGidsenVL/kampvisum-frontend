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
          <participant-filter @changedFilters="changedFilters($event)" />
        </div>
        
        <div class="p-4 mx-1">
          <search-input :filter="filter" @changedFilters='changedFilters($event)' v-model:loading="loading" name="search" :placeholder="t('checks.participant-check.search')" :repository="MemberRepository" @fetchedOptions="fetchedSearchResults($event)" />
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
          <custom-button :disabled="!(fetchedMembers.some((f) => f.isChecked === true))" :isSubmitting="isPatching" :text="t('checks.participant-check.add-without-plus')" />
        </div>
    </form>
    </base-side-bar>
  </div>
</template>

<script lang="ts">
import { ParticipantCheckRepository } from '@/repositories/ParticipantCheckRepository'
import { BaseSideBar, sideBarState, InputTypes } from 'vue-3-component-library'
import { MemberRepository } from '../../repositories/MemberRepository'
import { computed, defineComponent, PropType, ref, toRefs } from 'vue'
import MemberSidebarItem from '../semantics/MemberSidebarItem.vue'
import { useSelectionHelper } from '../../helpers/selectionHelper'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { CustomButton } from 'vue-3-component-library'
import SearchInput from '../inputs/SearchInput.vue'
import { Member } from '@/serializer/Member'
import { Check } from '@/serializer/Check'
import { Visum } from '@/serializer/Visum'
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import ParticipantFilter from '../semantics/ParticipantFilter.vue'
import { Filter } from '../../serializer/Filter'

export default defineComponent({
  name: 'LocationCreateSideBar',
  components: {
    'base-side-bar': BaseSideBar,
    SearchInput,
    MemberSidebarItem,
    CustomButton,
    ParticipantFilter
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
    const selected = computed(() => (props.sideBarState.state === 'list' ? 'BestaandCamp' : 'NieuwCamp'))
    const { displayCheck, checkForIdMatch } = useSelectionHelper()
    const fetchedMembers = ref<Member[]>([])
    const { sideBarState } = toRefs(props)
    const isPatching = ref<boolean>(false)
    const loading = ref<boolean>(false)
    const { handleSubmit} = useForm()
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })
    const filter = ref<Filter>()

    const changedFilters = (f: Filter) => {
      filter.value = f
    }

    const closeSideBar = () => {
      context.emit('update:sideBarState', { state: 'hide' })
    }

    const onSubmit = async () => {
      handleSubmit(async () => {
        patchMembers(fetchedMembers.value)
      })()
    }

    const patchMembers = async (data: Member[]) => {
      isPatching.value = true
      await RepositoryFactory.get(ParticipantCheckRepository)
        .update(props.check.endpoint, data)
        .then(() => {
          context.emit('actionSuccess', 'PATCH')
          isPatching.value = false
          closeSideBar()
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
        if (!(fetchedMembers.value.some((f: Member) => checkForIdMatch(f,r)))) {
          fetchedMembers.value.push(r)
        }
      })
    }

    return {
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
    }
  },
})
</script>

<style lang="scss">
/* width */
::-webkit-scrollbar {
  width: 5px;
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
