<template>
  <div>
    <base-side-bar
      :is-display="sideBarState.state !== 'hide'"
      :is-edit="sideBarState.state === 'edit'"
      :isOverflowHidden="isOverflowHidden"
      @hideSidebar="closeSideBar"
      :selection="selected"
      maxWidth="max-w-2xl"
      name="MemberSidebar"
      :title="title"
    >
    <form
        class="flex flex-col h-full"
        id="memberForm"
        ref="formDiv"
        @submit.prevent="onSubmit"
      >
        <div class="p-4 mx-1">
          <search-input v-model:loading="loading" name="search" placeholder="Zoek op naam" :repository="MemberRepository" @fetchedOptions="fetchedSearchResults($event)" />
        </div>

        <div class="mx-1 mb-72 overflow-y-auto">
          <div class="mx-4">
            <div
              v-for="(member, index) in fetchedMembers"
              :key="member"
              :class="{ 'border-t-2 border-black': index === 0 }"
              class="py-2 w-full shadow-md border-b-2 border-black bg-white p-2 inline-block text-left d-flex flex-col justify-content-between"
            >
              <member-sidebar-item :displayCheck="displayCheck(check.checkParent.isMultiple, member)" :member="member" />
            </div>
          </div>
        </div>

        <div class="mt-5 py-4 px-4 absolute bottom-0 bg-white w-full">
          <custom-button :isSubmitting="isPatching" text="VOEG TOE" />
        </div>
    </form>
    </base-side-bar>
  </div>
</template>

<script lang="ts">
import { BaseSideBar, sideBarState, InputTypes } from 'vue-3-component-library'
import { MemberCheckRepository } from '@/repositories/MemberCheckRepository'
import { MemberRepository } from '../../repositories/MemberRepository'
import { computed, defineComponent, PropType, ref, toRefs } from 'vue'
import MemberSidebarItem from '../semantics/MemberSidebarItem.vue'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { PostLocation } from '../../serializer/PostLocation'
import { CustomButton } from 'vue-3-component-library'
import SearchInput from '../inputs/SearchInput.vue'
import { Member } from '@/serializer/Member'
import { Check } from '@/serializer/Check'
import { Visum } from '@/serializer/Visum'
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'LocationCreateSideBar',
  components: {
    'base-side-bar': BaseSideBar,
    SearchInput,
    MemberSidebarItem,
    CustomButton
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    existingList: {
      type: Array,
      default: () => {
        return []
      },
    },
    closeOnAdd: {
      type: Boolean,
      default: false,
      required: false,
    },
    sideBarState: {
      type: Object as PropType<sideBarState<Location>>,
      required: true,
      default: () => {
        'hide'
      },
    },
    isOverflowHidden: {
      type: Boolean,
      required: false,
      default: true,
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
    const fetchedMembers = ref<Member[]>([])
    const { sideBarState } = toRefs(props)
    const isPatching = ref<boolean>(false)
    const loading = ref<boolean>(false)
    const { handleSubmit} = useForm()

    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    const closeSideBar = () => {
      context.emit('update:sideBarState', { state: 'hide' })
    }

    const onSubmit = async () => {
      handleSubmit(async () => {
        addMembers(fetchedMembers.value)
      })()
    }

    const postMembers = async (data: Member[]) => {
      await RepositoryFactory.get(MemberCheckRepository)
        .update(props.check.endpoint, data)
        .then(() => {
          context.emit('actionSuccess', 'UPDATE')
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


      //  --> first check adminId then id because id changes?
      const checkForId = (memb1: Member, memb2: Member): boolean => {
        if (memb1.groupAdminId && memb1.groupAdminId === memb2.groupAdminId) {
          return true
        } else if (memb1.id && memb1.id === memb2.id) {
          return true
        } else return false
      }

      //ADD FETCHED RESULTS ONLY IF IT'S NOT ALREADY CHECKED
      results.forEach((r: Member) => {
        if (!(fetchedMembers.value.some((f: Member) => checkForId(f,r)))) {
          fetchedMembers.value.push(r)
        }
      })
    }

    const addMembers = async (members: Member[]) => {
      isPatching.value = true
      await postMembers(members)
      isPatching.value = false
      closeSideBar()
    }

    const displayCheck = (isMultiple: boolean, member: Member) => {
      if (!isMultiple && fetchedMembers.value.some((f: Member) => f.isChecked == true) && !member.isChecked) {
          return false
      } else {
        return true
      }
    }

    return {
      fetchedSearchResults,
      MemberRepository,
      fetchedMembers,
      sideBarState,
      closeSideBar,
      displayCheck,
      InputTypes,
      isPatching,
      selected,
      onSubmit,
      loading,
      t,
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
